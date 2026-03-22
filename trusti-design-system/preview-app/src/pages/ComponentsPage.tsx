import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  ContextMenu,
  Input,
  Logo,
  Pagination,
  Pill,
  ProgressBar,
  Radio,
  RadioThumb,
  Slider,
  Tabs,
  Tag,
  Toast,
  Toggle,
  Tooltip,
  Accordion,
  Drawer,
  Modal,
  FAQ,
  Carousel,
  VehicleDetailsCard,
  getLogosByCategory,
  getLogoCategories,
} from '@trusti/design-system';
import type { LogoCategory } from '@trusti/design-system';

/* ─────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────── */

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  const anchorId = title.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="component-card" id={anchorId} style={{ marginBottom: 24, scrollMarginTop: 24 }}>
      <h3>{title}</h3>
      <p className="card-desc">{desc}</p>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Component demos
   ───────────────────────────────────────────────────────── */

function AlertDemo() {
  const noop = () => {};
  return (
    <Section title="Alert" desc="Collapsible contextual alerts: info, success, warning, destructive. Click chevron to expand.">
      <div className="demo-vertical">
        <Alert variant="warning" title="Informational notification" />
        <Alert
          variant="warning"
          title="Informational notification"
          defaultExpanded
          action={{ label: 'Button text', onClick: noop }}
          linkAction={{ label: 'Button text', onClick: noop }}
        >
          Additional text goes here
        </Alert>
        <Alert variant="destructive" title="Informational notification" />
        <Alert
          variant="destructive"
          title="Informational notification"
          defaultExpanded
          action={{ label: 'Button text', onClick: noop }}
          linkAction={{ label: 'Button text', onClick: noop }}
        >
          Additional text goes here
        </Alert>
        <Alert variant="info" title="Informational notification" />
        <Alert
          variant="info"
          title="Informational notification"
          defaultExpanded
          action={{ label: 'Button text', onClick: noop }}
          linkAction={{ label: 'Button text', onClick: noop }}
        >
          Additional text goes here
        </Alert>
        <Alert variant="success" title="Informational notification" />
        <Alert
          variant="success"
          title="Informational notification"
          defaultExpanded
          action={{ label: 'Button text', onClick: noop }}
          linkAction={{ label: 'Button text', onClick: noop }}
        >
          Additional text goes here
        </Alert>
      </div>
    </Section>
  );
}

