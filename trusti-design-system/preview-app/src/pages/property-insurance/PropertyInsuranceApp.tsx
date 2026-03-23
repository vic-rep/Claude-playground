import { useState } from 'react';
import {
  Navigation,
  FAQ,
  Button,
  Input,
  Pill,
  Carousel,
} from '@trusti/design-system';
import styles from './PropertyInsurance.module.css';

/* Figma: Property Insurance landing page
   File: LoFRsBK3jriBBr8XjfmVMV — node 4165:14186
   Design context extracted from child nodes:
   - 4165:14188 (Navigation), 4165:14189 (Hero + Pricing),
   - 4165:14262 (Coverage), 4165:14328 (Fenix),
   - 4165:14184 (Footer), 4165:14185 (TabBar — skipped for web)
*/

/* ── Pricing plans ─────────────────────────────────────────── */
const PRICING_PLANS = [
  {
    name: 'Базов',
    priceEur: '100',
    priceBgn: '59',
    limitEur: '30 000',
    limitBgn: '59 000',
    desc: 'Подходящ за малки апартаменти и по-скромни имоти',
  },
  {
    name: 'Стандартен',
    priceEur: '100',
    priceBgn: '59',
    limitEur: '60 000',
    limitBgn: '117 000',
    desc: 'Подходящ за по - големи апартаменти и семейни жилища',
  },
  {
    name: 'Премиум',
    priceEur: '100',
    priceBgn: '59',
    limitEur: '100 000',
    limitBgn: '196 000',
    desc: 'Подходящ за къщи, вили и имоти с по-висока стойност',
  },
];

/* ── Coverage risks ────────────────────────────────────────── */
const COVERAGE_RISKS = [
  { icon: 'fa-solid fa-explosion', label: 'Експлозия' },
  { icon: 'fa-solid fa-house-crack', label: 'Земетресение' },
  { icon: 'fa-solid fa-droplet', label: 'Наводнение' },
  { icon: 'fa-solid fa-fire', label: 'Пожар' },
  { icon: 'fa-solid fa-bolt', label: 'Мълния' },
  { icon: 'fa-solid fa-galaxy', label: 'Имплозия' },
];

/* ── Feature sections ───────────────────────────────────────── */
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

/* ── Steps ──────────────────────────────────────────────────── */
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

/* ── Other services (carousel) ──────────────────────────────── */
const OTHER_SERVICES = [
  { icon: 'fa-solid fa-car', title: 'Автомобилно застраховане', desc: 'ГО, Каско и пътна помощ' },
  { icon: 'fa-solid fa-heart-pulse', title: 'Здравно застраховане', desc: 'Грижа за вашето здраве' },
  { icon: 'fa-solid fa-plane', title: 'Пътническо застраховане', desc: 'Пътувайте без притеснения' },
  { icon: 'fa-solid fa-briefcase', title: 'Бизнес застраховане', desc: 'Защита за вашия бизнес' },
];

/* ── FAQ Data ───────────────────────────────────────────────── */
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
    answer: 'Работим с водещи застрахователи в България. Trusti AI брокер избира най-добрата оферта за вас.',
  },
];

/* ── Footer links ───────────────────────────────────────────── */
const FOOTER_PRODUCT_LINKS = [
  'Гражданска отговорност',
  'Каско',
  'За дома',
  'Пътна застраховка',
  'Пътна застраховка',
  'Домашен интернет и ТВ',
  'Мобилни планове',
  'Заеми',
];

const FOOTER_SECONDARY_LINKS = [
  'За нас',
  'FAQ',
  'Рецензии',
  'Статии',
  'Политика за поверителност',
  'Условия за ползване',
  'Свържете се с нас',
];

