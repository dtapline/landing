# CI/CD Integration Examples

Complete examples for integrating Dtapline with popular CI/CD platforms.

## GitHub Actions

### Basic Integration

```yaml
name: Deploy and Track

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy Application
        run: ./deploy.sh production
      
      - name: Report to Dtapline
        if: success()
        env:
          DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
        run: |
          npm install -g @dtapline/cli
          dtapline deploy production my-service ${{ github.sha }} \
            --deployed-version ${{ github.ref_name }} \
            --pr-url ${{ github.event.pull_request.html_url }} \
            --deployed-by "GitHub Actions" \
            --build-url ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }} \
            --status success
```

### Multi-Environment Deploy

```yaml
name: Multi-Environment Deploy

on:
  push:
    branches:
      - main        # Deploy to production
      - develop     # Deploy to staging
      - 'feature/*' # Deploy to dev

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Determine Environment
        id: env
        run: |
          if [[ "${{ github.ref }}" == "refs/heads/main" ]]; then
            echo "environment=production" >> $GITHUB_OUTPUT
          elif [[ "${{ github.ref }}" == "refs/heads/develop" ]]; then
            echo "environment=staging" >> $GITHUB_OUTPUT
          else
            echo "environment=dev" >> $GITHUB_OUTPUT
          fi
      
      - name: Deploy Application
        run: ./deploy.sh ${{ steps.env.outputs.environment }}
      
      - name: Report to Dtapline
        if: always()
        env:
          DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
        run: |
          npm install -g @dtapline/cli
          STATUS="${{ job.status == 'success' && 'success' || 'failed' }}"
          dtapline deploy ${{ steps.env.outputs.environment }} my-service ${{ github.sha }} \
            --deployed-version ${{ github.ref_name }} \
            --deployed-by "GitHub Actions" \
            --status $STATUS
```

### Multiple Services (Monorepo)

```yaml
name: Monorepo Deploy

on:
  push:
    branches: [main]

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      services: ${{ steps.changes.outputs.services }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2
      
      - name: Detect Changed Services
        id: changes
        run: |
          CHANGED=$(git diff --name-only HEAD~1 HEAD | grep "^services/" | cut -d/ -f2 | sort -u | tr '\n' ' ')
          echo "services=$CHANGED" >> $GITHUB_OUTPUT

  deploy:
    needs: detect-changes
    if: needs.detect-changes.outputs.services != ''
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: ${{ fromJSON(format('["{0}"]', needs.detect-changes.outputs.services)) }}
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy ${{ matrix.service }}
        run: ./deploy.sh ${{ matrix.service }} production
      
      - name: Report to Dtapline
        if: always()
        env:
          DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
        run: |
          npm install -g @dtapline/cli
          STATUS="${{ job.status == 'success' && 'success' || 'failed' }}"
          dtapline deploy production ${{ matrix.service }} ${{ github.sha }} \
            --deployed-version ${{ github.ref_name }} \
            --deployed-by "GitHub Actions" \
            --status $STATUS
```

---

## GitLab CI

### Basic Integration

```yaml
stages:
  - deploy
  - report

deploy_production:
  stage: deploy
  script:
    - ./deploy.sh production
  only:
    - main

report_deployment:
  stage: report
  script:
    - npm install -g @dtapline/cli
    - |
      dtapline deploy production my-service $CI_COMMIT_SHA \
        --api-key $DTAPLINE_API_KEY \
        --deployed-version $CI_COMMIT_TAG \
        --pr-url $CI_MERGE_REQUEST_IID \
        --deployed-by "GitLab CI" \
        --build-url $CI_PIPELINE_URL \
        --status success
  when: on_success
  only:
    - main
```

### Multi-Environment with Manual Gates

