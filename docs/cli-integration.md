# CLI Integration

The Dtapline CLI (`@dtapline/cli`) is a command-line tool for reporting deployments from CI/CD pipelines. This guide covers all CLI commands, options, and integration patterns.

## Installation

### Global Installation

```bash
npm install -g @dtapline/cli
```

### Use with npx (No Installation)

```bash
npx @dtapline/cli deploy production my-service abc123
```

### CI/CD Installation

Most CI/CD platforms support installing npm packages as part of the pipeline:

```bash
npm install -g @dtapline/cli
# or
pnpm add -g @dtapline/cli
# or
yarn global add @dtapline/cli
```

## Commands

### `dtapline deploy`

Report a deployment to Dtapline.

**Syntax:**

```bash
dtapline deploy <environment> <service> [<commit>] [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `environment` | ✅ | Target environment (e.g., `production`, `staging`, `dev`) |
| `service` | ✅ | Service name (e.g., `api-service`, `web-frontend`) |
| `commit` | ⚠️ | Git commit SHA (auto-detected from CI/CD or local git if not provided) |

**Options:**

| Option | Type | Description |
|--------|------|-------------|
| `--api-key <key>` | string | API key for authentication (or use `DTAPLINE_API_KEY` env var) |
| `--server-url <url>` | string | Dtapline API server URL (or use `DTAPLINE_SERVER_URL` env var, default: `https://api.dtapline.com`) |
| `--git-tag <tag>` | string | Git tag (auto-detected from CI/CD if available) |
| `--deployed-version <version>` | string | Semantic version (e.g., `v1.2.3`, `1.2.3`) |
| `--pr-url <url>` | string | Pull request URL |
| `--deployed-by <name>` | string | Who/what triggered the deployment (auto-detected from CI/CD) |
| `--status <status>` | string | Deployment status: `success`, `failed`, `in_progress`, `rolled_back` (default: `success`) |
| `--build-url <url>` | string | Build/CI pipeline URL (auto-detected from CI/CD) |
| `--release-notes <notes>` | string | Release notes or changelog |

## Auto-Detection Features

The CLI automatically detects metadata from your environment, making integration simpler:

### Commit SHA Auto-Detection

The `<commit>` argument is optional. If not provided, the CLI uses this fallback chain:

1. **CI/CD environment variables** - Detects from 12 platforms (GitHub Actions, GitLab CI, CircleCI, etc.)
2. **Local git repository** - Runs `git rev-parse HEAD`
3. **Error** - If neither is available

```bash
# Minimal command - commit SHA auto-detected
dtapline deploy production api-service --status success

# Explicit commit SHA
dtapline deploy production api-service abc123def456 --status success
```

### Supported CI/CD Platforms

The CLI automatically detects and extracts metadata from:

- ✅ **GitHub Actions** - commit, branch, tags, actor, repository URL
- ✅ **GitLab CI** - commit, branch, tags, actor, project URL
- ✅ **Azure Pipelines** - commit, branch, tags, actor, repository URL
- ✅ **CircleCI** - commit, branch, tags, username, repository URL
- ✅ **Jenkins** - commit, branch, tags, build user, git URL
- ✅ **Travis CI** - commit, branch, tags, repository URL
- ✅ **Bitbucket Pipelines** - commit, branch, tags, git URL
- ✅ **AWS CodeBuild** - commit, branch, repository URL, initiator
- ✅ **Google Cloud Build** - commit, branch, tags
- ✅ **Drone CI** - commit, branch, tags, author, repository link
- ✅ **TeamCity** - commit SHA
- ✅ **Bamboo** - commit, branch, repository URL, username

### Auto-Filled Fields

When running in CI/CD, these fields are automatically populated if not explicitly provided:

- **`--git-tag`** - Extracted from CI/CD environment (e.g., `v1.2.3`)
- **`--deployed-by`** - Set to the CI/CD actor (username) or platform name
- **`--build-url`** - Set to the CI/CD build/pipeline URL

**Examples:**

```bash
# Simplest command - everything auto-detected in CI/CD
dtapline deploy production api-service --status success

# Auto-detected commit from local git
dtapline deploy staging web-frontend --status success

# Explicit commit SHA
dtapline deploy production api-service abc123def456 --status success

# Full metadata (overrides auto-detection)
dtapline deploy production api-service abc123def456 \
  --git-tag v1.2.3 \
  --deployed-version v1.2.3 \
  --pr-url https://github.com/org/repo/pull/123 \
  --deployed-by "Jane Doe" \
  --status success \
  --build-url https://github.com/org/repo/actions/runs/123456 \
  --release-notes "Fixed critical authentication bug"

# Using npx (no installation required)
npx @dtapline/cli deploy staging web-frontend --status success

# Custom server URL (self-hosted)
export DTAPLINE_SERVER_URL=https://dtapline.mycompany.com
dtapline deploy production my-service --status success
```

