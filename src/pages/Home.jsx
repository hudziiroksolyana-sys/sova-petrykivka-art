import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroLeft from "../assets/image/home/hero-left.jpg";
import heroRight from "../assets/image/home/hero-right.jpg";
import sova1 from "../assets/image/home/sova-1.jpg";
import sova2 from "../assets/image/home/sova-2.jpg";
import sova3 from "../assets/image/home/sova-3.jpg";
import sova4 from "../assets/image/home/sova-4.jpg";
import can1 from "../assets/image/home/can-1.jpg";
import can2 from "../assets/image/home/can-2.jpg";
import can3 from "../assets/image/home/can-3.jpg";
import SmartImage from "../components/common/SmartImage";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

const BlogHome = lazy(() => import("../components/home/BlogHome"));

export default function Home() {
  const canGridRef = useRef(null);
  const homeRef = useRef(null);
  const [canAtStart, setCanAtStart] = useState(true);
  const [canAtEnd, setCanAtEnd] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].home;
  const aboutLinkText =
    language === "uk"
      ? "Дізнатися більше про майстерню та Наталію можна на сторінці Про нас."
      : "Learn more about the studio and Nataliia on the About page.";

  const scrollCanGrid = (direction) => {
    const grid = canGridRef.current;
    if (!grid) return;
    const card = grid.querySelector(".can-card");
    const cardWidth = card ? card.getBoundingClientRect().width : 0;
    const gap = 16;
    const delta = (cardWidth + gap) * direction;
    grid.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    const grid = canGridRef.current;
    if (!grid) return;

    const update = () => {
      const maxScroll = grid.scrollWidth - grid.clientWidth;
      setCanAtStart(grid.scrollLeft <= 2);
      setCanAtEnd(maxScroll - grid.scrollLeft <= 2);
    };

    update();
    grid.addEventListener("scroll", update, { passive: true });
    return () => grid.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const root = homeRef.current;
    if (!root) return;

    const revealItems = Array.from(root.querySelectorAll(".home-reveal"));

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 55, 360)}ms`);
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

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="home-page" ref={homeRef}>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-container home-reveal" data-reveal="up">
          <div className="hero-text home-reveal" data-reveal="up">
            <h1 className="hero-title">
              {t.title.split("\n").map((line, index, lines) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < lines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h1>

            <p className="hero-subtitle">
              {t.subtitle}
            </p>

            <div className="hero-seo-text" aria-label={language === "uk" ? "Опис майстерні" : "Studio description"}>
              {t.seoIntro.map((paragraph) => (
                <p key={paragraph} className="hero-seo-paragraph">
                  {paragraph}
                </p>
              ))}
              <p className="hero-seo-paragraph">
                {aboutLinkText} <Link to="/about">/about</Link>
              </p>
            </div>

            <div className="hero-meta" aria-label={t.heroMetaLabel}>
              {t.heroMeta.map((item) => (
                <span key={item} className="hero-meta-item">{item}</span>
              ))}
            </div>
          </div>

          <div className="hero-images home-reveal" data-reveal="scale">
            <div className="hero-card">
              <SmartImage
                src={heroLeft}
                alt={t.heroLeftAlt}
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 600px) 50vw, (max-width: 900px) 100vw, 50vw"
              />
              <Link to="/shop" className="hero-chip hero-chip--glass">{t.heroShop}</Link>
            </div>

            <div className="hero-card">
              <SmartImage
                src={heroRight}
                alt={t.heroRightAlt}
                loading="eager"
                sizes="(max-width: 600px) 50vw, (max-width: 900px) 100vw, 50vw"
              />
              <Link to="/classes" className="hero-chip hero-chip--glass hero-chip--long">
                {t.heroClasses}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOVA SECTION ===== */}
      <section className="sova-section home-reveal" data-reveal="up">
        <div className="sova-header home-reveal" data-reveal="up">
          <h2 className="sova-title">«Sova»</h2>
          <p className="sova-subtitle">by Nataliia Spyrydonova</p>
        </div>

        <div className="sova-gallery home-reveal" data-reveal="up">
          <SmartImage src={sova1} alt="process 1" sizes="(max-width: 600px) 46vw, (max-width: 1024px) 48vw, 24vw" />
          <SmartImage src={sova2} alt="process 2" sizes="(max-width: 600px) 46vw, (max-width: 1024px) 48vw, 24vw" />
          <SmartImage src={sova3} alt="process 3" sizes="(max-width: 600px) 46vw, (max-width: 1024px) 48vw, 24vw" />
          <SmartImage src={sova4} alt="process 4" sizes="(max-width: 600px) 46vw, (max-width: 1024px) 48vw, 24vw" />
        </div>

        <p className="sova-description home-reveal" data-reveal="up">
          {t.sovaDescription}
        </p>
      </section>

      {/* ===== can-section ===== */}
<section className="can-section home-reveal" data-reveal="up">
  <div className="can-container">
    <h2 className="can-title home-reveal" data-reveal="up">{t.canTitle}</h2>

    <div className="can-grid home-reveal" data-reveal="up" ref={canGridRef}>
      <div className="can-card can-card--overlay home-reveal" data-reveal="scale">
        <SmartImage src={can1} alt={t.canCards[0]} sizes="(max-width: 600px) 50vw, 33vw" />
        <div className="can-overlay">
          <p className="can-overlay-text">
            {t.canCards[0]}
          </p>
        </div>
      </div>

      <div className="can-card can-card--overlay can-card--middle home-reveal" data-reveal="scale">
        <SmartImage src={can2} alt={t.canCards[1]} sizes="(max-width: 600px) 50vw, 33vw" />
        <div className="can-overlay">
          <p className="can-overlay-text">{t.canCards[1]}</p>
        </div>
      </div>

      <div className="can-card can-card--overlay home-reveal" data-reveal="scale">
        <SmartImage src={can3} alt={t.canCards[2]} sizes="(max-width: 600px) 50vw, 33vw" />
        <div className="can-overlay">
          <p className="can-overlay-text">
            {t.canCards[2]}
          </p>
        </div>
      </div>
    </div>

    <button
      className={`can-arrow can-arrow--left${canAtStart ? " is-hidden" : ""}`}
      aria-label={t.previousCard}
      onClick={() => scrollCanGrid(-1)}
    />
    <button
      className={`can-arrow can-arrow--right${canAtEnd ? " is-hidden" : ""}`}
      aria-label={t.nextCard}
      onClick={() => scrollCanGrid(1)}
    />
  </div>
</section>

<Suspense fallback={<section className="bloghome bloghome--loading" aria-hidden="true" />}>
  <BlogHome />
</Suspense>




    </div>
  );
}