/* ── Trusti Logo ────────────────────────────────────────────── */
function TrustiLogo({ color = 'white', size = 18 }: { color?: string; size?: number }) {
  return (
    <span className={styles.trustiLogo} style={{ color, fontSize: size }}>
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
        logo={<TrustiLogo color="#191919" />}
        items={[]}
        actions={
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 10 }}>
            <i className="fa-regular fa-user" style={{ fontSize: 16, color: '#191919' }} aria-hidden="true" />
          </button>
        }
      />

      {/* ── Hero Section — Dark with pricing cards ─────── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            {/* Text block */}
            <div className={styles.heroText}>
              <p className={styles.heroSubtitle}>Недвижимо имущество</p>
              <h1 className={styles.heroTitle}>
                Една застраховка за всичките ти имоти
              </h1>
              <p className={styles.heroDesc}>
                Защити своя дом в рамките на две минути
              </p>
            </div>

            {/* Google reviews */}
            <div className={styles.googleReviews}>
              <span style={{ fontSize: 24, marginRight: 4 }}>G</span>
              <strong>4.9</strong>
              <i className={`fa-solid fa-star ${styles.googleStar}`} aria-hidden="true" />
              <span>on Google reviews</span>
            </div>

            {/* Pricing cards */}
            <div className={styles.pricingCards}>
              {PRICING_PLANS.map((plan) => (
                <div key={plan.name} className={styles.pricingCard}>
                  <div className={styles.pricingCardHeader}>
                    <h3 className={styles.pricingCardName}>{plan.name}</h3>
                    <div className={styles.pricingCardPrices}>
                      <span className={styles.pricingCardPrice}>
                        {plan.priceEur} <span className="currency">€</span>
                      </span>
                      <div className={styles.pricingCardDivider} />
                      <span className={styles.pricingCardPrice}>
                        {plan.priceBgn} <span className="currency">лв</span>
                      </span>
                    </div>
                    <i className={`fa-regular fa-chevron-right ${styles.pricingCardChevron}`} aria-hidden="true" />
                  </div>
                  <div className={styles.pricingCardBody}>
                    <p className={styles.pricingCardLimit}>
                      <span className="label">Щети до </span>
                      <span className="value">{plan.limitEur} € | {plan.limitBgn} лв.</span>
                    </p>
                    <p className={styles.pricingCardDesc}>{plan.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner logos: Fenix × Trusti */}
            <div className={styles.partnerLogos}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'white', letterSpacing: 1 }}>
                Fenix
              </span>
              <i className="fa-regular fa-xmark" style={{ fontSize: 21, color: '#ccc' }} aria-hidden="true" />
              <TrustiLogo color="white" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Coverage section — Risk grid ────────────────── */}
      <section className={styles.coverageSection}>
        <div className={styles.container}>
          <div className={styles.coverageSectionInner}>
            <div className={styles.coverageHeader}>
              <h2>Защита при 15 чести риска</h2>
              <p>
                Ако домът ти пострада от някоя от тези щети, ще имаш покритие за възстановяването му.
              </p>
            </div>

            <div className={styles.coverageCard}>
              <h3 className={styles.coverageCardTitle}>Покрития</h3>
              <div className={styles.coverageGrid}>
                {COVERAGE_RISKS.map((risk) => (
                  <div key={risk.label} className={styles.coverageItem}>
                    <i className={risk.icon} aria-hidden="true" />
                    <span>{risk.label}</span>
                  </div>
                ))}
              </div>
              <button className={styles.coverageShowAll}>
                <span>Покажи всички</span>
                <i className="fa-regular fa-plus" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fenix section — Phone mockup ───────────────── */}
      <section className={styles.fenixSection}>
        <h2>Какво решаваме с Феникс</h2>
        <div className={styles.fenixContent}>
          <div className={styles.fenixLogos}>
            <TrustiLogo color="#191919" />
            <i className="fa-regular fa-xmark" style={{ fontSize: 21, color: '#4d4d4d' }} aria-hidden="true" />
            <span style={{ fontSize: 18, fontWeight: 700, color: '#191919', fontFamily: 'var(--font-family-primary)' }}>
              Fenix
            </span>
          </div>
          <p className={styles.fenixDesc}>
            С Феникс решихме два големи проблема — сложната покупка и нуждата от отделна полица за всеки имот.
          </p>
        </div>

        {/* Phone mockup placeholder */}
        <div style={{ position: 'relative', width: '100%' }}>
          <div className={styles.phoneMockup}>
            <i className="fa-solid fa-mobile-screen" aria-hidden="true" />
          </div>

          {/* Floating stat cards */}
          <div className={styles.floatingStatCard} style={{ position: 'absolute', left: 12, top: '30%' }}>
            <div className={styles.floatingStatIcon}>
              <i className="fa-solid fa-box-check" aria-hidden="true" />
            </div>
            <div className={styles.floatingStatText}>
              <strong>0</strong>
              <span>Нужни документа</span>
            </div>
          </div>

          <div className={styles.floatingStatCard} style={{ position: 'absolute', right: 12, bottom: '10%' }}>
            <div className={styles.floatingStatIcon}>
              <i className="fa-solid fa-buildings" aria-hidden="true" />
            </div>
            <div className={styles.floatingStatText}>
              <strong>1</strong>
              <span>Собственик, няколко имота</span>
            </div>
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

      {/* ── Custom Footer (Figma: 4165:14184) ──────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            {/* Product links */}
            <div className={styles.footerLinks}>
              {FOOTER_PRODUCT_LINKS.map((link, i) => (
                <a key={i} href="#">{link}</a>
              ))}
            </div>

            {/* Secondary links */}
            <div className={styles.footerLinksSecondary}>
              {FOOTER_SECONDARY_LINKS.map((link, i) => (
                <a key={i} href="#">{link}</a>
              ))}
            </div>

            {/* Payment methods */}
            <div className={styles.paymentSection}>
              <h3>Плати лесно и сигурно с</h3>
              <div className={styles.paymentMethods}>
                <span>VISA</span>
                <span>Mastercard</span>
                <span>G Pay</span>
                <span>ePay</span>
                <span>newpay</span>
              </div>
            </div>

            <div className={styles.footerDivider} />

            {/* Newsletter */}
            <div className={styles.newsletterSection}>
              <h3>Запишете се за нашият бюлетин</h3>
              <div className={styles.newsletterForm}>
                <div className={styles.newsletterInput}>
                  <label>Email</label>
                  <input type="email" placeholder="handle@domain.com" />
                </div>
                <button className={styles.newsletterSubscribe}>
                  <i className="fa-regular fa-envelope" aria-hidden="true" />
                  Абонирай се
                </button>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.footerDivider} />

            {/* About + Logo */}
            <div className={styles.footerAbout}>
              <div className={styles.footerLogo}>
                <i className="fa-solid fa-shield-check" aria-hidden="true" />
                <span>trusti</span>
              </div>
              <p className={styles.footerCopyright}>
                © 2023 Trusti. Тръсти ЕООД е застрахователен брокер, регистриран и одобрен от КФН с удостоверение № 734-3Б от 02.02.2021 г.
                <br />
                Всички права запазени
              </p>
            </div>

            {/* Social icons */}
            <div className={styles.socialIcons}>
              <a href="#" className={`${styles.socialIcon} ${styles.active}`} aria-label="Facebook">
                <i className="fa-brands fa-facebook-f" aria-hidden="true" />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <i className="fa-brands fa-x-twitter" aria-hidden="true" />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="YouTube">
                <i className="fa-brands fa-youtube" aria-hidden="true" />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
              </a>
            </div>

            {/* Help center card */}
            <div className={styles.helpCenterCard}>
              <div className={styles.helpCenterHeader}>
                <div className="text">
                  <h4>Помощен център</h4>
                  <span>24/7</span>
                </div>
                <i className="fa-regular fa-message-question" style={{ fontSize: 32, color: 'white' }} aria-hidden="true" />
              </div>
              <p className={styles.helpCenterDesc}>
                Моля, свържете се, ако имате нужда от индивидуална помощ, за да започнете с нови продукти или имате други въпроси.
              </p>
              <a href="#" className={styles.helpCenterLink}>
                Свържи се с нас
                <i className="fa-regular fa-chevron-right" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
