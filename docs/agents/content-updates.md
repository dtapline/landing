# Content Update Guidelines

## Home Page (index.md)

### Hero Section
```yaml
hero:
  name: Dtapline
  text: Visualize Deployments Across Your Environments
  tagline: Short description here
  image:
    src: /showcase.png
    alt: Description
  actions:
    - theme: brand
      text: Button Text
      link: /path-or-url
```

### Features
```yaml
features:
  - icon: 📊
    title: Feature Name
    details: Feature description here
```

### Custom HTML Sections
Wrap custom content in:
```html
<div class="vp-doc" style="max-width: 1152px; margin: 4rem auto; padding: 0 24px;">
  <!-- Your content -->
</div>
```

### Pricing Cards
Use custom HTML with `.pricing-card` class. See `index.md` for examples.

## Documentation Pages (docs/*.md)

### Structure
1. Start with H1 (`#`) heading
2. Use hierarchical headings (H2, H3, H4)
3. Include complete, runnable code examples
4. Document CLI options/arguments in tables

### Example Table Format
```markdown
| Option | Type | Description |
|--------|------|-------------|
| `--api-key` | string | API key for authentication |
```

## Adding New Pages

1. Create `.md` file in root or `docs/` directory
2. Add frontmatter with `title` (minimum)
3. Add navigation link in `.vitepress/config.ts`:
   - Edit `nav()` for top navigation
   - Edit `sidebarDocs()` for docs sidebar
4. Follow existing page patterns
