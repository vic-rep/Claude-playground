import { useState } from 'react';
import {
  Navigation,
  Footer,
  FAQ,
  Button,
  Input,
  Pill,
  Carousel,
  Logo,
} from '@trusti/design-system';
import styles from './PropertyInsurance.module.css';

/* Figma: Property Insurance landing page
   File: LoFRsBK3jriBBr8XjfmVMV — node 4165:16196
*/

/* ── Navigation items ───────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'home', label: 'Начало', href: '#', active: true },
  { id: 'products', label: 'Продукти', href: '#' },
  { id: 'about', label: 'За нас', href: '#' },
  { id: 'contact', label: 'Контакти', href: '#' },
];

/* ── Coverage risk pills ────────────────────────────────── */
const RISK_ITEMS = [
  { icon: 'fa-solid fa-handshake', label: 'Гражданска отговорност' },
  { icon: 'fa-solid fa-house-crack', label: 'Земетресение' },
  { icon: 'fa-solid fa-lock', label: 'Кражба' },
  { icon: 'fa-solid fa-water', label: 'Наводнение' },
  { icon: 'fa-solid fa-fire', label: 'Пожар' },
  { icon: 'fa-solid fa-wind', label: 'Буря' },
  { icon: 'fa-solid fa-bolt', label: 'Мълния' },
  { icon: 'fa-solid fa-snowflake', label: 'Замръзване' },
];

/* ── Insurer partners ───────────────────────────────────── */
const PARTNERS = ['Армеец', 'Булстрад', 'ДЗИ', 'Лев Инс', 'Уника'];

/* ── Feature sections ───────────────────────────────────── */
const FEATURES = [
  {
    icon: 'fa-solid fa-clock',
    title: 'Под 2 минути',
    desc: 'Калкулацията ви е готова за по-малко от 2 минути. Без чакане, без обаждания — изцяло онлайн.',
  },
  {
    icon: 'fa-solid fa-shield-check',
    title: 'Защита над всичко имот',
    desc: 'Защитете в едно: стени, покрив, настилки, мебели, електроника и всичко ценно за вас.',
  },
  {
    icon: 'fa-solid fa-file-slash',
    title: 'Без документи',
    desc: 'Не е нужно да сканирате или изпращате документи. Попълвате само адрес и получавате оферта.',
  },
];

/* ── Steps ──────────────────────────────────────────────── */
const STEPS = [
  {
    num: 1,
    title: 'Информация за имота',
    desc: 'Въведете адреса и основна информация за вашия имот.',
    icon: 'fa-solid fa-location-dot',
  },
  {
    num: 2,
    title: 'Избор на покритие',
    desc: 'Изберете рисковете, които искате да покриете.',
    icon: 'fa-solid fa-list-check',
  },
  {
    num: 3,
    title: 'Получи полица',
    desc: 'Получете вашата полица онлайн веднага.',
    icon: 'fa-solid fa-file-circle-check',
  },
];

/* ── Other services (carousel) ──────────────────────────── */
const OTHER_SERVICES = [
  { icon: 'fa-solid fa-car', title: 'Автомобилно застраховане', desc: 'ГО, Каско и пътна помощ' },
  { icon: 'fa-solid fa-heart-pulse', title: 'Здравно застраховане', desc: 'Грижа за вашето здраве' },
  { icon: 'fa-solid fa-plane', title: 'Пътническо застраховане', desc: 'Пътувайте без притеснения' },
  { icon: 'fa-solid fa-briefcase', title: 'Бизнес застраховане', desc: 'Защита за вашия бизнес' },
];

/* ── FAQ Data ───────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    question: 'Какво покрива имущественото застраховане?',
    answer: 'Имущественото застраховане покрива щети от природни бедствия, пожар, наводнение, кражба, вандализъм и още 15 чести риска. Покритието може да бъде разширено с допълнителни клаузи.',
  },
  {
    question: 'Колко струва застраховката?',
    answer: 'Цената зависи от типа, стойността и местоположението на имота. С Trusti получавате персонализирана оферта за под 2 минути.',
  },
  {
    question: 'Как мога да сключа застраховка?',
    answer: 'Само в 3 лесни стъпки — въведете адрес, изберете покритие и получете полица онлайн.',
  },
  {
    question: 'Какви документи са необходими?',
    answer: 'Не са необходими документи. Попълвате само адреса и нашата система прави всичко останало.',
  },
  {
    question: 'Мога ли да застраховам наето жилище?',
    answer: 'Да, можете да застраховате както собствено, така и наето жилище. Покритието включва сграда и движимо имущество.',
  },
  {
    question: 'От какъв застраховател е полицата?',
    answer: 'Работим с водещи застрахователи в България — Армеец, Булстрад, ДЗИ, Лев Инс и Уника. Trusti AI брокер избира най-добрата оферта за вас.',
  },
];

/* ── Footer columns ─────────────────────────────────────── */
const FOOTER_COLUMNS = [
  {
    title: 'Продукти',
    links: [
      { label: 'Имуществено', href: '#' },
      { label: 'Автомобилно', href: '#' },
      { label: 'Здравно', href: '#' },
      { label: 'Пътуване', href: '#' },
    ],
  },
  {
    title: 'Помощен център',
    links: [
      { label: 'Често задавани въпроси', href: '#faq' },
      { label: 'Контакти', href: '#' },
      { label: 'Условия за ползване', href: '#' },
      { label: 'Поверителност', href: '#' },
    ],
  },
];

