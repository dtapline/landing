---
layout: home

title: Dtapline
titleTemplate: Track and visualize deployments across your environments

hero:
  name: Dtapline
  text: Visualize Deployments Across Your Environments
  tagline: Track what's deployed where and when with a beautiful matrix overview. Integrate with any CI/CD in one line of code.
  image:
    src: /showcase.png
    alt: Dtapline deployment matrix dashboard
  actions:
    - theme: brand
      text: View Live Demo
      link: https://app.dtapline.com/demo
    - theme: alt
      text: Make an account
      link: https://app.dtapline.com/signup
    - theme: alt
      text: Get Started
      link: /docs/introduction#getting-started

features:
  - icon: 📊
    title: Visual 2D Deployment Matrix
    details: Octopus Deploy-inspired dashboard shows Services × Environments in a clean grid. See deployment status, versions, and timestamps at a glance.
    
  - icon: ⚡
    title: One-Line CI/CD Integration
    details: Add a single CLI command to your pipeline. Works with GitHub Actions, GitLab CI, Jenkins, Azure DevOps, CircleCI, and any CI/CD platform.
    
  - icon: 🔗
    title: Automatic Diff URLs
    details: Generate comparison links between environments for GitHub, GitLab, Bitbucket, and Azure DevOps. Review changes before promoting to production.
    
  - icon: 🔄
    title: GitOps Compatible
    details: Works seamlessly with GitOps and Kubernetes-native deployment workflows. Track deployments regardless of how they're deployed.
    
  - icon: 🏠
    title: Open Source & Self-Hosted
    details: AGPL-3.0 licensed. Deploy to AWS Lambda, or bare metal. Full control over your deployment data with no vendor lock-in.
    
  - icon: ⚙️
    title: Built with Effect-TS
    details: Modern functional architecture with type-safe error handling, dependency injection, and composable effects. Reliable and maintainable.
---

<div class="vp-doc" style="max-width: 1152px; margin: 4rem auto; padding: 0 24px;">

## Stop Asking "What's In Production?"

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin: 2rem 0;">
  <div>
    <h3>🤔 Before Dtapline</h3>
    <ul>
      <li>"What version is running in production?"</li>
      <li>"When was the last deployment to staging?"</li>
      <li>"Is staging ahead of production?"</li>
      <li>Scattered deployment information</li>
      <li>Slack threads asking for status</li>
      <li>No deployment audit trail</li>
    </ul>
  </div>
  <div>
    <h3>✅ With Dtapline</h3>
    <ul>
      <li>See all deployments in one visual matrix</li>
      <li>Automatic tracking from CI/CD pipelines</li>
      <li>Compare environments side-by-side</li>
      <li>Complete deployment history</li>
      <li>Self-service deployment visibility</li>
      <li>Full audit trail with metadata</li>
    </ul>
  </div>
</div>

---

## How It Works

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 3rem 0;">
  <div style="text-align: center;">
    <div style="font-size: 3rem; margin-bottom: 1rem;">1️⃣</div>
    <h3>Add CLI to Your Pipeline</h3>
    <p>Install <code>@dtapline/cli</code> and add one command to your deployment script.</p>
  </div>
  <div style="text-align: center;">
    <div style="font-size: 3rem; margin-bottom: 1rem;">2️⃣</div>
    <h3>Deployments Auto-Report</h3>
    <p>Every deployment automatically reports to Dtapline with version, status, and metadata.</p>
  </div>
  <div style="text-align: center;">
    <div style="font-size: 3rem; margin-bottom: 1rem;">3️⃣</div>
    <h3>View in Dashboard</h3>
    <p>See real-time deployment status across all services and environments in a beautiful 2D matrix.</p>
  </div>
</div>

---

## CI/CD Integration Example

Integrate Dtapline with any CI/CD platform in seconds:

::: code-group

```yaml [GitHub Actions]
- name: Report Deployment to Dtapline
  env:
    DTAPLINE_API_KEY: ${{ secrets.DTAPLINE_API_KEY }}
  run: |
    npm install -g @dtapline/cli
    dtapline deploy production my-service ${{ github.sha }} \
      --deployed-version ${{ github.ref_name }} \
      --pr-url ${{ github.event.pull_request.html_url }} \
      --deployed-by "GitHub Actions" \
      --status success
```