```yaml
variables:
  SERVICE_NAME: "my-service"

stages:
  - build
  - deploy_staging
  - deploy_production
  - report

.deploy_template: &deploy_template
  script:
    - ./deploy.sh $ENVIRONMENT
    - npm install -g @dtapline/cli
    - |
      dtapline deploy $ENVIRONMENT $SERVICE_NAME $CI_COMMIT_SHA \
        --api-key $DTAPLINE_API_KEY \
        --deployed-version $CI_COMMIT_TAG \
        --deployed-by "GitLab CI" \
        --status success

deploy_staging:
  <<: *deploy_template
  stage: deploy_staging
  variables:
    ENVIRONMENT: "staging"
  only:
    - develop

deploy_production:
  <<: *deploy_template
  stage: deploy_production
  variables:
    ENVIRONMENT: "production"
  when: manual  # Require manual approval
  only:
    - main
```

---

## Azure Pipelines

### Basic Integration

```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

variables:
  SERVICE_NAME: 'my-service'
  ENVIRONMENT: 'production'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'
    displayName: 'Install Node.js'

  - script: |
      ./deploy.sh $(ENVIRONMENT)
    displayName: 'Deploy Application'

  - script: |
      npm install -g @dtapline/cli
      dtapline deploy \
        $(ENVIRONMENT) \
        $(SERVICE_NAME) \
        $(Build.SourceVersion) \
        --api-key $(DTAPLINE_API_KEY) \
        --deployed-version $(Build.SourceBranchName) \
        --deployed-by "Azure DevOps" \
        --build-url $(System.TeamFoundationCollectionUri)$(System.TeamProject)/_build/results?buildId=$(Build.BuildId) \
        --status success
    displayName: 'Report to Dtapline'
    condition: succeeded()
    env:
      DTAPLINE_API_KEY: $(DTAPLINE_API_KEY)
```

### Multi-Stage Pipeline

```yaml
trigger:
  branches:
    include:
      - main
      - develop

stages:
  - stage: DeployStaging
    condition: eq(variables['Build.SourceBranch'], 'refs/heads/develop')
    jobs:
      - job: Deploy
        steps:
          - script: ./deploy.sh staging
            displayName: 'Deploy to Staging'
          
          - script: |
              npm install -g @dtapline/cli
              dtapline deploy staging my-service $(Build.SourceVersion) \
                --api-key $(DTAPLINE_API_KEY) \
                --deployed-version $(Build.BuildNumber) \
                --deployed-by "Azure DevOps" \
                --status success
            displayName: 'Report Deployment'
            env:
              DTAPLINE_API_KEY: $(DTAPLINE_API_KEY)

  - stage: DeployProduction
    condition: eq(variables['Build.SourceBranch'], 'refs/heads/main')
    jobs:
      - deployment: Deploy
        environment: 'production'
        strategy:
          runOnce:
            deploy:
              steps:
                - script: ./deploy.sh production
                  displayName: 'Deploy to Production'
                
                - script: |
                    npm install -g @dtapline/cli
                    dtapline deploy production my-service $(Build.SourceVersion) \
                      --api-key $(DTAPLINE_API_KEY) \
                      --deployed-version $(Build.BuildNumber) \
                      --deployed-by "Azure DevOps" \
                      --status success
                  displayName: 'Report Deployment'
                  env:
                    DTAPLINE_API_KEY: $(DTAPLINE_API_KEY)
```

---

## Jenkins

