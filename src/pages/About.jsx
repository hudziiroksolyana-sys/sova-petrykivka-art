import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import about1 from "../assets/image/About Us/1a.jpg";
import about2 from "../assets/image/About Us/2a.jpg";
import about3 from "../assets/image/About Us/3a.jpg";
import about4 from "../assets/image/About Us/4a.jpg";
import founder1 from "../assets/image/About Us/w1.jpg";
import founder2 from "../assets/image/About Us/w2.jpg";
import soul1 from "../assets/image/About Us/part 3a.jpg";
import soul2 from "../assets/image/About Us/part 3b.jpg";
import symbol1 from "../assets/image/About Us/symb 1.jpg";
import symbol2 from "../assets/image/About Us/symb 2.jpg";
import symbol3 from "../assets/image/About Us/symb 3.jpg";
import symbol4 from "../assets/image/About Us/symb 4.jpg";
import cert1 from "../assets/image/About Us/sert1.jpg";
import cert2 from "../assets/image/About Us/sert2.jpg";
import cert3 from "../assets/image/About Us/sert3.jpg";
import cert4 from "../assets/image/About Us/sert4.jpg";
import cert5 from "../assets/image/About Us/sert5.jpg";
import cert6 from "../assets/image/About Us/sert6.jpg";
import cert7 from "../assets/image/About Us/sert7.jpg";
import olena1 from "../assets/image/About Us/Olena1.jpg";
import marko1 from "../assets/image/About Us/Marko1.jpg";
import iryna1 from "../assets/image/About Us/Iryna1.jpg";
import sofiia1 from "../assets/image/About Us/Sofiia1.jpg";
import { useLanguage } from "../context/LanguageContext";

