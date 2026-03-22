# Trusti Design System

## Project Overview
This is Trusti's 2026 design system implementation, derived directly from the Figma file
"Design System Rebuild" (key: `nG8PGu5CclffafrfZuMG9G`). It contains all foundations,
tokens, and React components matching the Figma source of truth.

## Tech Stack
- **React 18** + **TypeScript 5**
- **CSS Custom Properties** for design tokens (no Tailwind, no CSS-in-JS)
- **CSS Modules** for component styling
- **Vite** for dev server and builds
- Font: **Source Sans 3** (Google Fonts)

## Project Structure
```
src/
├── tokens/           # Design tokens as CSS vars + TS constants
│   ├── colors.ts     # Color palette + semantic colors
│   ├── typography.ts # Type scale (desktop + mobile)
│   ├── spacing.ts    # 2px-based spacing scale (T-shirt sizes)
│   ├── elevation.ts  # 5-level shadow system
│   ├── grids.ts      # Grid definitions (4 breakpoints)
│   └── index.ts      # Unified token export
├── styles/
│   ├── tokens.css    # All CSS custom properties
│   ├── reset.css     # Minimal reset
│   └── global.css    # Global styles + font import
├── components/
│   ├── atoms/        # Foundation-level primitives (Icon)
│   ├── molecules/    # Alerts, Buttons, Checkbox, Radio, Input, etc.
│   ├── organisms/    # Offers list, Modal, Drawer, Accordion
│   └── templates/    # Navigation, Footer, Vehicle card, Cart, FAQ, Carousel
├── hooks/            # Shared hooks (useBreakpoint, etc.)
└── utils/            # Helpers
```

## Conventions
- **Token-first**: Never hard-code colors, spacing, shadows, or font values.
  Always reference tokens via CSS vars (`var(--color-brand)`) or TS constants.
- **Component files**: Each component gets a folder with `index.tsx`, `styles.module.css`,
  and optionally `types.ts`.
- **Naming**: Component folders use PascalCase. Token files use camelCase.
- **Responsive**: Use the breakpoint at 768px — below is mobile, above is desktop.
  No intermediate tablet breakpoint for typography. Grids have 4 breakpoints.
- **Accessibility**: All interactive components must have proper ARIA attributes,
  keyboard navigation, and meet WCAG AA contrast (4.5:1 text, 3:1 large text/UI).

## Figma Source Mapping
Every component maps to a Figma page. Node IDs are documented in each component file
as comments for traceability. Use `get_design_context` with the file key
`nG8PGu5CclffafrfZuMG9G` and the node ID to pull the latest design data.

## Key Design Decisions
- Mobile/H6 weight: implement as 500 (Medium), not 600 as Figma currently shows
- OpenType features cv12-cv16: excluded pending design team verification
- Spacing scale: 2px base, T-shirt naming (None=0, XXS=2 ... Max=128)
- Elevation: 5 levels, each using 5 layered drop-shadows for depth
- Brand color: #FFA500 (orange)
- Accent primary: Orange 600 (#F76803)