/* ── Trusti Logo ────────────────────────────────────────── */
function TrustiLogo({ color = 'white' }: { color?: string }) {
  return (
    <span className={styles.trustiLogo} style={{ color }}>
      <i className="fa-solid fa-shield-check" aria-hidden="true" />
      <span>trusti</span>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   Main Page Component
   ══════════════════════════════════════════════════════════ */
export function PropertyInsuranceApp() {
  const [address, setAddress] = useState('');

  return (
    <div className={styles.page}>
      {/* ── Navigation ───────────────────────────────────── */}
      <Navigation
        logo={<TrustiLogo />}
        items={NAV_ITEMS}
        actions={
          <Button variant="secondary" size="sm">
            Вход
          </Button>
        }
      />

      {/* ── Hero Section ─────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>
            Едно застраховане за всичките ти имоти
          </h1>
          <p className={styles.heroSubtitle}>
            Защити до 5 имота в една застраховка
          </p>

          {/* App store badges */}
          <div className={styles.storeBadges}>
            <Pill variant="default">
              <i className="fa-brands fa-apple" aria-hidden="true" /> App Store
            </Pill>
            <Pill variant="default">
              <i className="fa-brands fa-google-play" aria-hidden="true" /> Google Play
            </Pill>
          </div>

          {/* Address search */}
          <div className={styles.heroSearch}>
            <Input
              placeholder="Въведете адрес на имота"
              leftIcon={<i className="fa-solid fa-location-dot" aria-hidden="true" />}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-label="Адрес на имота"
            />
            <Button variant="primary" size="md">
              Търси
            </Button>
          </div>
        </div>
      </section>

      {/* ── Risk pills horizontal scroll ─────────────────── */}
      <section className={styles.riskSection}>
        <div className={styles.riskScroll}>
          {RISK_ITEMS.map((item, i) => (
            <div key={i} className={styles.riskCard}>
              <div className={styles.riskIcon}>
                <i className={item.icon} aria-hidden="true" />
              </div>
              <span className={styles.riskLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Hero image (man with phone) ──────────────────── */}
      <section className={styles.heroImageSection}>
        <div className={styles.container}>
          <div className={styles.imagePlaceholder}>
            <i className="fa-solid fa-user" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── "Защита при 15 чести риска" ──────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Защита при 15 чести риска</h2>
          <p className={styles.sectionDesc}>
            Нашата имуществена застраховка покрива пожар, кражба, земетресение, наводнение, буря, гражданска отговорност, ВиК аварии и още. Всичко в един пакет.
          </p>
        </div>
      </section>

      {/* ── "Какво решаваме с Феникс" + partner logos ────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Какво решаваме с Феникс</h2>
          <div className={styles.partnerLogos}>
            {PARTNERS.map((name) => (
              <Logo key={name} name={name} size="md" variant="grayscale" />
            ))}
          </div>
        </div>
      </section>

      {/* ── "Застраховката, която се грижи за живота ти" ─── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Застраховката, която се грижи за живота ти
          </h2>
        </div>
      </section>

      {/* ── Feature cards ────────────────────────────────── */}
      {FEATURES.map((feature, i) => (
        <section key={i} className={styles.featureSection}>
          <div className={styles.container}>
            {i === 1 && (
              <div className={styles.imagePlaceholder}>
                <i className="fa-solid fa-building" aria-hidden="true" />
              </div>
            )}
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className={feature.icon} aria-hidden="true" />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </div>
          </div>
        </section>
      ))}

      {/* ── "Само 3 стъпки до вашата застраховка" ────────── */}
      <section className={styles.stepsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleCenter}>
            Само 3 стъпки до вашата застраховка
          </h2>
          <div className={styles.stepsGrid}>
            {STEPS.map((step) => (
              <div key={step.num} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.num}</div>
                <div className={styles.stepIcon}>
                  <i className={step.icon} aria-hidden="true" />
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Inline search CTA */}
          <div className={styles.stepsCta}>
            <Input
              placeholder="Въведете адрес"
              leftIcon={<i className="fa-solid fa-location-dot" aria-hidden="true" />}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button variant="primary" fullWidth>
              Изчисли цена
            </Button>
          </div>
        </div>
      </section>

      {/* ── "Разгледай и другите ни услуги" carousel ─────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Разгледай и другите ни услуги</h2>
          <Carousel showArrows={false} showDots autoPlay={false}>
            {OTHER_SERVICES.map((svc, i) => (
              <div key={i} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <i className={svc.icon} aria-hidden="true" />
                </div>
                <h3 className={styles.serviceTitle}>{svc.title}</h3>
                <p className={styles.serviceDesc}>{svc.desc}</p>
                <Button variant="ghost" size="sm" trailingIcon={<i className="fa-solid fa-arrow-right" aria-hidden="true" />}>
                  Научи повече
                </Button>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* ── "Застрахователни търсения" ───────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Застрахователни търсения</h2>
          <div className={styles.searchTags}>
            {['Имуществена застраховка', 'Застраховка жилище', 'Застраховка апартамент', 'Застраховка къща', 'Застраховка офис'].map((tag, i) => (
              <Pill key={i} variant="default">{tag}</Pill>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className={styles.faqSection} id="faq">
        <div className={styles.container}>
          <FAQ
            title="Имате въпроси? Ние имаме отговора."
            items={FAQ_ITEMS}
          />
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer
        logo={<TrustiLogo color="white" />}
        columns={FOOTER_COLUMNS}
        bottomText="© 2026 Trusti. Всички права запазени."
        socialLinks={[
          { icon: <i className="fa-brands fa-facebook" />, href: '#', label: 'Facebook' },
          { icon: <i className="fa-brands fa-instagram" />, href: '#', label: 'Instagram' },
          { icon: <i className="fa-brands fa-linkedin" />, href: '#', label: 'LinkedIn' },
        ]}
      />
    </div>
  );
}
