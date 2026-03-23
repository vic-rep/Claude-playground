/* ═══════════════════════════════════════════════════════════
   @trusti/design-system — Main Entry Point
   Source: Figma "Design System Rebuild" (nG8PGu5CclffafrfZuMG9G)
   ═══════════════════════════════════════════════════════════ */

// ── Tokens ─────────────────────────────────────────────────
export * from './tokens';

// ── Hooks ──────────────────────────────────────────────────
export * from './hooks';

// ── Molecules ──────────────────────────────────────────────
export { Button } from './components/molecules/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/molecules/Button';

export { Alert } from './components/molecules/Alert';
export type { AlertProps, AlertVariant, AlertAction } from './components/molecules/Alert';

export { Checkbox } from './components/molecules/Checkbox';
export type { CheckboxProps } from './components/molecules/Checkbox';

export { Radio, RadioThumb } from './components/molecules/Radio';
export type { RadioProps, RadioThumbProps } from './components/molecules/Radio';

export { Input } from './components/molecules/Input';
export type { InputProps, InputSize } from './components/molecules/Input';

export { Toggle } from './components/molecules/Toggle';
export type { ToggleProps } from './components/molecules/Toggle';

export { Tooltip } from './components/molecules/Tooltip';
export type { TooltipProps, TooltipPosition } from './components/molecules/Tooltip';

export { Pill } from './components/molecules/Pill';
export type { PillProps, PillVariant } from './components/molecules/Pill';

export { Tag } from './components/molecules/Tag';
export type { TagProps } from './components/molecules/Tag';

export { Toast } from './components/molecules/Toast';
export type { ToastProps, ToastVariant } from './components/molecules/Toast';

export { Tabs } from './components/molecules/Tabs';
export type { TabsProps, Tab } from './components/molecules/Tabs';

export { Pagination } from './components/molecules/Pagination';
export type { PaginationProps } from './components/molecules/Pagination';

export { ProgressBar } from './components/molecules/ProgressBar';
export type { ProgressBarProps } from './components/molecules/ProgressBar';

export { Slider } from './components/molecules/Slider';
export type { SliderProps } from './components/molecules/Slider';

export { ContextMenu } from './components/molecules/ContextMenu';
export type { ContextMenuProps, ContextMenuItem } from './components/molecules/ContextMenu';

export { Logo } from './components/molecules/Logo';
export type { LogoProps, LogoSize } from './components/molecules/Logo';

// ── Logo Assets ─────────────────────────────────────────────
export {
  logoRegistry,
  getLogosByCategory,
  getAllLogoNames,
  getLogoCategories,
} from './assets/logos';
export type { LogoCategory, LogoVariant, LogoEntry } from './assets/logos';

// ── Organisms ──────────────────────────────────────────────
export { Modal } from './components/organisms/Modal';
export type { ModalProps, ModalSize } from './components/organisms/Modal';

export { Drawer } from './components/organisms/Drawer';
export type { DrawerProps, DrawerVariant } from './components/organisms/Drawer';

export { Accordion } from './components/organisms/Accordion';
export type { AccordionProps, AccordionItem } from './components/organisms/Accordion';

export { OffersList } from './components/organisms/OffersList';
export type { OffersListProps, OfferItem, OfferProduct } from './components/organisms/OffersList';

// ── Templates ──────────────────────────────────────────────
export { Navigation } from './components/templates/Navigation';
export type { NavigationProps, NavItem } from './components/templates/Navigation';

export { Footer } from './components/templates/Footer';
export type { FooterProps, FooterColumn } from './components/templates/Footer';

export { VehicleDetailsCard } from './components/templates/VehicleDetailsCard';
export type { VehicleDetailsCardProps, VehicleDetails } from './components/templates/VehicleDetailsCard';

export { Cart } from './components/templates/Cart';
export type { CartProps, CartItem } from './components/templates/Cart';

export { FAQ } from './components/templates/FAQ';
export type { FAQProps, FAQItem } from './components/templates/FAQ';

export { Carousel } from './components/templates/Carousel';
export type { CarouselProps } from './components/templates/Carousel';
