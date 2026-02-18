# Introduction

Welcome to Dtapline! This documentation will help you get started with tracking and visualizing deployments across your environments and services.

## What is Dtapline?

Dtapline is a deployment tracking and visualization platform that helps teams monitor their software deployments across multiple environments. Whether you're deploying to production, staging, or development environments, Dtapline provides a unified view of what's running where.

### The Name

**Dtapline** comes from **DTAP**, a common abbreviation for the software development pipeline stages:

- **D**evelopment - 🔵 Blue
- **T**esting - 🟢 Green
- **A**cceptance - 🟡 Amber
- **P**roduction - 🟣 Purple

The name reflects the platform's core purpose: tracking deployments as they move through your pipeline from development to production.

#### DTAP Color Convention

Each environment stage traditionally has an associated color to make it instantly recognizable:

- **Development (Blue)**: The earliest stage - safezone, where developers work on features and bug fixes. Blue represents the beginning of the pipeline, where code is still in active development.

- **Testing (Green)**: Where automated and manual testing occurs. Green symbolizes greenfield - that the code is ready for validation and quality assurance.

- **Acceptance (Amber)**: A production-like environment for final validation before release. Amber (yellow/orange) serves as a warning color—code is almost ready for production but still requires final approval.

- **Production (Purple)**: The live environment serving real users. Purple represents the premium, final stage where tested and approved code runs.

**Note**: While DTAP provides a traditional framework, Dtapline supports any environment names and colors you prefer. You can create custom environments like "QA", "UAT", "Canary", or "Demo" and assign your own colors to match your workflow.

## Why Dtapline Exists

