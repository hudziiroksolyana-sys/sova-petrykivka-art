import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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

export default function About() {
  const aboutCircleText = "Побачити більше робіт майстрині ·";
  const aboutCircleTextRing = "Побачити більше робіт майстрині · ";
  const aboutRef = useRef(null);
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
          <h1 className="about-title">Наша історія</h1>
          <p className="about-subtitle">
            <span className="about-subtitle-line">Майстерня виникла з любові</span>
            <br className="about-subtitle-break" />
            <span className="about-subtitle-line">до українського народного мистецтва</span>
          </p>
        </div>

        <div className="about-gallery home-reveal" data-reveal="up">
          <div className="about-card about-card--first home-reveal" data-reveal="scale">
            <img src={about1} alt="Перші вироби майстерні" />

            <Link to="/gallery" className="about-circlebtn" aria-label="Побачити більше робіт майстрині">
              <svg viewBox="0 0 248 248" aria-hidden="true">
                <defs>
                  <path
                    id="aboutCirclePath"
                    d="M124,124 m-95,0 a95,95 0 1,1 190,0 a95,95 0 1,1 -190,0"
                  />
                </defs>
                <text>
                  <textPath
                    href="#aboutCirclePath"
                    startOffset="50%"
                    textAnchor="middle"
                    textLength="565"
                    lengthAdjust="spacing"
                  >
                    {aboutCircleText}
                  </textPath>
                </text>
              </svg>
              <span className="about-circlebtn-ring" aria-hidden="true">
                {[...aboutCircleTextRing].map((char, index) => (
                  <span
                    key={`${char}-${index}`}
                    className={`about-circlebtn-char${char === "·" ? " about-circlebtn-char--dot" : ""}`}
                    style={{
                      "--char-index": index,
                      "--char-count": aboutCircleTextRing.length,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="about-circlebtn-arrow">↗</span>
            </Link>
          </div>

          <img src={about2} alt="Інструменти та процес створення" />
          <img src={about3} alt="Петриківський розпис у роботі" />
          <img src={about4} alt="Авторська робота в майстерні" />
        </div>

        <p className="about-description home-reveal" data-reveal="up">
          У 2015 році Наталя створила перші вироби у техніці петриківського розпису
          <br />
          З невеликого хобі справа перетворилася на професійну майстерню,
          <br />
          де кожна деталь — це частинка душі та традиції
          <br />
          Зараз ми передаємо знання через майстер-класи,
          <br />
          виставки та онлайн-продажі у всьому світі
        </p>

        <section className="founder-section home-reveal" data-reveal="up">
          <p className="founder-kicker">Засновниця</p>
          <h2 className="founder-title">НАТАЛЯ СПИРИДОНОВА</h2>

          <div className="founder-grid home-reveal" data-reveal="up">
            <img className="founder-photo founder-photo--main" src={founder1} alt="Наталія Спиридонова" />

            <div className="founder-right">
              <div className="founder-magic-circle" aria-hidden="true">
                <svg viewBox="0 0 248 248">
                  <defs>
                    <path
                      id="founderMagicPath"
                      d="M124,124 m-95,0 a95,95 0 1,1 190,0 a95,95 0 1,1 -190,0"
                    />
                  </defs>
                  <text>
                    <textPath
                      href="#founderMagicPath"
                      startOffset="50%"
                      textAnchor="middle"
                      textLength="565"
                      lengthAdjust="spacing"
                    >
                      <tspan className="founder-magic-circle__black">Відчуй магію </tspan>
                      <tspan className="founder-magic-circle__white">Петриківки ·</tspan>
                    </textPath>
                  </text>
                </svg>
              </div>
              <img className="founder-photo founder-photo--secondary" src={founder2} alt="Наталія в майстерні" />
              <p className="founder-text">
                Мене звати Наталя, я художниця з понад 10-річним досвідом у
                петриківському розписі, маю художню освіту, беру участь у
                міжнародних виставках, навчаю дітей та дорослих цьому мистецтву
              </p>
            </div>
          </div>

          <p className="founder-note">
            Моє покликання — відроджувати та зберігати автентичну культуру через
            сучасний дизайн
          </p>
        </section>

        <section className="petrykivka-soul home-reveal" data-reveal="up">
          <div className="petrykivka-soul__container">
            <h2 className="petrykivka-soul__title">
              Петриківка -
              <span className="petrykivka-soul__title-italic"> це стан душі</span>
            </h2>

            <div className="petrykivka-soul__grid">
              <img src={soul1} alt="Майстриня створює розпис" />
              <img src={soul2} alt="Фарби на палітрі та процес розпису" />
            </div>
          </div>
        </section>

        <section className="symbols-section home-reveal" data-reveal="up">
          <div className="symbols-section__container">
            <h2 className="symbols-section__title">Символи</h2>

            <div className="symbols-grid">
              <article className="symbols-card home-reveal" data-reveal="scale">
                <div className="symbols-card__media">
                  <img src={symbol1} alt="Півень у петриківському розписі" />
                </div>
                <h3 className="symbols-card__title">Півень</h3>
                <p className="symbols-card__text">символ сонця, мужності, пробудження</p>
              </article>

              <article className="symbols-card home-reveal" data-reveal="scale">
                <div className="symbols-card__media">
                  <img src={symbol2} alt="Калина у петриківському розписі" />
                </div>
                <h3 className="symbols-card__title">Калина</h3>
                <p className="symbols-card__text">пам’ять, жіноча енергія, Україна</p>
              </article>

              <article className="symbols-card home-reveal" data-reveal="scale">
                <div className="symbols-card__media">
                  <img src={symbol3} alt="Барвінок у петриківському розписі" />
                </div>
                <h3 className="symbols-card__title">Барвінок</h3>
                <p className="symbols-card__text">вічність, любов, життя</p>
              </article>

              <article className="symbols-card symbols-card--zoom home-reveal" data-reveal="scale">
                <div className="symbols-card__media symbols-card__media--tight">
                  <img src={symbol4} alt="Дерево життя у петриківському розписі" />
                </div>
                <h3 className="symbols-card__title">Дерево життя</h3>
                <p className="symbols-card__text">зв’язок поколінь, ріст, гармонія</p>
              </article>
            </div>
          </div>
        </section>

        <section className="color-philosophy home-reveal">
          <div className="color-philosophy__container">
            <h2 className="color-philosophy__title home-reveal" data-reveal="up">Колірна філософія</h2>
            <p className="color-philosophy__text home-reveal" data-reveal="up">
              <span className="color-philosophy__text-line">Майстри використовують переважно природні</span>
              <br />
              <span className="color-philosophy__text-line">кольори - червоний, жовтий, зелений, синій</span>
            </p>

            <div className="color-philosophy__list">
              <div className="color-philosophy__item color-philosophy__item--red color-philosophy__item--offset-1 color-philosophy__item--brush">
                <span className="color-philosophy__label">Червоний -</span>
                <span className="color-philosophy__meaning"> сила і любов</span>
              </div>
              <div className="color-philosophy__item color-philosophy__item--green color-philosophy__item--offset-2 color-philosophy__item--brush">
                <span className="color-philosophy__label">Зелений -</span>
                <span className="color-philosophy__meaning"> надія, відродження</span>
              </div>
              <div className="color-philosophy__item color-philosophy__item--yellow color-philosophy__item--offset-3 color-philosophy__item--brush">
                <span className="color-philosophy__label">Жовтий -</span>
                <span className="color-philosophy__meaning"> тепло, світло</span>
              </div>
              <div className="color-philosophy__item color-philosophy__item--blue color-philosophy__item--offset-4 color-philosophy__item--brush">
                <span className="color-philosophy__label">Синій -</span>
                <span className="color-philosophy__meaning"> спокій, небо</span>
              </div>
            </div>
          </div>
        </section>

        <section className="achievements home-reveal" data-reveal="up">
          <div className="achievements__container">
            <h2 className="achievements__title">
              <span className="achievements__line achievements__line--top">Досягнення</span>
              <span className="achievements__amp">&amp;</span>
              <span className="achievements__line achievements__line--bottom">Нагороди</span>
            </h2>

            <div className="achievements__viewport">
              <div className="achievements__grid" ref={achievementsGridRef}>
                <img
                  className="achievements__img achievements__img--sharp achievements__img--cert1"
                  src={cert1}
                  alt="Сертифікат майстрині 1"
                />
                <img className="achievements__img achievements__img--sharp" src={cert2} alt="Сертифікат майстрині 2" />
                <img
                  className="achievements__img achievements__img--sharp achievements__img--cert3"
                  src={cert3}
                  alt="Сертифікат майстрині 3"
                />
                <img className="achievements__img achievements__img--sharp" src={cert4} alt="Сертифікат майстрині 4" />
                <img className="achievements__img achievements__img--sharp" src={cert5} alt="Сертифікат майстрині 5" />
                <img className="achievements__img achievements__img--sharp" src={cert6} alt="Сертифікат майстрині 6" />
                <img className="achievements__img achievements__img--sharp" src={cert7} alt="Сертифікат майстрині 7" />
              </div>
              <button
                className={`achievements-arrow achievements-arrow--left${achievementsAtStart ? " is-hidden" : ""}`}
                aria-label="Попередній сертифікат"
                onClick={() => scrollAchievementsGrid(-1)}
              />
              <button
                className={`achievements-arrow achievements-arrow--right${achievementsAtEnd ? " is-hidden" : ""}`}
                aria-label="Наступний сертифікат"
                onClick={() => scrollAchievementsGrid(1)}
              />
            </div>
          </div>
        </section>

        <section className="reviews home-reveal" data-reveal="up">
          <div className="reviews__container">
            <h2 className="reviews__title">Відгуки</h2>

            <div className="reviews__grid">
              <article className="reviews-card">
                <div className="reviews-card__avatar">
                  <img src={olena1} alt="Олена Ковальчук" />
                </div>
                <h3 className="reviews-card__name">Олена Ковальчук</h3>
                <p className="reviews-card__text">
                  “Робота неймовірна! Замовила подарунок на весілля — всі були у захваті! Кожна деталь
                  розпису випромінює тепло та любов до українських традицій. Дякую за вашу майстерність!”
                </p>
                <p className="reviews-card__city">м. Львів</p>
              </article>

              <article className="reviews-card">
                <div className="reviews-card__avatar">
                  <img src={marko1} alt="Марко Шевчук" />
                </div>
                <h3 className="reviews-card__name">Марко Шевчук</h3>
                <p className="reviews-card__text">
                  “Наталя — справжня майстриня. Розпис зроблений з душею! Замовив декоративну тарілку
                  для мами — вона була вражена. Відчувається, що кожен мазок пензля несе в собі частинку історії.”
                </p>
                <p className="reviews-card__city">м. Варшава</p>
              </article>

              <article className="reviews-card">
                <div className="reviews-card__avatar">
                  <img src={iryna1} alt="Ірина Тимчук" />
                </div>
                <h3 className="reviews-card__name">Ірина Тимчук</h3>
                <p className="reviews-card__text">
                  “Дякую за чудовий майстер-клас! Дуже цікаво, доступно та натхненно. Навіть без художнього
                  досвіду я змогла створити щось прекрасне. Атмосфера була теплою та дружньою — обов'язково прийду ще!”
                </p>
                <p className="reviews-card__city">м. Київ</p>
              </article>

              <article className="reviews-card">
                <div className="reviews-card__avatar">
                  <img src={sofiia1} alt="Софія Костюк" />
                </div>
                <h3 className="reviews-card__name">Софія Костюк</h3>
                <p className="reviews-card__text">
                  “Замовила набір розписаних тарілок — кожна з них витвір мистецтва. Відчувається любов до традицій
                  у кожній деталі. Вироби стали окрасою мого дому та нагадуванням про рідну Україну.”
                </p>
                <p className="reviews-card__city">м. Торонто</p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
