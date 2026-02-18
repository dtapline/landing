# Styling & CSS Guidelines

## Color System

**Use OKLCH color space exclusively** for modern, perceptually uniform colors.

### Brand Colors
- **Primary:** Violet `#8B5CF6`
- **Darker:** `#7C3AED`
- **Lighter:** `#A78BFA`

### Theme Colors
```css
/* Light mode */
--vp-c-bg: oklch(1 0 0);              /* white */
--vp-c-text-1: oklch(0.145 0 0);      /* near black */

/* Dark mode */
--vp-c-bg: oklch(0.145 0 0);          /* near black */
--vp-c-text-1: oklch(0.985 0 0);      /* near white */
```

## CSS Naming Conventions

- **Component classes:** kebab-case (`.pricing-card`, `.email-capture`)
- **Related elements:** BEM-inspired (`.pricing-card`, `.pricing-price`, `.pricing-features`)
- **VitePress classes:** `.VP` prefix (`.VPHome`, `.VPHero`, `.VPButton`)

## Border Radius

**Standard:** `0.625rem` (10px) for all components.

Apply to: buttons, cards, inputs, code blocks, images, screenshots.

## Transitions and Animations

### Standard Transitions
```css
transition: all 150ms;
```

### Hover Effects
- Cards: `transform: translateY(-2px)`
- Buttons: `transform: translateY(-1px)`

### Hero Gradient Animation
```css
@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  100% { background-position: -200% 50%; }
}
/* Duration: 4s linear infinite */
```

## Responsive Design

### Breakpoints
- **Mobile:** `max-width: 768px`
- **Desktop:** `min-width: 960px`

### Approach
Mobile-first: Stack layouts vertically on small screens, use grid on desktop.

### Common Pattern
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 2rem;
```
