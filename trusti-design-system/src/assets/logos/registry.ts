/**
 * Logo Registry — Trusti Design System
 * Figma: ❖ Logos — node 4449:14615
 *
 * Each logo has a color and grayscale SVG variant. To replace a placeholder
 * with a real logo, export the SVG from Figma (select component → right-click
 * → Copy/Paste as → Copy as SVG) and paste the SVG markup into the
 * corresponding entry below.
 */
import type { LogoEntry, LogoCategory } from './types';

/* ── Helper: text-based SVG placeholder ─────────────────────── */
const textSvg = (text: string, color: string, gray: string): Pick<LogoEntry, 'colorSvg' | 'grayscaleSvg'> => ({
  colorSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Source Sans 3,sans-serif" font-size="14" font-weight="600" fill="${color}">${text}</text></svg>`,
  grayscaleSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Source Sans 3,sans-serif" font-size="14" font-weight="600" fill="${gray}">${text}</text></svg>`,
});

/* ══════════════════════════════════════════════════════════════
   Company Logos — Figma node 2336:2840
   ══════════════════════════════════════════════════════════════ */

const companyLogos: LogoEntry[] = [
  { name: 'CashCredit', category: 'company', ...textSvg('CashCredit', '#E31E24', '#999') },
  { name: 'SmileCredit', category: 'company', ...textSvg('SmileCredit', '#00A859', '#999') },
  { name: 'Credissimo', category: 'company', ...textSvg('Credissimo', '#0066CC', '#999') },
  { name: 'Generali', category: 'company', ...textSvg('Generali', '#C8102E', '#999') },
  { name: 'VivaCredit', category: 'company', ...textSvg('VivaCredit', '#FF6600', '#999') },
  { name: 'Bulstrad', category: 'company', ...textSvg('Bulstrad', '#003DA5', '#999') },
  { name: 'AssetInsurance', category: 'company', ...textSvg('Asset Insurance', '#1B365D', '#999') },
  { name: 'Alianz', category: 'company', ...textSvg('Alianz', '#003781', '#999') },
  { name: 'LevIns', category: 'company', ...textSvg('Lev Ins', '#C41230', '#999') },
  { name: 'BulIns', category: 'company', ...textSvg('Bul Ins', '#0055A4', '#999') },
  { name: 'UNIQA', category: 'company', ...textSvg('UNIQA', '#6B1F7C', '#999') },
  { name: 'Euroins', category: 'company', ...textSvg('Euroins', '#004B87', '#999') },
  { name: 'Instinct', category: 'company', ...textSvg('Instinct', '#FF8C00', '#999') },
  { name: 'OZK', category: 'company', ...textSvg('OZK', '#1A5632', '#999') },
  { name: 'DZI', category: 'company', ...textSvg('DZI', '#003DA5', '#999') },
  { name: 'MoneyShop', category: 'company', ...textSvg('MoneyShop', '#F76803', '#999') },
];

/* ══════════════════════════════════════════════════════════════
   Delivery Logos — Figma node 2415:1863
   ══════════════════════════════════════════════════════════════ */

const deliveryLogos: LogoEntry[] = [
  { name: 'Speedy', category: 'delivery', ...textSvg('Speedy', '#6D2077', '#999') },
  { name: 'BoxNow', category: 'delivery', ...textSvg('BoxNow', '#44D62C', '#999') },
  { name: 'Ekont', category: 'delivery', ...textSvg('Ekont', '#E21E26', '#999') },
];

/* ══════════════════════════════════════════════════════════════
   Payment Logos — Figma node 4214:850
   ══════════════════════════════════════════════════════════════ */