### Declarative Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        DTAPLINE_API_KEY = credentials('dtapline-api-key')
        SERVICE_NAME = 'my-service'
        ENVIRONMENT = 'production'
    }
    
    stages {
        stage('Deploy') {
            steps {
                sh './deploy.sh ${ENVIRONMENT}'
            }
        }
        
        stage('Report to Dtapline') {
            steps {
                sh '''
                    npm install -g @dtapline/cli
                    dtapline deploy \
                        ${ENVIRONMENT} \
                        ${SERVICE_NAME} \
                        ${GIT_COMMIT} \
                        --deployed-version ${GIT_TAG_NAME} \
                        --deployed-by "Jenkins" \
                        --build-url ${BUILD_URL} \
                        --status success
                '''
            }
        }
    }
    
    post {
        failure {
            sh '''
                npm install -g @dtapline/cli
                dtapline deploy \
                    ${ENVIRONMENT} \
                    ${SERVICE_NAME} \
                    ${GIT_COMMIT} \
                    --deployed-by "Jenkins" \
                    --build-url ${BUILD_URL} \
                    --status failed
            '''
        }
    }
}
```

### Multi-Branch Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        DTAPLINE_API_KEY = credentials('dtapline-api-key')
        SERVICE_NAME = 'my-service'
    }
    
    stages {
        stage('Determine Environment') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        env.DEPLOY_ENV = 'production'
                    } else if (env.BRANCH_NAME == 'develop') {
                        env.DEPLOY_ENV = 'staging'
                    } else {
                        env.DEPLOY_ENV = 'dev'
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh './deploy.sh ${DEPLOY_ENV}'
            }
        }
        
        stage('Report to Dtapline') {
            when {
                expression { return env.DEPLOY_ENV != null }
            }
            steps {
                sh '''
                    npm install -g @dtapline/cli
                    STATUS="success"
                    [ $? -eq 0 ] || STATUS="failed"
                    
                    dtapline deploy \
                        ${DEPLOY_ENV} \
                        ${SERVICE_NAME} \
                        ${GIT_COMMIT} \
                        --deployed-version ${GIT_TAG_NAME:-${GIT_COMMIT:0:7}} \
                        --deployed-by "Jenkins" \
                        --build-url ${BUILD_URL} \
                        --status $STATUS
                '''
            }
        }
    }
}
```

---

## CircleCI

### Basic Integration

```yaml
version: 2.1

jobs:
  deploy:
    docker:
      - image: cimg/node:20.0
    steps:
      - checkout
      
      - run:
          name: Deploy Application
          command: ./deploy.sh production
      
      - run:
          name: Report to Dtapline
          command: |
            npm install -g @dtapline/cli
            dtapline deploy production my-service $CIRCLE_SHA1 \
              --deployed-version $CIRCLE_TAG \
              --deployed-by "CircleCI" \
              --build-url $CIRCLE_BUILD_URL \
              --status success

workflows:
  deploy_production:
    jobs:
      - deploy:
          filters:
            branches:
              only: main
          context:
            - dtapline-credentials  # Contains DTAPLINE_API_KEY
```

### Multi-Environment Workflow

```yaml
version: 2.1

executors:
  node-executor:
    docker:
      - image: cimg/node:20.0

jobs:
  deploy_staging:
    executor: node-executor
    steps:
      - checkout
      - run: ./deploy.sh staging
      - run: |
          npm install -g @dtapline/cli
          dtapline deploy staging my-service $CIRCLE_SHA1 \
            --deployed-version $CIRCLE_TAG \
            --deployed-by "CircleCI" \
            --status success

  deploy_production:
    executor: node-executor
    steps:
      - checkout
      - run: ./deploy.sh production
      - run: |
          npm install -g @dtapline/cli
          dtapline deploy production my-service $CIRCLE_SHA1 \
            --deployed-version $CIRCLE_TAG \
            --deployed-by "CircleCI" \
            --status success

workflows:
  deploy:
    jobs:
      - deploy_staging:
          filters:
            branches:
              only: develop
          context:
            - dtapline-credentials
      
      - deploy_production:
          filters:
            branches:
              only: main
          context:
            - dtapline-credentials
```

---

## Bitbucket Pipelines

### Basic Integration

```yaml
image: node:20

pipelines:
  branches:
    main:
      - step:
          name: Deploy to Production
          deployment: production
          script:
            - ./deploy.sh production
            - npm install -g @dtapline/cli
            - |
              dtapline deploy production my-service $BITBUCKET_COMMIT \
                --api-key $DTAPLINE_API_KEY \
                --deployed-version $BITBUCKET_TAG \
                --deployed-by "Bitbucket Pipelines" \
                --build-url https://bitbucket.org/$BITBUCKET_REPO_FULL_NAME/pipelines/results/$BITBUCKET_BUILD_NUMBER \
                --status success
```

### Multi-Environment Pipeline