```yaml [GitLab CI]
report_deployment:
  stage: deploy
  script:
    - npm install -g @dtapline/cli
    - |
      dtapline deploy production my-service $CI_COMMIT_SHA \
        --api-key $DTAPLINE_API_KEY \
        --deployed-version $CI_COMMIT_TAG \
        --deployed-by "GitLab CI" \
        --status success
```

```yaml [Azure Pipelines]
- script: |
    npm install -g @dtapline/cli
    dtapline deploy \
      $(ENVIRONMENT) \
      $(SERVICE_NAME) \
      $(Build.SourceVersion) \
      --api-key $(DTAPLINE_API_KEY) \
      --deployed-version $(Build.BuildNumber) \
      --deployed-by "Azure DevOps" \
      --status success
  displayName: 'Report Deployment'
```

```groovy [Jenkins]
stage('Report Deployment') {
  steps {
    sh '''
      npm install -g @dtapline/cli
      dtapline deploy production my-service ${GIT_COMMIT} \
        --api-key ${DTAPLINE_API_KEY} \
        --deployed-version ${BUILD_NUMBER} \
        --build-url ${BUILD_URL} \
        --deployed-by "Jenkins"
    '''
  }
}
```

:::

[See more CI/CD examples →](/docs/ci-cd-examples)

---

## Dashboard Preview

<div class="screenshot-container">
  <img src="/showcase.png" alt="Dtapline deployment matrix dashboard showing services across multiple environments" />
</div>

<div style="text-align: center; margin: 2rem 0;">
  <a href="https://app.dtapline.com/demo" class="vp-button brand" style="display: inline-block; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600;">
    Try the Live Demo →
  </a>
</div>

---

## Key Features

### 📊 Visual Deployment Matrix
- **2D Grid Layout**: Services (rows) × Environments (columns)
- **Color-Coded Status**: Success (green), Failed (red), In Progress (amber), Rolled Back (gray)
- **Version Display**: Semantic versions or commit SHAs
- **Relative Timestamps**: "2h ago", "3 days ago"
- **Clickable Details**: Drill into any deployment for full metadata

### ⚙️ Smart Automation
- **Auto-Creation**: Services and environments created automatically on first deployment
- **Diff URL Generation**: Automatic comparison links between environments
- **CI/CD Platform Detection**: Auto-detects GitHub Actions, GitLab CI, etc.

### 🔒 Security & Access Control
- **API Key Authentication**: Scoped keys with `deployments:write`, `deployments:read`, `admin` permissions
- **Secure Storage**: bcrypt hashing with one-time display
- **Session Management**: Cookie-based auth for dashboard
- **GitHub OAuth**: Social login support

### 📈 Deployment History & Analytics
- **Complete Audit Trail**: Every deployment recorded with full metadata
- **Timeline View**: Visual history for each service-environment pair
- **Status Tracking**: Monitor in-progress deployments

### 🌍 Global Environment Management
- **Reusable Environments**: Define once, use across projects
- **Custom Ordering**: Control left-to-right sequence
- **Color Customization**: Assign hex colors for quick identification
- **Flexible Selection**: Each project enables specific environments

---

## Pricing

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin: 3rem 0;">
  
  <div class="pricing-card">
    <h3>Free</h3>
    <div class="pricing-price">$0</div>
    <p style="color: var(--vp-c-text-2);">Forever</p>
    <ul class="pricing-features">
      <li>✅ 5 projects</li>
      <li>✅ 10 services</li>
      <li>✅ Deployment webhooks</li>
      <li>✅ Unlimited deployments</li>
      <li>✅ Self-hosted</li>
      <li>✅ API key management</li>
      <li>✅ Complete deployment history</li>
      <li>✅ Community support</li>
    </ul>
    <a href="/docs/cli-integration" class="vp-button" style="display: block; text-align: center; padding: 12px; border-radius: 10px; margin-top: 1rem; text-decoration: none;">
      Get Started
    </a>
  </div>

  <div class="pricing-card featured">
    <h3>Pro</h3>
    <div class="pricing-price">Coming Soon</div>
    <p style="color: var(--vp-c-text-2);">Advanced features</p>
    <ul class="pricing-features">
      <li>✅ Everything in Free</li>
      <li>✅ Unlimited projects</li>
      <li>✅ Unlimited services</li>
      <li>✅ Advanced analytics</li>
      <li>✅ Priority support</li>
    </ul>
    <div style="text-align: center; margin-top: 1rem;">
      <p style="font-weight: 600; margin-bottom: 0.5rem;">Get notified when Pro launches:</p>
      <div class="email-capture">
        <input type="email" placeholder="your@email.com" id="pro-email" />
        <button onclick="captureEmail('pro')">Notify Me</button>
      </div>
    </div>
  </div>

