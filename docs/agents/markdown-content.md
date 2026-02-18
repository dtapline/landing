# Markdown Content Guidelines

## Frontmatter

```yaml
---
layout: home  # or 'doc' for documentation pages
title: Page Title
---
```

## Links

- **Internal:** Relative paths `/docs/cli-integration`
- **External:** Full URLs `https://app.dtapline.com`
- **GitHub:** Use `https://github.com/dtapline/dtapline` (placeholder until repo is public)

## Emojis

Use sparingly for visual interest in features section only.

**Examples:** `📊`, `⚡`, `🎯`, `🔗`, `🏠`, `⚙️`

**Avoid** overuse in documentation pages.

## Custom HTML Patterns

### Grid Layout for Content Sections
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
  <div>
    <h3>Section Title</h3>
    <p>Content here</p>
  </div>
</div>
```

### Custom Content Wrapper
```html
<div class="vp-doc" style="max-width: 1152px; margin: 4rem auto; padding: 0 24px;">
  <!-- Custom content here -->
</div>
```

## Email Capture Forms

```html
<div class="email-capture">
  <input type="email" id="tier-email" placeholder="you@company.com">
  <button onclick="captureEmail('tier')">Join Waitlist</button>
</div>
```

**ID Pattern:** `${tier}-email` (e.g., `pro-email`, `enterprise-email`)

**Note:** Currently shows JavaScript alert (placeholder for backend integration).

## Status Badges

Available CSS classes:
- `.status-success` - Green
- `.status-failed` - Red
- `.status-in-progress` - Yellow

**Usage:**
```html
<span class="status-success">Success</span>
```