const paymentLogos: LogoEntry[] = [
  {
    name: 'Mastercard',
    category: 'payment',
    colorSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 24"><circle cx="15" cy="12" r="10" fill="#EB001B"/><circle cx="25" cy="12" r="10" fill="#F79E1B"/><path d="M20 4.58a10 10 0 0 1 0 14.84 10 10 0 0 1 0-14.84z" fill="#FF5F00"/></svg>`,
    grayscaleSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 24"><circle cx="15" cy="12" r="10" fill="#999"/><circle cx="25" cy="12" r="10" fill="#CCC"/><path d="M20 4.58a10 10 0 0 1 0 14.84 10 10 0 0 1 0-14.84z" fill="#AAA"/></svg>`,
  },
  {
    name: 'Visa',
    category: 'payment',
    colorSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 24"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Source Sans 3,sans-serif" font-size="18" font-weight="700" font-style="italic" fill="#1A1F71">VISA</text></svg>`,
    grayscaleSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 24"><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Source Sans 3,sans-serif" font-size="18" font-weight="700" font-style="italic" fill="#999">VISA</text></svg>`,
  },
  { name: 'Newpay', category: 'payment', ...textSvg('newpay', '#6D2077', '#999') },
  { name: 'ePay', category: 'payment', ...textSvg('ePay', '#003DA5', '#999') },
  { name: 'gPay', category: 'payment', ...textSvg('G Pay', '#4285F4', '#999') },
];

/* ══════════════════════════════════════════════════════════════
   Car Logos — Figma node 2338:38218
   ══════════════════════════════════════════════════════════════ */

const carLogos: LogoEntry[] = [
  { name: 'BMW', category: 'car', ...textSvg('BMW', '#0066B1', '#999') },
  { name: 'Mercedes', category: 'car', ...textSvg('Mercedes', '#333', '#999') },
  { name: 'Toyota', category: 'car', ...textSvg('Toyota', '#EB0A1E', '#999') },
  { name: 'Volkswagen', category: 'car', ...textSvg('VW', '#001E50', '#999') },
  { name: 'Audi', category: 'car', ...textSvg('Audi', '#333', '#999') },
  { name: 'Ford', category: 'car', ...textSvg('Ford', '#003399', '#999') },
  { name: 'Honda', category: 'car', ...textSvg('Honda', '#CC0000', '#999') },
  { name: 'Hyundai', category: 'car', ...textSvg('Hyundai', '#002C5F', '#999') },
  { name: 'Kia', category: 'car', ...textSvg('Kia', '#05141F', '#999') },
  { name: 'Nissan', category: 'car', ...textSvg('Nissan', '#C3002F', '#999') },
  { name: 'Mazda', category: 'car', ...textSvg('Mazda', '#910428', '#999') },
  { name: 'Volvo', category: 'car', ...textSvg('Volvo', '#003057', '#999') },
  { name: 'Renault', category: 'car', ...textSvg('Renault', '#FFCC00', '#999') },
  { name: 'Peugeot', category: 'car', ...textSvg('Peugeot', '#003DA5', '#999') },
  { name: 'Citroen', category: 'car', ...textSvg('Citroën', '#AC0000', '#999') },
  { name: 'Skoda', category: 'car', ...textSvg('Škoda', '#4BA82E', '#999') },
  { name: 'Opel', category: 'car', ...textSvg('Opel', '#F7FF14', '#999') },
  { name: 'Fiat', category: 'car', ...textSvg('Fiat', '#960014', '#999') },
  { name: 'Seat', category: 'car', ...textSvg('Seat', '#32363A', '#999') },
  { name: 'Suzuki', category: 'car', ...textSvg('Suzuki', '#E30613', '#999') },
  { name: 'Mitsubishi', category: 'car', ...textSvg('Mitsubishi', '#E60012', '#999') },
  { name: 'Lexus', category: 'car', ...textSvg('Lexus', '#333', '#999') },
  { name: 'Infinity', category: 'car', ...textSvg('Infiniti', '#333', '#999') },
  { name: 'Tesla', category: 'car', ...textSvg('Tesla', '#CC0000', '#999') },
  { name: 'Porsche', category: 'car', ...textSvg('Porsche', '#333', '#999') },
  { name: 'Ferrari', category: 'car', ...textSvg('Ferrari', '#D40000', '#999') },
  { name: 'Lamborghini', category: 'car', ...textSvg('Lamborghini', '#DDB321', '#999') },
  { name: 'Maserati', category: 'car', ...textSvg('Maserati', '#003082', '#999') },
  { name: 'Bentley', category: 'car', ...textSvg('Bentley', '#333', '#999') },
  { name: 'RollsRoyce', category: 'car', ...textSvg('Rolls-Royce', '#680021', '#999') },
  { name: 'AstonMartin', category: 'car', ...textSvg('Aston Martin', '#005C2E', '#999') },
  { name: 'Bugatti', category: 'car', ...textSvg('Bugatti', '#BE0030', '#999') },
  { name: 'Cadillac', category: 'car', ...textSvg('Cadillac', '#88754E', '#999') },
  { name: 'Chrysler', category: 'car', ...textSvg('Chrysler', '#003D7C', '#999') },
  { name: 'Corvette', category: 'car', ...textSvg('Corvette', '#C41E3A', '#999') },
  { name: 'Dodge', category: 'car', ...textSvg('Dodge', '#333', '#999') },
  { name: 'Lincoln', category: 'car', ...textSvg('Lincoln', '#333', '#999') },
  { name: 'Lotus', category: 'car', ...textSvg('Lotus', '#2A3244', '#999') },
  { name: 'Maybach', category: 'car', ...textSvg('Maybach', '#333', '#999') },
  { name: 'AlfaRomeo', category: 'car', ...textSvg('Alfa Romeo', '#981E32', '#999') },
  { name: 'Geely', category: 'car', ...textSvg('Geely', '#003DA5', '#999') },
  { name: 'Scania', category: 'car', ...textSvg('Scania', '#041E42', '#999') },
  { name: 'Lada', category: 'car', ...textSvg('Lada', '#003DA5', '#999') },
  { name: 'VAZ', category: 'car', ...textSvg('VAZ', '#003DA5', '#999') },
  { name: 'ZAZ', category: 'car', ...textSvg('ZAZ', '#003DA5', '#999') },
  { name: 'MG', category: 'car', ...textSvg('MG', '#8B0000', '#999') },
  { name: 'GTR', category: 'car', ...textSvg('GTR', '#333', '#999') },
  { name: 'DAF', category: 'car', ...textSvg('DAF', '#003DA5', '#999') },
  { name: 'Kenworth', category: 'car', ...textSvg('Kenworth', '#333', '#999') },
  { name: 'Kamaz', category: 'car', ...textSvg('KAMAZ', '#003DA5', '#999') },
  { name: 'MAZ', category: 'car', ...textSvg('MAZ', '#333', '#999') },
  { name: 'IMSA', category: 'car', ...textSvg('IMSA', '#003DA5', '#999') },
];