const aboutContent = {
  uk: {
    circleText: "Більше робіт майстрині ·",
    title: "Наша історія",
    subtitle: ["Майстерня виникла з любові", "до українського народного мистецтва"],
    firstGalleryAlt: "Перші вироби майстерні",
    circleAria: "Більше робіт майстрині",
    galleryAlts: ["Інструменти та процес створення", "Петриківський розпис у роботі", "Авторська робота в майстерні"],
    description: [
      "У 2015 році Наталя створила перші вироби у техніці петриківського розпису",
      "З невеликого хобі справа перетворилася на професійну майстерню,",
      "де кожна деталь — це частинка душі та традиції",
      "Зараз ми передаємо знання через майстер-класи,",
      "виставки та онлайн-продажі у всьому світі",
    ],
    founderKicker: "Засновниця",
    founderName: "НАТАЛЯ СПИРИДОНОВА",
    founderMagicBlack: "Відчуй магію ",
    founderMagicWhite: "Петриківки ·",
    founderMainAlt: "Наталія Спиридонова",
    founderSecondAlt: "Наталія в майстерні",
    founderText: "Мене звати Наталя, я художниця з понад 10-річним досвідом у петриківському розписі, маю художню освіту, беру участь у міжнародних виставках, навчаю дітей та дорослих цьому мистецтву",
    founderNote: "Моє покликання — відроджувати та зберігати автентичну культуру через сучасний дизайн",
    soulTitle: "Петриківка -",
    soulItalic: " це стан душі",
    soulAlts: ["Майстриня створює розпис", "Фарби на палітрі та процес розпису"],
    symbolsTitle: "Символи",
    symbols: [
      { image: symbol1, alt: "Півень у петриківському розписі", title: "Півень", text: "символ сонця, мужності, пробудження" },
      { image: symbol2, alt: "Калина у петриківському розписі", title: "Калина", text: "пам’ять, жіноча енергія, Україна" },
      { image: symbol3, alt: "Барвінок у петриківському розписі", title: "Барвінок", text: "вічність, любов, життя" },
      { image: symbol4, alt: "Дерево життя у петриківському розписі", title: "Дерево життя", text: "зв’язок поколінь, ріст, гармонія" },
    ],
    colorTitle: "Колірна філософія",
    colorText: ["Майстри використовують переважно природні", "кольори - червоний, жовтий, зелений, синій"],
    colors: [
      ["Червоний -", " сила і любов"],
      ["Зелений -", " надія, відродження"],
      ["Жовтий -", " тепло, світло"],
      ["Синій -", " спокій, небо"],
    ],
    achievementsTop: "Досягнення",
    achievementsBottom: "Нагороди",
    prevCert: "Попередній сертифікат",
    nextCert: "Наступний сертифікат",
    reviewsTitle: "Відгуки",
    reviews: [
      { image: olena1, alt: "Олена Ковальчук", name: "Олена Ковальчук", text: "“Робота неймовірна! Замовила подарунок на весілля — всі були у захваті! Кожна деталь розпису випромінює тепло та любов до українських традицій. Дякую за вашу майстерність!”", city: "м. Львів" },
      { image: marko1, alt: "Марко Шевчук", name: "Марко Шевчук", text: "“Наталя — справжня майстриня. Розпис зроблений з душею! Замовив декоративну тарілку для мами — вона була вражена. Відчувається, що кожен мазок пензля несе в собі частинку історії.”", city: "м. Варшава" },
      { image: iryna1, alt: "Ірина Тимчук", name: "Ірина Тимчук", text: "“Дякую за чудовий майстер-клас! Дуже цікаво, доступно та натхненно. Навіть без художнього досвіду я змогла створити щось прекрасне. Атмосфера була теплою та дружньою — обов'язково прийду ще!”", city: "м. Київ" },
      { image: sofiia1, alt: "Софія Костюк", name: "Софія Костюк", text: "“Замовила набір розписаних тарілок — кожна з них витвір мистецтва. Відчувається любов до традицій у кожній деталі. Вироби стали окрасою мого дому та нагадуванням про рідну Україну.”", city: "м. Торонто" },
    ],
  },
  en: {
    circleText: "See more works ·",
    title: "Our story",
    subtitle: ["The studio grew from a love", "for Ukrainian folk art"],
    firstGalleryAlt: "First studio works",
    circleAria: "See more works",
    galleryAlts: ["Tools and creative process", "Petrykivka painting in progress", "Original work in the studio"],
    description: [
      "In 2015, Nataliia created her first pieces in the Petrykivka painting tradition.",
      "What began as a small hobby grew into a professional studio,",
      "where every detail carries soul and tradition.",
      "Today we share this art through workshops,",
      "exhibitions, and online sales around the world.",
    ],
    founderKicker: "Founder",
    founderName: "NATALIIA SPYRYDONOVA",
    founderMagicBlack: "Feel the magic of ",
    founderMagicWhite: "Petrykivka ·",
    founderMainAlt: "Nataliia Spyrydonova",
    founderSecondAlt: "Nataliia in the studio",
    founderText: "My name is Nataliia. I am an artist with more than 10 years of experience in Petrykivka painting, a formal art education, participation in international exhibitions, and many years of teaching both children and adults.",
    founderNote: "My calling is to revive and preserve authentic culture through contemporary design.",
    soulTitle: "Petrykivka is",
    soulItalic: " a state of mind",
    soulAlts: ["Artist creating a painting", "Paints on the palette and work in progress"],
    symbolsTitle: "Symbols",
    symbols: [
      { image: symbol1, alt: "Rooster in Petrykivka painting", title: "Rooster", text: "a symbol of the sun, courage, and awakening" },
      { image: symbol2, alt: "Viburnum in Petrykivka painting", title: "Viburnum", text: "memory, feminine energy, Ukraine" },
      { image: symbol3, alt: "Periwinkle in Petrykivka painting", title: "Periwinkle", text: "eternity, love, life" },
      { image: symbol4, alt: "Tree of life in Petrykivka painting", title: "Tree of Life", text: "connection between generations, growth, harmony" },
    ],
    colorTitle: "Color philosophy",
    colorText: ["Artists mainly use natural", "colors: red, yellow, green, and blue"],
    colors: [
      ["Red -", " strength and love"],
      ["Green -", " hope and renewal"],
      ["Yellow -", " warmth and light"],
      ["Blue -", " peace and sky"],
    ],
    achievementsTop: "Achievements",
    achievementsBottom: "Awards",
    prevCert: "Previous certificate",
    nextCert: "Next certificate",
    reviewsTitle: "Reviews",
    reviews: [
      { image: olena1, alt: "Olena Kovalchuk", name: "Olena Kovalchuk", text: "“The work is incredible! I ordered a wedding gift and everyone was delighted. Every detail radiates warmth and love for Ukrainian traditions. Thank you for your craftsmanship!”", city: "Lviv" },
      { image: marko1, alt: "Marko Shevchuk", name: "Marko Shevchuk", text: "“Nataliia is a true artist. The piece was made with real heart. I ordered a decorative plate for my mother, and she was amazed. You can feel a sense of history in every brushstroke.”", city: "Warsaw" },
      { image: iryna1, alt: "Iryna Tymchuk", name: "Iryna Tymchuk", text: "“Thank you for a wonderful workshop! It was inspiring, clear, and engaging. Even without any art experience, I was able to create something beautiful. The atmosphere was warm and friendly.”", city: "Kyiv" },
      { image: sofiia1, alt: "Sofiia Kostiuk", name: "Sofiia Kostiuk", text: "“I ordered a set of painted plates and each one is a work of art. You can feel the love for tradition in every detail. These pieces became a real decoration in my home.”", city: "Toronto" },
    ],
  },
};

