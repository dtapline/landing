# TypeScript Guidelines

## Scope

TypeScript is used **minimally** - only in VitePress config files:
- `.vitepress/config.ts`
- `.vitepress/theme/index.ts`

No `tsconfig.json` present (VitePress handles TypeScript internally).

## Import Patterns

### Named Imports (Preferred)
```typescript
import { defineConfig } from "vitepress";
```

### Default Imports
```typescript
import DefaultTheme from "vitepress/theme";
```

## Type Usage

- **Rely on VitePress's built-in types**
- **No explicit type annotations** in config files
- Use type inference

## Config File Pattern

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  // Configuration options
});

function nav() {
  return [
    { text: "Home", link: "/" },
    { text: "Docs", link: "/docs/cli-integration" },
  ];
}

function sidebarDocs() {
  return [
    {
      text: "CLI Integration",
      link: "/docs/cli-integration",
    },
  ];
}
```

## File Naming

Use kebab-case for all markdown files: `cli-integration.md`, `ci-cd-examples.md`
