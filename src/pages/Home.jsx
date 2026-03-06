import heroLeft from "../assets/image/home/hero-left.jpg";
import heroRight from "../assets/image/home/hero-right.jpg";

import sova1 from "../assets/image/home/sova-1.jpg";
import sova2 from "../assets/image/home/sova-2.jpg";
import sova3 from "../assets/image/home/sova-3.jpg";
import sova4 from "../assets/image/home/sova-4.jpg";

import can1 from "../assets/image/home/can-1.jpg";
import can2 from "../assets/image/home/can-2.jpg";
import can3 from "../assets/image/home/can-3.jpg";



import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import BlogHome from "../components/home/BlogHome";


export default function Home() {
  const canGridRef = useRef(null);
  const homeRef = useRef(null);
  const [canAtStart, setCanAtStart] = useState(true);
  const [canAtEnd, setCanAtEnd] = useState(false);

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
              «Живий Петриківський<br />
              розпис у сучасному житті»
            </h1>

            <p className="hero-subtitle">
              Авторські роботи та навчання від Nataliia Spyrydonova
            </p>

            <div className="hero-meta" aria-label="Ключові переваги">
              <span className="hero-meta-item">Ручний розпис</span>
              <span className="hero-meta-item">Традиція + сучасність</span>
              <span className="hero-meta-item">Майстер-класи наживо</span>
            </div>
          </div>

          <div className="hero-images home-reveal" data-reveal="scale">
            <div className="hero-card">
              <img src={heroLeft} alt="Петриківський розпис" />
              <Link to="/shop" className="hero-chip hero-chip--glass">Магазин</Link>
            </div>

            <div className="hero-card">
              <img src={heroRight} alt="Майстер-клас" />
              <Link to="/classes" className="hero-chip hero-chip--glass hero-chip--long">
                Майстер-класи
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
          <img src={sova1} alt="process 1" />
          <img src={sova2} alt="process 2" />
          <img src={sova3} alt="process 3" />
          <img src={sova4} alt="process 4" />
        </div>

        <p className="sova-description home-reveal" data-reveal="up">
          Це місце, де українські традиції оживають у кожному мазку
        </p>
      </section>

      {/* ===== can-section ===== */}
<section className="can-section home-reveal" data-reveal="up">
  <div className="can-container">
    <h2 className="can-title home-reveal" data-reveal="up">Тут ви можете:</h2>

    <div className="can-grid home-reveal" data-reveal="up" ref={canGridRef}>
      <div className="can-card can-card--overlay home-reveal" data-reveal="scale">
        <img src={can1} alt="Замовити унікальні речі з ручним розписом" />
        <div className="can-overlay">
          <p className="can-overlay-text">
            Замовити унікальні речі з ручним розписом
          </p>
        </div>
      </div>

      <div className="can-card can-card--overlay can-card--middle home-reveal" data-reveal="scale">

        <img src={can2} alt="Придбати авторські картини" />
        <div className="can-overlay">
          <p className="can-overlay-text">Придбати авторські картини</p>
        </div>
      </div>

      <div className="can-card can-card--overlay home-reveal" data-reveal="scale">
        <img src={can3} alt="Навчитися творити з нуля до шедевру" />
        <div className="can-overlay">
          <p className="can-overlay-text">
            Навчитися творити з нуля до шедевру
          </p>
        </div>
      </div>
    </div>

    <button
      className={`can-arrow can-arrow--left${canAtStart ? " is-hidden" : ""}`}
      aria-label="Попередня картка"
      onClick={() => scrollCanGrid(-1)}
    />
    <button
      className={`can-arrow can-arrow--right${canAtEnd ? " is-hidden" : ""}`}
      aria-label="Наступна картка"
      onClick={() => scrollCanGrid(1)}
    />
  </div>
</section>

<BlogHome />




    </div>
  );
}