export default function About() {
  const { language } = useLanguage();
  const t = useMemo(() => aboutContent[language], [language]);
  const aboutCircleText = t.circleText;
  const aboutCircleTextRing = `${t.circleText} ${t.circleText}`;
  const founderMagicText = `${t.founderMagicBlack}${t.founderMagicWhite}`;
  const founderMagicTextRing = `${founderMagicText} `;
  const aboutRef = useRef(null);
  const aboutCirclePathId = useRef(`aboutCirclePath-${Math.random().toString(36).slice(2, 9)}`);
  const achievementsGridRef = useRef(null);
  const [achievementsAtStart, setAchievementsAtStart] = useState(true);
  const [achievementsAtEnd, setAchievementsAtEnd] = useState(false);

  const scrollAchievementsGrid = (direction) => {
    const grid = achievementsGridRef.current;
    if (!grid) return;
    const card = grid.querySelector(".achievements__img");
    const cardWidth = card ? card.getBoundingClientRect().width : 0;
    const gap = 16;
    const delta = (cardWidth + gap) * direction;
    grid.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    const grid = achievementsGridRef.current;
    if (!grid) return;
    const edgeOffset = 24;
    const update = () => {
      const maxScroll = grid.scrollWidth - grid.clientWidth;
      setAchievementsAtStart(grid.scrollLeft <= edgeOffset);
      setAchievementsAtEnd(maxScroll - grid.scrollLeft <= edgeOffset);
    };
    grid.scrollLeft = 0;
    update();
    const rafId = window.requestAnimationFrame(update);
    grid.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    return () => {
      window.cancelAnimationFrame(rafId);
      grid.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
    };
  }, []);

  useEffect(() => {
    const root = aboutRef.current;
    if (!root) return;
    const revealItems = Array.from(root.querySelectorAll(".home-reveal"));
    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 55, 380)}ms`);
    });
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
    return () => revealObserver.disconnect();
  }, []);

  return (
    <section className="about-page" ref={aboutRef}>
      <div className="about-container">
        <div className="about-header home-reveal" data-reveal="up">
          <h1 className="about-title">{t.title}</h1>
          <p className="about-subtitle">
            <span className="about-subtitle-line">{t.subtitle[0]}</span>
            <br className="about-subtitle-break" />
            <span className="about-subtitle-line">{t.subtitle[1]}</span>
          </p>
        </div>

        <div className="about-gallery home-reveal" data-reveal="up">
          <div className="about-card about-card--first home-reveal" data-reveal="scale">
            <img src={about1} alt={t.firstGalleryAlt} />
            <Link to="/gallery" className="about-circlebtn" aria-label={t.circleAria}>
              <svg viewBox="0 0 248 248" aria-hidden="true">
                <defs>
                  <path id={aboutCirclePathId.current} d="M124,124 m-95,0 a95,95 0 1,1 190,0 a95,95 0 1,1 -190,0" />
                </defs>
                <text>
                  <textPath href={`#${aboutCirclePathId.current}`} startOffset="50%" textAnchor="middle">
                    {aboutCircleTextRing}
                  </textPath>
                </text>
              </svg>
              <span className="about-circlebtn-arrow">↗</span>
            </Link>
          </div>

          <img src={about2} alt={t.galleryAlts[0]} />
          <img src={about3} alt={t.galleryAlts[1]} />
          <img src={about4} alt={t.galleryAlts[2]} />
        </div>

        <p className="about-description home-reveal" data-reveal="up">
          {t.description.map((line, index) => (
            <span key={`${line}-${index}`}>
              {line}
              {index < t.description.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>

        <section className="founder-section home-reveal" data-reveal="up">
          <p className="founder-kicker">{t.founderKicker}</p>
          <h2 className="founder-title">{t.founderName}</h2>
          <div className="founder-grid home-reveal" data-reveal="up">
            <img className="founder-photo founder-photo--main" src={founder1} alt={t.founderMainAlt} />
            <div className="founder-right">
              <div className="founder-magic-circle" aria-hidden="true">
                <span className="founder-magic-ring">
                  {[...founderMagicTextRing].map((char, index) => (
                    <span
                      key={`${char}-${index}`}
                      className={`founder-magic-char${index < t.founderMagicBlack.length ? " founder-magic-char--black" : " founder-magic-char--white"}${char === "·" ? " founder-magic-char--dot" : ""}`}
                      style={{ "--char-index": index, "--char-count": founderMagicTextRing.length }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </div>
              <img className="founder-photo founder-photo--secondary" src={founder2} alt={t.founderSecondAlt} />
              <p className="founder-text">{t.founderText}</p>
            </div>
          </div>
          <p className="founder-note">{t.founderNote}</p>
        </section>

        <section className="petrykivka-soul home-reveal" data-reveal="up">
          <div className="petrykivka-soul__container">
            <h2 className="petrykivka-soul__title">
              {t.soulTitle}
              <span className="petrykivka-soul__title-italic">{t.soulItalic}</span>
            </h2>
            <div className="petrykivka-soul__grid">
              <img src={soul1} alt={t.soulAlts[0]} />
              <img src={soul2} alt={t.soulAlts[1]} />
            </div>
          </div>
        </section>

        <section className="symbols-section home-reveal" data-reveal="up">
          <div className="symbols-section__container">
            <h2 className="symbols-section__title">{t.symbolsTitle}</h2>
            <div className="symbols-grid">
              {t.symbols.map((symbol, index) => (
                <article key={symbol.title} className={`symbols-card${index === 3 ? " symbols-card--zoom" : ""}`}>
                  <div className={`symbols-card__media${index === 3 ? " symbols-card__media--tight" : ""}`}>
                    <img src={symbol.image} alt={symbol.alt} />
                  </div>
                  <h3 className="symbols-card__title">{symbol.title}</h3>
                  <p className="symbols-card__text">{symbol.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="color-philosophy home-reveal">
          <div className="color-philosophy__container">
            <h2 className="color-philosophy__title home-reveal" data-reveal="up">{t.colorTitle}</h2>
            <p className="color-philosophy__text home-reveal" data-reveal="up">
              <span className="color-philosophy__text-line">{t.colorText[0]}</span>
              <br />
              <span className="color-philosophy__text-line">{t.colorText[1]}</span>
            </p>

            <div className="color-philosophy__list">
              {t.colors.map((color, index) => (
                <div
                  key={color[0]}
                  className={`color-philosophy__item color-philosophy__item--${["red", "green", "yellow", "blue"][index]} color-philosophy__item--offset-${index + 1} color-philosophy__item--brush`}
                >
                  <span className="color-philosophy__label">{color[0]}</span>
                  <span className="color-philosophy__meaning">{color[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="achievements home-reveal" data-reveal="up">
          <div className="achievements__container">
            <h2 className="achievements__title">
              <span className="achievements__line achievements__line--top">{t.achievementsTop}</span>
              <span className="achievements__amp">&amp;</span>
              <span className="achievements__line achievements__line--bottom">{t.achievementsBottom}</span>
            </h2>
            <div className="achievements__viewport">
              <div className="achievements__grid" ref={achievementsGridRef}>
                {[cert1, cert2, cert3, cert4, cert5, cert6, cert7].map((cert, index) => (
                  <img key={index} className={`achievements__img achievements__img--sharp${index === 0 ? " achievements__img--cert1" : ""}${index === 2 ? " achievements__img--cert3" : ""}`} src={cert} alt={`Certificate ${index + 1}`} />
                ))}
              </div>
              <button className={`achievements-arrow achievements-arrow--left${achievementsAtStart ? " is-hidden" : ""}`} aria-label={t.prevCert} onClick={() => scrollAchievementsGrid(-1)} />
              <button className={`achievements-arrow achievements-arrow--right${achievementsAtEnd ? " is-hidden" : ""}`} aria-label={t.nextCert} onClick={() => scrollAchievementsGrid(1)} />
            </div>
          </div>
        </section>

        <section className="reviews home-reveal" data-reveal="up">
          <div className="reviews__container">
            <h2 className="reviews__title">{t.reviewsTitle}</h2>
            <div className="reviews__grid">
              {t.reviews.map((review) => (
                <article key={review.name} className="reviews-card">
                  <div className="reviews-card__avatar"><img src={review.image} alt={review.alt} /></div>
                  <h3 className="reviews-card__name">{review.name}</h3>
                  <p className="reviews-card__text">{review.text}</p>
                  <p className="reviews-card__city">{review.city}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