/* ══════════════════════════════════════════════════════════════
   Partnership Logos — Figma node 4288:3614
   ══════════════════════════════════════════════════════════════ */

const partnershipLogos: LogoEntry[] = [
  { name: 'Diana', category: 'partnership', ...textSvg('Diana', '#003DA5', '#999') },
  { name: 'CarVertical', category: 'partnership', ...textSvg('carVertical', '#1A1A1A', '#999') },
  { name: 'GTP', category: 'partnership', ...textSvg('GTP', '#333', '#999') },
  { name: 'NaStarta', category: 'partnership', ...textSvg('NaStarta', '#F76803', '#999') },
  { name: 'BrillianceAuto', category: 'partnership', ...textSvg('Brilliance Auto', '#003DA5', '#999') },
  { name: 'AutoCheckGTP', category: 'partnership', ...textSvg('AutoCheck GTP', '#003DA5', '#999') },
];

/* ══════════════════════════════════════════════════════════════
   Combined Registry
   ══════════════════════════════════════════════════════════════ */

export const logoRegistry: Record<string, LogoEntry> = {};

const allLogos = [
  ...companyLogos,
  ...deliveryLogos,
  ...paymentLogos,
  ...carLogos,
  ...partnershipLogos,
];

for (const logo of allLogos) {
  logoRegistry[logo.name] = logo;
}

/** Get all logos for a given category */
export const getLogosByCategory = (category: LogoCategory): LogoEntry[] =>
  allLogos.filter((l) => l.category === category);

/** Get all available logo names */
export const getAllLogoNames = (): string[] => allLogos.map((l) => l.name);

/** Get all category names */
export const getLogoCategories = (): LogoCategory[] => [
  'company',
  'delivery',
  'payment',
  'car',
  'partnership',
];
