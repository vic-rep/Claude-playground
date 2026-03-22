# @trusti/design-system

Trusti's 2026 design system — React component library and design tokens, derived directly from the Figma source of truth.

## Quick Start

```bash
npm install
npm run dev
```

## Architecture

| Layer | Contents | Figma Source |
|---|---|---|
| **Tokens** | Colors, Typography, Spacing, Elevation, Grids | ⚛ Atoms foundation pages |
| **Molecules** | Button, Alert, Checkbox, Radio, Input, Toggle, Tooltip, Pill, Tag, Toast, Tabs, Pagination, ProgressBar, Slider, ContextMenu, Logo | 🧪 Molecules pages |
| **Organisms** | Modal, Drawer, Accordion, OffersList | 🐿 Organisms pages |
| **Templates** | Navigation, Footer, VehicleDetailsCard, Cart, FAQ, Carousel | ⛺ Templates pages |

## Design Tokens

All design tokens are available as both **CSS custom properties** and **TypeScript constants**.

### CSS Custom Properties

Import the global styles to get all token variables:

```css
@import '@trusti/design-system/styles/global.css';
```

Then use anywhere:

```css
.my-component {
  color: var(--text-primary);
  padding: var(--space-l);
  box-shadow: var(--elevation-level1);
  font-size: var(--font-size-h3);
}
```

### TypeScript Constants

```tsx
import { colors, spacing, elevation, typography } from '@trusti/design-system';

console.log(colors.accent[600]);     // '#F76803'
console.log(spacing.l);              // 16
console.log(elevation.level2);       // full box-shadow string
console.log(typography.desktop.h1);  // { fontSize: 48, fontWeight: 600, ... }
```

## Components

Every component is a named export from the main package:

```tsx
import { Button, Modal, Accordion, OffersList } from '@trusti/design-system';
```

### Responsive Hook

```tsx
import { useBreakpoint, useIsMobile } from '@trusti/design-system';

function MyComponent() {
  const breakpoint = useBreakpoint(); // 'mobile' | 'tabletPortrait' | 'tabletLandscape' | 'desktop'
  const isMobile = useIsMobile();
  // ...
}
```

## Figma Source

- **File**: Design System Rebuild
- **Key**: `nG8PGu5CclffafrfZuMG9G`
- Every component file includes Figma node IDs as comments for traceability

## Key Design Decisions

- **Font**: Source Sans 3 (Regular 400, Medium 500, SemiBold 600)
- **Spacing**: 2px base scale with T-shirt sizing (XXS=2px ... Max=128px)
- **Elevation**: 5 levels, each composed of 5 layered box-shadows
- **Responsive typography**: Single breakpoint at 768px (desktop ↔ mobile)
- **Brand color**: `#FFA500` | **Accent primary**: `#F76803`
- Mobile/H6 weight: implemented as 500 (Medium), correcting Figma's 600
- OpenType features cv12–cv16: excluded pending design team verification
