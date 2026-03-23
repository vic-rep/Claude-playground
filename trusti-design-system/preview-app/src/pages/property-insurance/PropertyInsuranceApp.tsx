import { useState } from 'react';
import styles from './PropertyInsurance.module.css';

/* Figma: Property Insurance landing page
   File: LoFRsBK3jriBBr8XjfmVMV — node 4165:16196
*/

/* ── FAQ Data ─────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: 'Какво покрива имущественото застраховане?',
    a: 'Имущественото застраховане покрива щети от природни бедствия, пожар, наводнение, кражба, вандализъм и много други рискове. Покритието може да бъде разширено с допълнителни клаузи според вашите нужди.',
  },
  {
    q: 'Колко струва застраховката?',
    a: 'Цената зависи от типа на имота, неговата стойност, местоположение и избраните покрития. С Trusti можете да получите персонализирана оферта за секунди.',
  },
  {
    q: 'Как мога да сключа застраховка?',
    a: 'Само в 3 лесни стъпки — въведете адреса на имота, изберете покритие и получете вашата полица онлайн. Целият процес отнема по-малко от 5 минути.',
  },
  {
    q: 'Какви документи са необходими?',
    a: 'Необходим е само документ за собственост или договор за наем. Всичко останало се попълва автоматично чрез нашата система.',
  },
  {
    q: 'Мога ли да застраховам наето жилище?',
    a: 'Да, можете да застраховате както собствено, така и наето жилище. Покритието може да включва както сградата, така и движимото имущество в нея.',
  },
];

/* ── Coverage items ──────────────────────────────────────── */
const COVERAGE_ITEMS = [
  { icon: 'fa-solid fa-fire', label: 'Пожар', desc: 'Защита от пожар и последствията от него' },
  { icon: 'fa-solid fa-water', label: 'Наводнение', desc: 'Покритие при наводнение и водни щети' },
  { icon: 'fa-solid fa-wind', label: 'Буря', desc: 'Защита от буря, градушка и силен вятър' },
  { icon: 'fa-solid fa-house-crack', label: 'Земетресение', desc: 'Покритие при земетресение' },
  { icon: 'fa-solid fa-lock', label: 'Кражба', desc: 'Защита от кражба и вандализъм' },
  { icon: 'fa-solid fa-pipe-section', label: 'ВиК аварии', desc: 'Покритие на ВиК инсталации' },
];

/* ── Steps ───────────────────────────────────────────────── */
const STEPS = [
  {
    num: 1,
    title: 'Въведете адреса',
    desc: 'Напишете адреса на имота, който искате да застраховате. Нашата система автоматично ще намери детайлите.',
  },
  {
    num: 2,
    title: 'Изберете покритие',
    desc: 'Персонализирайте застраховката си, като изберете покритията, които са важни за вас.',
  },
  {
    num: 3,
    title: 'Получете полица',
    desc: 'Завършете процеса и получете вашата полица онлайн — бързо, лесно и сигурно.',
  },
];