function ButtonDemo() {
  const iconArrow = <i className="fa-solid fa-chevron-right" aria-hidden="true" />;
  const iconHome = <i className="fa-regular fa-house" aria-hidden="true" />;
  return (
    <Section title="Button" desc="Variants: primary, secondary, ghost, destructive. Sizes: sm, md, lg. Supports leading/trailing icons and icon-only.">
      <div className="label">Variants</div>
      <div className="demo" style={{ marginBottom: 12 }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="label">Sizes</div>
      <div className="demo" style={{ marginBottom: 12 }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="label">With Icons</div>
      <div className="demo" style={{ marginBottom: 12 }}>
        <Button variant="primary" size="lg" leadingIcon={iconHome} trailingIcon={iconArrow}>Button text</Button>
        <Button variant="secondary" size="lg" leadingIcon={iconHome} trailingIcon={iconArrow}>Button text</Button>
        <Button variant="ghost" size="lg" leadingIcon={iconHome} trailingIcon={iconArrow}>Button text</Button>
      </div>
      <div className="label">States</div>
      <div className="demo" style={{ marginBottom: 12 }}>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="ghost" disabled>Disabled</Button>
      </div>
      <div className="label">Icon-only</div>
      <div className="demo" style={{ marginBottom: 12 }}>
        <Button iconOnly size="sm"><i className="fa-regular fa-house" aria-hidden="true" /></Button>
        <Button iconOnly size="md"><i className="fa-regular fa-house" aria-hidden="true" /></Button>
        <Button iconOnly size="lg"><i className="fa-regular fa-house" aria-hidden="true" /></Button>
        <Button iconOnly disabled><i className="fa-regular fa-house" aria-hidden="true" /></Button>
      </div>
      <div className="label">Full Width</div>
      <div className="demo">
        <Button fullWidth>Full Width</Button>
      </div>
    </Section>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Section title="Checkbox" desc="Standard checkbox with label and helper text support.">
      <div className="demo-vertical">
        <Checkbox label="Accept terms and conditions" checked={checked} onChange={() => setChecked(!checked)} />
        <Checkbox label="Subscribe to newsletter" />
        <Checkbox label="Disabled option" disabled />
        <Checkbox label="With error" error helperText="This field is required" />
      </div>
    </Section>
  );
}

function ContextMenuDemo() {
  const [selected, setSelected] = useState('');
  return (
    <Section title="ContextMenu" desc="Dropdown menu with items, dividers, and destructive actions.">
      <ContextMenu
        items={[
          { id: 'edit', label: 'Edit' },
          { id: 'duplicate', label: 'Duplicate' },
          { id: 'divider', label: '', divider: true },
          { id: 'archive', label: 'Archive', disabled: true },
          { id: 'delete', label: 'Delete', destructive: true },
        ]}
        onSelect={(id: string) => setSelected(id)}
      />
      {selected && <p style={{ fontSize: 13, color: 'var(--color-primary-500)', marginTop: 8 }}>Selected: {selected}</p>}
    </Section>
  );
}

function InputDemo() {
  return (
    <Section title="Input" desc="Text input with label, helper text, error state, and icons.">
      <div className="demo-vertical" style={{ maxWidth: 400 }}>
        <Input label="Full name" placeholder="Enter your name" />
        <Input label="Email" placeholder="you@example.com" helperText="We'll never share your email." />
        <Input label="Password" placeholder="Enter password" error errorMessage="Password is too short." />
        <Input label="Disabled" placeholder="Cannot edit" disabled />
      </div>
    </Section>
  );
}

const categoryLabels: Record<LogoCategory, string> = {
  company: 'Company Logos',
  delivery: 'Delivery Logos',
  payment: 'Payment Logos',
  car: 'Car Logos',
  partnership: 'Partnership Logos',
};

function LogoDemo() {
  return (
    <Section title="Logo" desc="Logo component with registry lookup by name, supporting color and grayscale variants across 5 categories.">
      <div className="label">Sizes (using src prop)</div>
      <div className="demo" style={{ marginBottom: 16 }}>
        <Logo src="https://placehold.co/120x40/F76803/FFFFFF?text=Trusti" alt="Trusti" size="sm" />
        <Logo src="https://placehold.co/160x50/F76803/FFFFFF?text=Trusti" alt="Trusti" size="md" />
        <Logo src="https://placehold.co/200x60/F76803/FFFFFF?text=Trusti" alt="Trusti" size="lg" />
      </div>

      {getLogoCategories().map((cat) => {
        const logos = getLogosByCategory(cat);
        return (
          <div key={cat} style={{ marginBottom: 24 }}>
            <div className="label">{categoryLabels[cat]} ({logos.length})</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
              {logos.map((l) => (
                <div key={l.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 80 }}>
                  <Logo name={l.name} variant="color" size="md" />
                  <span style={{ fontSize: 10, color: 'var(--color-primary-400)' }}>{l.name}</span>
                </div>
              ))}
            </div>
            <div className="label" style={{ fontSize: 11, marginTop: 4 }}>Grayscale</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {logos.map((l) => (
                <div key={l.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 80 }}>
                  <Logo name={l.name} variant="grayscale" size="md" />
                  <span style={{ fontSize: 10, color: 'var(--color-primary-400)' }}>{l.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Section>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <Section title="Pagination" desc="Numeric pagination with page change callback.">
      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
      <p style={{ fontSize: 13, color: 'var(--color-primary-500)', marginTop: 8 }}>Current page: {page}</p>
    </Section>
  );
}

function PillDemo() {
  return (
    <Section title="Pill" desc="Compact badges in default, accent, success, warning, destructive variants.">
      <div className="demo">
        <Pill variant="default">Default</Pill>
        <Pill variant="accent">Accent</Pill>
        <Pill variant="success">Success</Pill>
        <Pill variant="warning">Warning</Pill>
        <Pill variant="destructive">Destructive</Pill>
        <Pill variant="accent" selected>Selected</Pill>
      </div>
    </Section>
  );
}

function ProgressBarDemo() {
  return (
    <Section title="ProgressBar" desc="Linear progress indicator with variants and labels.">
      <div className="demo-vertical" style={{ maxWidth: 500 }}>
        <ProgressBar value={25} label="Loading..." showValue />
        <ProgressBar value={60} variant="success" label="Upload progress" showValue />
        <ProgressBar value={85} variant="warning" showValue />
        <ProgressBar value={40} variant="destructive" size="sm" />
      </div>
    </Section>
  );
}

function RadioDemo() {
  const [val, setVal] = useState('a');
  const [thumbVal, setThumbVal] = useState('speedy');
  return (
    <Section title="Radio" desc="Standard radio buttons and card-style RadioThumb with logo/icon variants.">
      <div className="label">Standard Radio</div>
      <div className="demo-vertical" style={{ marginBottom: 24 }}>
        <Radio name="demo-radio" label="Option A" value="a" checked={val === 'a'} onChange={() => setVal('a')} />
        <Radio name="demo-radio" label="Option B" value="b" checked={val === 'b'} onChange={() => setVal('b')} />
        <Radio name="demo-radio" label="Option C (disabled)" value="c" disabled />
      </div>
      <div className="label">RadioThumb — Logo type</div>
      <div className="demo" style={{ marginBottom: 24 }}>
        <RadioThumb
          name="delivery"
          value="speedy"
          label="Speedy"
          checked={thumbVal === 'speedy'}
          onChange={setThumbVal}
          logo={<Logo name="Speedy" variant="color" size="sm" />}
          disclaimer="2,00 лв / 1,02 €"
        />
        <RadioThumb
          name="delivery"
          value="econt"
          label="Econt"
          checked={thumbVal === 'econt'}
          onChange={setThumbVal}
          logo={<Logo name="Ekont" variant="color" size="sm" />}
          disclaimer="3,50 лв / 1,79 €"
        />
        <RadioThumb
          name="delivery"
          value="disabled"
          label="DHL"
          disabled
          logo={<i className="fa-solid fa-truck" aria-hidden="true" />}
          disclaimer="N/A"
        />
      </div>
      <div className="label">RadioThumb — Icon type</div>
      <div className="demo">
        <RadioThumb
          name="pickup"
          value="office"
          label="Office"
          checked={thumbVal === 'office'}
          onChange={setThumbVal}
          icon={<i className="fa-regular fa-shop" aria-hidden="true" />}
          disclaimer="2,00 лв / 1,02 €"
        />
        <RadioThumb
          name="pickup"
          value="home"
          label="Home"
          checked={thumbVal === 'home'}
          onChange={setThumbVal}
          icon={<i className="fa-regular fa-house" aria-hidden="true" />}
          disclaimer="5,00 лв / 2,56 €"
        />
        <RadioThumb
          name="pickup"
          value="locker"
          label="Locker"
          checked={thumbVal === 'locker'}
          onChange={setThumbVal}
          icon={<i className="fa-regular fa-box" aria-hidden="true" />}
          disclaimer="1,50 лв / 0,77 €"
        />
      </div>
    </Section>
  );
}

function SliderDemo() {
  const [val, setVal] = useState(50);
  return (
    <Section title="Slider" desc="Range slider with optional value display.">
      <div style={{ maxWidth: 400 }}>
        <Slider label="Volume" value={val} onChange={setVal} showValue />
      </div>
    </Section>
  );
}

function TabsDemo() {
  return (
    <Section title="Tabs" desc="Pill-style tab group with active, hover, and disabled states.">
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'features', label: 'Features' },
          { id: 'pricing', label: 'Pricing' },
          { id: 'disabled', label: 'Disabled', disabled: true },
        ]}
        defaultActiveId="overview"
      />
    </Section>
  );
}

function TagDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Vite', 'CSS Modules']);
  return (
    <Section title="Tag" desc="Dismissible and static tags.">
      <div className="demo">
        {tags.map((t) => (
          <Tag key={t} onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>{t}</Tag>
        ))}
        <Tag variant="accent">Accent (static)</Tag>
      </div>
    </Section>
  );
}

function ToastDemo() {
  const [toasts, setToasts] = useState<Array<{ id: number; variant: 'info' | 'success' | 'warning' | 'destructive'; message: string }>>([]);
  const addToast = (variant: 'info' | 'success' | 'warning' | 'destructive') => {
    const id = Date.now();
    const messages = {
      info: 'This is an info notification.',
      success: 'Changes saved successfully!',
      warning: 'Your session is about to expire.',
      destructive: 'Failed to delete the record.',
    };
    setToasts((prev) => [...prev, { id, variant, message: messages[variant] }]);
  };
  return (
    <Section title="Toast" desc="Notification messages with auto-dismiss and action support.">
      <div className="demo" style={{ marginBottom: 12 }}>
        <Button size="sm" variant="primary" onClick={() => addToast('info')}>Info Toast</Button>
        <Button size="sm" variant="secondary" onClick={() => addToast('success')}>Success Toast</Button>
        <Button size="sm" variant="secondary" onClick={() => addToast('warning')}>Warning Toast</Button>
        <Button size="sm" variant="destructive" onClick={() => addToast('destructive')}>Error Toast</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            message={t.message}
            onClose={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
          />
        ))}
      </div>
    </Section>
  );
}

function ToggleDemo() {
  const [on, setOn] = useState(false);
  return (
    <Section title="Toggle" desc="Toggle switch input.">
      <div className="demo-vertical">
        <Toggle label="Enable notifications" checked={on} onChange={() => setOn(!on)} />
        <Toggle label="Dark mode (disabled)" disabled />
      </div>
    </Section>
  );
}

function TooltipDemo() {
  return (
    <Section title="Tooltip" desc="Position-aware tooltip: top, bottom, left, right.">
      <div className="demo" style={{ gap: 24, padding: '16px 0' }}>
        <Tooltip content="Tooltip on top" position="top"><Button variant="secondary" size="sm">Top</Button></Tooltip>
        <Tooltip content="Tooltip on bottom" position="bottom"><Button variant="secondary" size="sm">Bottom</Button></Tooltip>
        <Tooltip content="Tooltip on left" position="left"><Button variant="secondary" size="sm">Left</Button></Tooltip>
        <Tooltip content="Tooltip on right" position="right"><Button variant="secondary" size="sm">Right</Button></Tooltip>
      </div>
    </Section>
  );
}

function AccordionDemo() {
  return (
    <Section title="Accordion" desc="Expandable item groups with single or multi-open modes.">
      <Accordion
        items={[
          { id: '1', title: 'What is Trusti?', content: 'Trusti is an insurance technology platform providing digital insurance products.' },
          { id: '2', title: 'How do I get started?', content: 'Install the design system package and import the components you need.' },
          { id: '3', title: 'Is it accessible?', content: 'Yes, all components meet WCAG AA standards with proper ARIA attributes and keyboard navigation.' },
          { id: '4', title: 'Disabled item', content: 'This should not open.', disabled: true },
        ]}
        allowMultiple
        defaultOpenIds={['1']}
      />
    </Section>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Section title="Drawer" desc="Side panel modal with left, right, or bottom positioning.">
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Drawer Title" position="right">
        <p style={{ fontSize: 14, color: 'var(--color-primary-600)' }}>
          This is the drawer content. It slides in from the side.
        </p>
        <div style={{ marginTop: 16 }}>
          <Button variant="primary" onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Drawer>
    </Section>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Section title="Modal" desc="Dialog with sm, md, lg, and fullscreen sizes. Focus management and overlay click handling.">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Example Modal"
        size="md"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        }
      >
        <p style={{ fontSize: 14, color: 'var(--color-primary-600)', margin: 0 }}>
          This is the modal body content. Click the overlay or buttons to close.
        </p>
      </Modal>
    </Section>
  );
}

function FAQDemo() {
  return (
    <Section title="FAQ" desc="Frequently asked questions section using Accordion under the hood.">
      <FAQ
        title="Frequently Asked Questions"
        items={[
          { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, bank transfers, and digital wallets.' },
          { question: 'Can I cancel my policy?', answer: 'Yes, you can cancel your policy at any time from your account dashboard.' },
          { question: 'How do I file a claim?', answer: 'Navigate to the Claims section in your dashboard and follow the step-by-step guide.' },
        ]}
      />
    </Section>
  );
}

function CarouselDemo() {
  const slides = [
    { bg: 'var(--color-accent-100)', label: 'Slide 1' },
    { bg: 'var(--color-success-100)', label: 'Slide 2' },
    { bg: 'var(--color-warning-100)', label: 'Slide 3' },
  ];
  return (
    <Section title="Carousel" desc="Image/content carousel with auto-play, dots, and arrows.">
      <div style={{ maxWidth: 600 }}>
        <Carousel showDots showArrows>
          {slides.map((s) => (
            <div
              key={s.label}
              style={{
                background: s.bg,
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 600,
                borderRadius: 'var(--radius-m)',
                color: 'var(--color-primary-700)',
              }}
            >
              {s.label}
            </div>
          ))}
        </Carousel>
      </div>
    </Section>
  );
}

function VehicleDetailsCardDemo() {
  return (
    <Section title="VehicleDetailsCard" desc="Vehicle display card with make, model, year, plate, and talon info.">
      <div style={{ maxWidth: 400 }}>
        <VehicleDetailsCard
          vehicle={{
            make: 'Toyota',
            model: 'Corolla',
            year: 2023,
            plate: 'CB 1234 AB',
            talonNumber: 'T-987654',
          }}
          showTalon
          verified
        />
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────── */

export function ComponentsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 8px 0' }}>Components</h1>
      <p style={{ fontSize: 16, color: 'var(--color-primary-600)', margin: '0 0 40px 0' }}>
        Live, interactive examples of all 26 design system components.
      </p>

      {/* Molecules */}
      <div className="section">
        <h2 className="section-title">Molecules</h2>
        <p className="section-desc">16 foundational UI building blocks.</p>
        <AlertDemo />
        <ButtonDemo />
        <CheckboxDemo />
        <ContextMenuDemo />
        <InputDemo />
        <LogoDemo />
        <PaginationDemo />
        <PillDemo />
        <ProgressBarDemo />
        <RadioDemo />
        <SliderDemo />
        <TabsDemo />
        <TagDemo />
        <ToastDemo />
        <ToggleDemo />
        <TooltipDemo />
      </div>

      {/* Organisms */}
      <div className="section">
        <h2 className="section-title">Organisms</h2>
        <p className="section-desc">4 composite components built from molecules.</p>
        <AccordionDemo />
        <DrawerDemo />
        <ModalDemo />
      </div>

      {/* Templates */}
      <div className="section">
        <h2 className="section-title">Templates</h2>
        <p className="section-desc">6 page-level patterns and layouts.</p>
        <FAQDemo />
        <CarouselDemo />
        <VehicleDetailsCardDemo />
      </div>
    </div>
  );
}