### `dtapline --version`

Display CLI version.

```bash
dtapline --version
# Output: @dtapline/cli version 1.0.0
```

### `dtapline --help`

Display help information.

```bash
dtapline --help
dtapline deploy --help
```

## Authentication

The CLI requires an API key for authentication. You can provide it in two ways:

### 1. Environment Variable (Recommended)

```bash
export DTAPLINE_API_KEY=cm_your_api_key_here
dtapline deploy production my-service --status success
```

This is the recommended approach for CI/CD pipelines as it keeps secrets out of command history and logs.

### 2. Command-Line Option

```bash
dtapline deploy production my-service --api-key cm_your_api_key_here --status success
```

⚠️ **Warning**: Using `--api-key` exposes your key in command history and logs. Only use for local testing.

## Server URL Configuration

You can configure the Dtapline API server URL in three ways (in order of precedence):

1. **Command-line option**: `--server-url https://api.dtapline.com`
2. **Environment variable**: `export DTAPLINE_SERVER_URL=https://api.dtapline.com`
3. **Default**: `https://api.dtapline.com`

```bash
# Using environment variable
export DTAPLINE_SERVER_URL=https://dtapline.mycompany.com
dtapline deploy production my-service --status success

# Using command-line option
dtapline deploy production my-service --server-url https://dtapline.mycompany.com --status success
```

## Getting an API Key

1. Log into Dtapline dashboard
2. Navigate to your project
3. Go to **Settings → API Keys**
4. Click **"Create API Key"**
5. Name your key (e.g., "GitHub Actions")
6. Select scope: **`deployments:write`**
7. Copy the key - you'll only see it once!

## CI/CD Integration Patterns

With auto-detection, integrating Dtapline into your CI/CD pipeline is simpler than ever.

### Pattern 1: Minimal Integration (Recommended)

Let the CLI auto-detect all metadata:

```yaml
# GitHub Actions
- name: Report Deployment
  env:
    DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
  run: dtapline deploy production my-service --status success
```

```yaml
# GitLab CI
deploy:report:
  stage: deploy
  script:
    - dtapline deploy production my-service --status success
  variables:
    DTAPLINE_API_KEY: $CI_DTAPLINE_API_KEY
```

```yaml
# Azure Pipelines
- script: dtapline deploy production my-service --status success
  env:
    DTAPLINE_API_KEY: $(DTAPLINE_API_KEY)
  displayName: 'Report Deployment'
```

The CLI automatically detects:
- ✅ Commit SHA from CI environment or git
- ✅ Git tags (e.g., `v1.2.3`)
- ✅ Actor/username who triggered the deployment
- ✅ Build URL for the CI/CD pipeline
- ✅ Repository URL and branch information

### Pattern 2: Report on Success Only

Only report deployments that succeeded:

```yaml
- name: Deploy Application
  run: ./deploy.sh production

- name: Report to Dtapline
  if: success()
  env:
    DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
  run: dtapline deploy production my-service --status success
```

### Pattern 2: Report Success or Failure

Report all deployment attempts with appropriate status:

```yaml
- name: Deploy Application
  id: deploy
  run: ./deploy.sh production
  continue-on-error: true

- name: Report Deployment Status
  env:
    DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
  run: |
    if [ "${{ steps.deploy.outcome }}" == "success" ]; then
      STATUS="success"
    else
      STATUS="failed"
    fi
    dtapline deploy production my-service --status $STATUS
```

### Pattern 3: Report In-Progress → Success/Failed

Track long-running deployments:

```yaml
- name: Report In-Progress
  env:
    DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
  run: dtapline deploy production my-service --status in_progress

- name: Deploy Application
  id: deploy
  run: ./deploy.sh production

- name: Report Final Status
  if: always()
  env:
    DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
  run: |
    STATUS="${{ steps.deploy.outcome == 'success' && 'success' || 'failed' }}"
    dtapline deploy production my-service --status $STATUS
```

### Pattern 4: Matrix Deployments

Deploy multiple services in parallel:

```yaml
strategy:
  matrix:
    service: [api, web, worker]
    
steps:
  - name: Deploy ${{ matrix.service }}
    run: ./deploy.sh ${{ matrix.service }} production
    
  - name: Report to Dtapline
    env:
      DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
    run: dtapline deploy production ${{ matrix.service }} --status success
```

### Pattern 5: Monorepo with Changed Services

Only report deployments for services that changed:

```yaml
- name: Detect Changed Services
  id: changes
  run: |
    CHANGED=$(git diff --name-only HEAD~1 HEAD | grep "^services/" | cut -d/ -f2 | sort -u)
    echo "services=$CHANGED" >> $GITHUB_OUTPUT

- name: Deploy and Report
  if: steps.changes.outputs.services != ''
  env:
    DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
  run: |
    for service in ${{ steps.changes.outputs.services }}; do
      ./deploy.sh $service production
      dtapline deploy production $service ${{ github.sha }} \
        --deployed-version ${{ github.ref_name }} \
        --status success
    done
```