/* ── FAQ Accordion Item ──────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.faqItem}>
      <button
        className={styles.faqQuestion}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        type="button"
      >
        <span>{q}</span>
        <i
          className={`fa-solid fa-chevron-down ${styles.faqChevron}`}
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        />
      </button>
      {open && <div className={styles.faqAnswer}>{a}</div>}
    </div>
  );
}

/* ── Main Page Component ─────────────────────────────────── */
export function PropertyInsuranceApp() {
  const [address, setAddress] = useState('');

  return (
    <div className={styles.page}>
      {/* ── Hero Section ───────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLogo}>
            <i className="fa-solid fa-shield-check" aria-hidden="true" />
            <span>Trusti</span>
          </div>
          <h1 className={styles.heroTitle}>
            Едно застраховане за цялото ви имение
          </h1>
          <p className={styles.heroSubtitle}>
            Защитете дома си с най-доброто имуществено застраховане. Бързо, лесно и изгодно — онлайн.
          </p>
          <div className={styles.heroSearch}>
            <div className={styles.heroInputWrap}>
              <i className="fa-solid fa-location-dot" aria-hidden="true" style={{ color: 'var(--color-primary-500)' }} />
              <input
                type="text"
                className={styles.heroInput}
                placeholder="Въведете адрес на имота"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                aria-label="Property address"
              />
            </div>
            <button className={styles.heroBtn} type="button">
              Търси
            </button>
          </div>
        </div>
      </section>

      {/* ── App Preview Section ────────────────────────────── */}
      <section className={styles.previewSection}>
        <div className={styles.container}>
          <div className={styles.previewGrid}>
            <div className={styles.phoneMockup}>
              <div className={styles.phoneMockupInner}>
                <div className={styles.phoneMockupScreen}>
                  <div className={styles.phoneMockupHeader}>
                    <i className="fa-solid fa-shield-check" style={{ color: 'var(--interactive-primary)', fontSize: 20 }} aria-hidden="true" />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Trusti</span>
                  </div>
                  <div className={styles.phoneMockupBody}>
                    <div className={styles.phoneMockupCard} />
                    <div className={styles.phoneMockupCard} style={{ height: 40 }} />
                    <div className={styles.phoneMockupCard} style={{ height: 60 }} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.previewText}>
              <h2 className={styles.sectionTitle}>
                Вашият имот заслужава най-доброто
              </h2>
              <p className={styles.sectionDesc}>
                С Trusti получавате персонализирана имуществена застраховка, адаптирана специално за вашия дом. Нашият AI брокер анализира имота ви и предлага оптимално покритие на най-добра цена.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Coverage Section ───────────────────────────────── */}
      <section className={styles.coverageSection}>
        <div className={styles.container}>
          <div className={styles.coverageHeader}>
            <span className={styles.coverageTag}>Какво покрива?</span>
            <h2 className={styles.sectionTitle}>Жилище</h2>
            <p className={styles.sectionDesc}>
              Застраховката покрива широк набор от рискове, за да сте спокойни за дома си.
            </p>
          </div>
          <div className={styles.coverageGrid}>
            {COVERAGE_ITEMS.map((item, i) => (
              <div key={i} className={styles.coverageCard}>
                <div className={styles.coverageIcon}>
                  <i className={item.icon} aria-hidden="true" />
                </div>
                <h3 className={styles.coverageLabel}>{item.label}</h3>
                <p className={styles.coverageDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Peace of Mind Section ──────────────────────────── */}
      <section className={styles.peaceSection}>
        <div className={styles.container}>
          <div className={styles.peaceGrid}>
            <div className={styles.peaceImage}>
              <div className={styles.peaceImagePlaceholder}>
                <i className="fa-solid fa-building" aria-hidden="true" />
              </div>
            </div>
            <div className={styles.peaceText}>
              <h2 className={styles.sectionTitle}>
                Застраховката, която ви дава покой и спокойствие
              </h2>
              <p className={styles.sectionDesc}>
                Не се притеснявайте за неочаквани събития. С имуществената застраховка от Trusti вашият дом е защитен 24/7, а при нужда — получавате бързо обезщетение без излишна бюрокрация.
              </p>
              <button className={styles.ctaBtn} type="button">
                Научете повече
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Steps Section ──────────────────────────────────── */}
      <section className={styles.stepsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleCenter}>
            Само 3 стъпки до вашата застраховка
          </h2>
          <div className={styles.stepsGrid}>
            {STEPS.map((step) => (
              <div key={step.num} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.num}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two Clicks Section ─────────────────────────────── */}
      <section className={styles.twoClicksSection}>
        <div className={styles.container}>
          <div className={styles.previewGrid}>
            <div className={styles.twoClicksText}>
              <h2 className={styles.sectionTitle}>Разбери ме в два клика</h2>
              <p className={styles.sectionDesc}>
                Нашият интелигентен интерфейс ви позволява да разберете всичко за вашата застраховка с минимум усилия. Без сложни формуляри, без чакане — само яснота.
              </p>
              <button className={styles.ctaBtn} type="button">
                Започнете сега
              </button>
            </div>
            <div className={styles.phoneMockup}>
              <div className={styles.phoneMockupInner}>
                <div className={styles.phoneMockupScreen}>
                  <div className={styles.phoneMockupHeader}>
                    <i className="fa-solid fa-shield-check" style={{ color: 'var(--interactive-primary)', fontSize: 20 }} aria-hidden="true" />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Trusti</span>
                  </div>
                  <div className={styles.phoneMockupBody}>
                    <div className={styles.phoneMockupCard} style={{ height: 48 }} />
                    <div className={styles.phoneMockupCard} style={{ height: 80 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ────────────────────────────────────── */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleCenter}>Имате въпроси?</h2>
          <p className={styles.faqSubtitle}>
            Намерете отговори на най-често задаваните въпроси за имущественото застраховане.
          </p>
          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section className={styles.ctaBanner}>
        <div className={styles.container}>
          <h2 className={styles.ctaBannerTitle}>Защитете имота си още днес!</h2>
          <p className={styles.ctaBannerDesc}>
            Започнете с безплатна оценка и получете оферта за минути.
          </p>
          <button className={styles.ctaBannerBtn} type="button">
            Започнете безплатно
          </button>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <i className="fa-solid fa-shield-check" aria-hidden="true" />
                <span>Trusti</span>
              </div>
              <p className={styles.footerTagline}>
                Вашият AI застрахователен брокер
              </p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Продукти</h4>
                <a href="#" className={styles.footerLink}>Имуществено</a>
                <a href="#" className={styles.footerLink}>Автомобилно</a>
                <a href="#" className={styles.footerLink}>Здравно</a>
                <a href="#" className={styles.footerLink}>Пътуване</a>
              </div>
              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Компания</h4>
                <a href="#" className={styles.footerLink}>За нас</a>
                <a href="#" className={styles.footerLink}>Контакти</a>
                <a href="#" className={styles.footerLink}>Кариери</a>
                <a href="#" className={styles.footerLink}>Блог</a>
              </div>
              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Правна информация</h4>
                <a href="#" className={styles.footerLink}>Условия за ползване</a>
                <a href="#" className={styles.footerLink}>Поверителност</a>
                <a href="#" className={styles.footerLink}>Бисквитки</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2026 Trusti. Всички права запазени.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