```yaml
image: node:20

pipelines:
  branches:
    develop:
      - step:
          name: Deploy to Staging
          deployment: staging
          script:
            - ./deploy.sh staging
            - npm install -g @dtapline/cli
            - |
              dtapline deploy staging my-service $BITBUCKET_COMMIT \
                --api-key $DTAPLINE_API_KEY \
                --deployed-version $BITBUCKET_TAG \
                --deployed-by "Bitbucket Pipelines" \
                --status success
    
    main:
      - step:
          name: Deploy to Production
          deployment: production
          trigger: manual  # Require manual approval
          script:
            - ./deploy.sh production
            - npm install -g @dtapline/cli
            - |
              dtapline deploy production my-service $BITBUCKET_COMMIT \
                --api-key $DTAPLINE_API_KEY \
                --deployed-version $BITBUCKET_TAG \
                --deployed-by "Bitbucket Pipelines" \
                --status success
```

---

## Travis CI

```yaml
language: node_js
node_js:
  - "20"

branches:
  only:
    - main
    - develop

install:
  - npm install -g @dtapline/cli

script:
  - ./deploy.sh $TRAVIS_BRANCH

after_success:
  - |
    ENV="production"
    [ "$TRAVIS_BRANCH" == "develop" ] && ENV="staging"
    
    dtapline deploy $ENV my-service $TRAVIS_COMMIT \
      --deployed-version $TRAVIS_TAG \
      --deployed-by "Travis CI" \
      --build-url https://travis-ci.org/$TRAVIS_REPO_SLUG/builds/$TRAVIS_BUILD_ID \
      --status success

env:
  global:
    - secure: "encrypted_dtapline_api_key_here"
```

---

## AWS CodeBuild

### buildspec.yml

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 20
    commands:
      - npm install -g @dtapline/cli

  pre_build:
    commands:
      - echo "Starting deployment..."
      - |
        dtapline deploy production my-service $CODEBUILD_RESOLVED_SOURCE_VERSION \
          --status in_progress

  build:
    commands:
      - ./deploy.sh production

  post_build:
    commands:
      - |
        STATUS="success"
        [ $CODEBUILD_BUILD_SUCCEEDING -eq 1 ] || STATUS="failed"
        
        dtapline deploy production my-service $CODEBUILD_RESOLVED_SOURCE_VERSION \
          --deployed-by "AWS CodeBuild" \
          --build-url https://console.aws.amazon.com/codesuite/codebuild/projects/$CODEBUILD_BUILD_ID \
          --status $STATUS

env:
  parameter-store:
    DTAPLINE_API_KEY: /dtapline/api-key
```

---

## Best Practices

### 1. Always Report Final Status

Use `if: always()` or equivalent to ensure deployment status is reported even on failure:

```yaml
- name: Report to Dtapline
  if: always()
  # ... report success or failed based on previous step
```

### 2. Store API Keys Securely

- ✅ Use CI/CD secret management (GitHub Secrets, GitLab CI Variables, etc.)
- ✅ Rotate keys periodically
- ❌ Never hardcode keys in pipeline files

### 3. Include Build URLs

Makes it easy to trace deployments back to their build:

```bash
--build-url ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
```

### 4. Use Semantic Versioning

Pass git tags or version numbers for better tracking:

```bash
--deployed-version ${{ github.ref_name }}  # e.g., v1.2.3
```

### 5. Report In-Progress for Long Deployments

For deployments that take minutes, report `in_progress` first:

```bash
# Before deployment
dtapline deploy production my-service $SHA --status in_progress

# After deployment
dtapline deploy production my-service $SHA --status success
```

---

## Troubleshooting

### Secret Not Found

Ensure your CI/CD secret is named correctly and accessible in the pipeline context.

### Command Not Found: dtapline

Install the CLI before using it:

```bash
npm install -g @dtapline/cli
```

Or use npx:

```bash
npx @dtapline/cli deploy ...
```

### Build Fails After Adding Dtapline

Make the Dtapline step non-blocking:

```yaml
# GitHub Actions
continue-on-error: true

# GitLab CI
allow_failure: true

# Jenkins
catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
    // dtapline command
}
```

---

## Need More Help?

- [CLI Integration Guide](/docs/cli-integration)
- [GitHub Discussions](https://github.com/orgs/dtapline/discussions)
- [GitHub Issues](https://github.com/dtapline/dtapline/issues)
