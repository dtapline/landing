# Deployment Configuration

## Netlify Configuration (netlify.toml)

### Build Settings
```toml
[build]
publish = ".vitepress/dist"
command = "pnpm build"

[build.environment]
NODE_VERSION = "20"
PNPM_VERSION = "9.10.0"
```

### Redirects

#### External Redirects
```toml
[[redirects]]
from = "/demo"
to = "https://app.dtapline.com/demo"
status = 302

[[redirects]]
from = "/app/*"
to = "https://app.dtapline.com/:splat"
status = 302

[[redirects]]
from = "/github"
to = "https://github.com/dtapline/dtapline"
status = 302
```

#### SPA Fallback
```toml
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

### Security Headers

```toml
[[headers]]
for = "/*"
[headers.values]
X-Frame-Options = "SAMEORIGIN"
X-Content-Type-Options = "nosniff"
X-XSS-Protection = "1; mode=block"
Referrer-Policy = "strict-origin-when-cross-origin"
```

### Cache Headers

```toml
# 1 year cache for assets
[[headers]]
for = "/assets/*"
[headers.values]
Cache-Control = "public, max-age=31536000, immutable"

# 1 year cache for images
[[headers]]
for = "/*.png"
[headers.values]
Cache-Control = "public, max-age=31536000"
```

## Build Verification

Run locally before pushing:
```bash
pnpm build
```

VitePress validates internal links during build. Fix any dead link errors before deploying.
