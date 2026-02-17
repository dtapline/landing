# Dtapline Landing Page

VitePress-based landing page and documentation for Dtapline.

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment

This site is deployed to Netlify and served at `dtapline.com`.

### Netlify Configuration

- Build command: `pnpm build`
- Publish directory: `.vitepress/dist`
- Node version: 20

### Environment Variables

No environment variables required for the landing page.

### Custom Domain

- **Landing page**: `dtapline.com`
- **App**: `app.dtapline.com`

## Analytics

### Google Analytics

To enable Google Analytics:

1. Get your GA tracking ID from [analytics.google.com](https://analytics.google.com)
2. Edit `.vitepress/config.ts`
3. Uncomment the Google Analytics script tags
4. Replace `YOUR_GA_ID` with your actual GA ID (e.g., `G-XXXXXXXXXX`)

### Netlify Analytics

Netlify Analytics is enabled by default in the Netlify dashboard. No configuration needed.

## Email Capture

The pricing section includes email capture forms for Pro and Enterprise waitlist.

Current implementation shows a JavaScript alert. To integrate with an email service:

1. Choose a service (Mailchimp, ConvertKit, EmailOctopus, etc.)
2. Edit `index.md` and update the `captureEmail` function
3. Add API endpoint or service integration

Example with a backend API:

```javascript
function captureEmail(tier) {
  const emailInput = document.getElementById(`${tier}-email`);
  const email = emailInput?.value;
  
  fetch('https://app.dtapline.com/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, tier })
  })
  .then(() => {
    alert(`Thanks! We'll notify you at ${email}`);
    emailInput.value = '';
  })
  .catch(err => alert('Error: ' + err.message));
}
```

## Structure

```
landing/
├── .vitepress/
│   ├── config.ts           # VitePress configuration
│   ├── theme/
│   │   ├── index.ts        # Theme customization
│   │   └── custom.css      # Dtapline-aligned styles
│   └── dist/               # Build output (generated)
├── docs/
│   ├── cli-integration.md  # CLI reference
│   └── ci-cd-examples.md   # CI/CD platform examples
├── public/
│   ├── logo.svg            # Dtapline logo
│   └── showcase.png        # Dashboard screenshot
├── index.md                # Home page
├── netlify.toml            # Netlify configuration
├── package.json            # Dependencies
└── README.md               # This file
```

## Updating Content

### Home Page

Edit `index.md` to update:
- Hero section
- Features
- Pricing
- Call-to-action sections

### Documentation

Edit files in `docs/` directory.

### Navigation

Edit `.vitepress/config.ts`:
- `nav()` function for top navigation
- `sidebarDocs()` function for docs sidebar

### Styling

Edit `.vitepress/theme/custom.css` for visual customizations.

## GitHub Repository URL

Throughout the site, `https://github.com/dtapline/dtapline` is used as a placeholder.

Before making the repo public, do a global find-and-replace:
- Find: `dtapline/dtapline`
- Replace: `actual-org/dtapline`

Files to update:
- `.vitepress/config.ts`
- `index.md`
- All docs in `docs/` directory

## License

AGPL-3.0 - Same as the main Dtapline project.