Dtapline was inspired by [Octopus Deploy's](https://octopus.com/) deployment matrix visualization, which provides an excellent overview of what's deployed where. However, we wanted to create something that is:

- **Simpler to use**: No complex setup or learning curve—just install a CLI and start tracking
- **Open source friendly**: Built with transparency and community collaboration in mind
- **Designed for modern workflows**: Integrates seamlessly with any CI/CD platform

### The Problem We Solve

As teams adopt microservice architectures, embrace GitOps practices, and deploy more frequently, keeping track of deployment state becomes increasingly challenging:

- **"What version is running in production?"** - Simple question, but often requires checking multiple dashboards, CI/CD logs, or cloud consoles
- **"Are all services deployed to staging?"** - With 10+ microservices, ensuring consistency across environments is tedious
- **"What's the difference between staging and production?"** - Comparing deployment states manually is error-prone and time-consuming
- **"Who deployed that service yesterday?"** - Audit trails are scattered across different tools

Modern GitOps workflows make deployments more automated and declarative, but this also means deployment events are distributed across various tools—GitHub Actions, Kubernetes operators, Jenkins, and more. While GitOps handles the "how" of deployments beautifully, teams still need visibility into the "what" and "where" across their entire system.

**Dtapline solves these problems** by providing a single, centralized view of your deployment state across all environments and services. The matrix visualization makes it instantly clear what's deployed where, who deployed it, and when—regardless of which GitOps tool or CI/CD platform you use.

## Key Features

- **Visual 2D Deployment Matrix**: Octopus Deploy-inspired dashboard showing Services × Environments in a clean grid with color-coded status indicators
- **Deployment Tracking**: Automatically track deployments from your CI/CD pipelines
- **Multi-Environment Support**: Monitor deployments across unlimited environments (production, staging, dev, etc.)
- **Multi-Service Architecture**: Track multiple services and microservices in one place
- **Deployment History**: View complete deployment history with commit information
- **Automatic Diff URLs**: Generate comparison links between environments for GitHub, GitLab, Bitbucket, and Azure DevOps
- **CI/CD Integration**: Easy integration with GitHub Actions, GitLab CI, Jenkins, and more
- **GitOps Compatible**: Works seamlessly with GitOps tools and Kubernetes-native deployment workflows
- **Open Source & Self-Hosted**: AGPL-3.0 licensed, deploy to AWS Lambda, or bare metal with full control
- **Modern Tech Stack**: Built with Effect-TS for type-safe error handling, dependency injection, and composable effects
- **Security & Access Control**: API key authentication with scoped permissions and GitHub OAuth support
- **Team Visibility**: Give your entire team visibility into deployment status

## How It Works

1. **Install the CLI**: Add `@dtapline/cli` to your CI/CD pipeline
2. **Get an API Key**: Generate an API key from the Dtapline dashboard
3. **Report Deployments**: Use the CLI to report deployments after successful deploys
4. **Visualize**: View your deployment status in the Dtapline dashboard

### Quick Example

```bash
# Install the CLI
npm install -g @dtapline/cli

# Report a deployment
dtapline deploy production api-service abc123def456 \
  --deployed-version v1.2.3 \
  --status success
```

That's it! Your deployment is now tracked in Dtapline.

## Use Cases

### Microservice Deployment Consistency

One of the biggest challenges teams face with microservices is maintaining consistent deployment state across environments. With multiple services deployed independently, it's easy to lose track of which versions are where.

**Common challenges:**
- Service A is on v1.5 in production but v1.8 in staging, while Service B is on v2.1 in both
- Breaking changes in one service haven't been deployed to all dependent services yet
- Hotfixes applied to production but not yet propagated to staging
- No clear overview when asked "what's the state of our staging environment?"

**How Dtapline helps:**

Dtapline's matrix view shows all services across all environments in one place, making it instantly obvious when services are out of sync or when environment states differ unexpectedly.

### Multi-Service Microarchitecture

Track deployments across multiple microservices to ensure all services are in sync and identify version mismatches between environments.

### Environment Comparison

Quickly see what commits are deployed to production vs. staging to understand what changes will be promoted next.

### Deployment Auditing

Maintain a complete audit trail of all deployments, including who deployed, when, and what version.

### Team Coordination

Give your entire team visibility into deployment status without requiring access to CI/CD tools or cloud consoles.

## Feature Deep Dive

### Visual Deployment Matrix

Dtapline's matrix visualization is inspired by Octopus Deploy's proven UX pattern:

- **2D Grid Layout**: Services displayed as rows, environments as columns
- **Color-Coded Status**: 
  - 🟢 Green for successful deployments
  - 🔴 Red for failed deployments
  - 🟡 Amber for in-progress deployments
  - ⚫ Gray for rolled back deployments
- **Version Display**: Shows semantic versions (e.g., `v1.2.3`) or commit SHAs
- **Relative Timestamps**: Human-readable times like "2h ago", "3 days ago"
- **Clickable Details**: Click any deployment cell to see full metadata

### Smart Automation

Zero-configuration setup with intelligent defaults:

- **Auto-Creation**: Services and environments are created automatically on first deployment
- **Diff URL Generation**: Automatically generates comparison links between environments based on your repository platform
- **CI/CD Platform Detection**: Recognizes GitHub Actions, GitLab CI, and other platforms from metadata _(coming soon)_

### Security & Access Control

Enterprise-ready security features:

- **API Key Authentication**: Scoped keys with granular permissions:
  - `deployments:write` - Report deployments from CI/CD
  - `deployments:read` - Read deployment data _(coming soon)_
  - `admin` - Full project access _(coming soon)_
- **Secure Storage**: API keys hashed with bcrypt and displayed only once at creation
- **Session Management**: Cookie-based authentication for dashboard access
- **GitHub OAuth**: Social login support for easy team onboarding _(coming soon)_

### Deployment History & Analytics

Complete visibility into deployment patterns:

- **Complete Audit Trail**: Every deployment recorded with full metadata (who, what, when, where)
- **Timeline View**: Visual history for each service-environment combination
- **Status Tracking**: Monitor in-progress deployments and receive updates

### Global Environment Management

Flexible environment configuration across projects:

- **Reusable Environments**: Define environments once, use across multiple projects
- **Custom Ordering**: Control the left-to-right sequence in the matrix view (typically Development → Testing → Acceptance → Production)
- **Color Customization**: Assign hex colors for quick visual identification. While traditional DTAP colors (blue, green, amber, purple) are common, you can use any colors that work for your team
- **Flexible Selection**: Each project can enable only the environments it needs

## Getting Started

Ready to start tracking your deployments? Follow these guides:

1. **[CLI Integration](/docs/cli-integration)** - Learn how to integrate Dtapline with your deployment pipeline
2. **[CI/CD Examples](/docs/ci-cd-examples)** - See complete examples for your CI/CD platform

## Perfect For

Dtapline is ideal for teams and individuals who need clear deployment visibility:

- **DevOps Engineers** - Managing multi-service, multi-environment deployments across complex infrastructure
- **Engineering Teams** - Practicing continuous deployment and needing quick deployment status visibility
- **Release Managers** - Coordinating deployments across microservices and ensuring consistency
- **Open Source Projects** - Needing free, self-hosted deployment tracking without vendor lock-in

## Deployment & Hosting Options

Dtapline is designed to be flexible in how you deploy it:

- **Self-Hosted**: Full control over your data and infrastructure
- **AWS Lambda**: Serverless deployment with included Terraform configuration
- **Bare Metal**: Traditional server deployment

All deployment options are AGPL-3.0 licensed, ensuring transparency and no vendor lock-in.

## Support

Need help? We're here for you:

- **GitHub Discussions**: [github.com/dtapline/dtapline/discussions](https://github.com/dtapline/dtapline/discussions)
- **GitHub Issues**: [github.com/dtapline/dtapline/issues](https://github.com/dtapline/dtapline/issues)
- **Documentation**: You're reading it!

Let's get started with [CLI Integration](/docs/cli-integration)!