## Diff URL Generation

Dtapline automatically generates comparison URLs between environments when you provide a repository URL for the service.

### Supported Platforms

- **GitHub**: `/compare/commit1...commit2`
- **GitLab**: `/-/compare/commit1...commit2`
- **Bitbucket**: `/branches/compare/commit2..commit1`
- **Azure DevOps**: `/branchCompare?baseVersion=GC{commit1}&targetVersion=GC{commit2}`

### How It Works

1. Set repository URL in service settings
2. Deploy to `staging`: `abc123`
3. Deploy to `production`: `def456`
4. Dtapline generates: `https://github.com/org/repo/compare/def456...abc123`

### Configuring Repository URLs

In the dashboard:
1. Go to **Project → Services**
2. Edit a service
3. Set **Repository URL** (e.g., `https://github.com/org/repo`)
4. Save

Or let Dtapline auto-detect from PR URLs:
```bash
dtapline deploy production my-service abc123 \
  --pr-url https://github.com/org/repo/pull/123
```

Dtapline extracts the repository URL automatically.

## Troubleshooting

### Error: "API key is required"

**Solution**: Set `DTAPLINE_API_KEY` environment variable or use `--api-key` option.

```bash
export DTAPLINE_API_KEY=cm_your_key_here
```

### Error: "Invalid API key"

**Causes:**
- API key is incorrect or revoked
- API key scope doesn't include `deployments:write`

**Solution**: Generate a new API key with correct scope in the dashboard.

### Error: "Failed to connect to server"

**Causes:**
- Server URL is incorrect
- Server is down
- Network/firewall issues

**Solution**: Check `--server-url` and network connectivity.

```bash
# Test connection
curl https://app.dtapline.com/api/health

# Use custom URL for self-hosted
--server-url https://dtapline.mycompany.com
```

### Deployment Not Showing in Dashboard

1. **Check API key permissions**: Ensure `deployments:write` scope
2. **Verify server URL**: Make sure it points to your Dtapline instance
3. **Check command output**: Look for error messages
4. **Inspect API logs**: Check server logs for errors

### CLI Command Not Found

**Error**: `dtapline: command not found`

**Solution**: Install globally or use npx:

```bash
npm install -g @dtapline/cli
# or
npx @dtapline/cli deploy ...
```

## Best Practices

### 1. Use Environment Variables for API Keys

✅ **Good:**
```yaml
env:
  DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
run: dtapline deploy production my-service $SHA
```

❌ **Bad:**
```yaml
run: dtapline deploy production my-service $SHA --api-key cm_abc123
```

### 2. Always Include Deployed Version

Helps with version tracking and comparison:

```bash
dtapline deploy production my-service abc123 \
  --deployed-version v1.2.3  # ✅ Good
```

### 3. Report Deployment Status Accurately

Use `in_progress` → `success`/`failed` for long deployments:

```bash
# Start
dtapline deploy production my-service abc123 --status in_progress

# Deploy...

# Finish
dtapline deploy production my-service abc123 --status success
```

### 4. Include Build URLs for Debugging

```bash
--build-url ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
```

### 5. Use Descriptive Service Names

- ✅ Good: `api-service`, `web-frontend`, `background-worker`
- ❌ Bad: `service1`, `app`, `backend`

### 6. Set Repository URLs

Enables automatic diff URL generation between environments.

## Examples by Platform

See [CI/CD Examples](/docs/ci-cd-examples) for complete integration examples for:

- GitHub Actions
- GitLab CI
- Azure Pipelines
- Jenkins
- CircleCI
- Bitbucket Pipelines
- Travis CI
- AWS CodeBuild

## API Reference

The CLI uses Dtapline's REST API under the hood. You can also integrate directly with the API:

**Endpoint:**
```
POST https://app.dtapline.com/api/v1/deployments
```

**Headers:**
```
Authorization: Bearer cm_your_api_key
Content-Type: application/json
```

**Body:**
```json
{
  "environment": "production",
  "service": "api-service",
  "commitHash": "abc123def456",
  "deployedVersion": "v1.2.3",
  "prUrl": "https://github.com/org/repo/pull/123",
  "deployedBy": "GitHub Actions",
  "status": "success",
  "buildUrl": "https://github.com/org/repo/actions/runs/123456"
}
```

See API documentation for complete reference.

## Need Help?

- **GitHub Discussions**: [github.com/orgs/dtapline/discussions](https://github.com/orgs/dtapline/discussions)
- **GitHub Issues**: [github.com/dtapline/dtapline/issues](https://github.com/dtapline/dtapline/issues)