</div>

<script setup>
function captureEmail(tier) {
  const emailInput = document.getElementById(`${tier}-email`);
  const email = emailInput?.value;
  
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address');
    return;
  }
  
  // TODO: Integrate with your email collection service (e.g., Mailchimp, ConvertKit, etc.)
  // For now, just show a confirmation
  alert(`Thanks for your interest in Dtapline ${tier.charAt(0).toUpperCase() + tier.slice(1)}! We'll notify you at ${email}`);
  emailInput.value = '';
  
  // You can also send to a backend endpoint:
  // fetch('/api/waitlist', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, tier })
  // });
}
</script>

---

## Why Choose Dtapline?

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin: 2rem 0;">
  
  <div>
    <h3>🎨 Proven UX Pattern</h3>
    <p>Inspired by Octopus Deploy's industry-leading deployment dashboard. Large, colorful status indicators make deployment state obvious at a glance.</p>
  </div>

  <div>
    <h3>🔓 Open Source Freedom</h3>
    <p>AGPL-3.0 license means no vendor lock-in. Self-host on your infrastructure, modify the source code, and keep full control of your data.</p>
  </div>

  <div>
    <h3>⚡ Modern Tech Stack</h3>
    <p>Built with Effect-TS for functional programming benefits: type-safe error handling, composable effects, and built-in retry/recovery patterns.</p>
  </div>

  <div>
    <h3>🚀 Zero Setup Friction</h3>
    <p>No manual configuration required. Just report deployments from your CI/CD, and Dtapline auto-creates services and environments as needed.</p>
  </div>

  <div>
    <h3>🌐 Multi-Platform Support</h3>
    <p>Works with GitHub, GitLab, Bitbucket, and Azure DevOps. Automatic diff URL generation for comparing code changes between environments.</p>
  </div>

  <div>
    <h3>📦 Flexible Deployment</h3>
    <p>Deploy to AWS Lambda (serverless), or traditional servers. Complete Terraform infrastructure included.</p>
  </div>

</div>

---

## Perfect For

- **DevOps Engineers** managing multi-service, multi-environment deployments
- **Engineering Teams** practicing continuous deployment
- **Release Managers** coordinating deployments across microservices
- **Open Source Projects** needing free deployment tracking

---


## Community & Support

- **GitHub Discussions**: Ask questions and share ideas
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Comprehensive guides and API reference

<div style="text-align: center; margin: 3rem 0;">
  <a href="https://github.com/dtapline/dtapline" class="vp-button brand" style="display: inline-block; padding: 12px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; margin: 0 0.5rem;">
    ⭐ Star on GitHub
  </a>
  <a href="/docs/cli-integration" class="vp-button alt" style="display: inline-block; padding: 12px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; margin: 0 0.5rem;">
    Read the Docs
  </a>
</div>

---

<div style="text-align: center; padding: 3rem 0; border-top: 1px solid var(--vp-c-divider);">
  <h2 style="margin-bottom: 1rem;">Start Tracking Deployments Today</h2>
  <p style="font-size: 1.2rem; color: var(--vp-c-text-2); margin-bottom: 2rem;">Open source, self-hosted, and free forever.</p>
  <a href="https://app.dtapline.com/demo" class="vp-button brand" style="display: inline-block; padding: 16px 48px; font-size: 1.2rem; border-radius: 10px; text-decoration: none; font-weight: 600;">
    Try the Live Demo →
  </a>
</div>

</div>
