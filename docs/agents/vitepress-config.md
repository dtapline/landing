# VitePress Configuration

Configuration file: `.vitepress/config.ts`

## Navigation Structure

### Top Navigation
Edit the `nav()` function to modify top navigation bar items.

Keep navigation concise: 3-5 main items.

```typescript
function nav() {
  return [
    { text: "Home", link: "/" },
    { text: "Docs", link: "/docs/cli-integration", activeMatch: "/docs/" },
    { 
      text: "Account",
      items: [
        { text: "Login", link: "https://app.dtapline.com/login" },
        { text: "Sign Up", link: "https://app.dtapline.com/signup" },
      ]
    },
  ];
}
```

### Sidebar
Edit the `sidebarDocs()` function for `/docs/*` pages sidebar.

```typescript
function sidebarDocs() {
  return [
    {
      text: "CLI Integration",
      link: "/docs/cli-integration",
    },
    {
      text: "CI/CD Examples",
      link: "/docs/ci-cd-examples",
    },
  ];
}
```

## Social Links

```typescript
socialLinks: [
  { icon: "github", link: "https://github.com/dtapline/dtapline" },
]
```

More platforms available: `"twitter"`, `"discord"`, `"linkedin"`, etc.

## Dead Links Configuration

Localhost URLs are ignored for code examples:

```typescript
ignoreDeadLinks: [/^http:\/\/localhost/, /^https:\/\/localhost/]
```
