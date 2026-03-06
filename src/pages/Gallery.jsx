import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import g1 from "../assets/image/Gallery/g1.jpg";
import g2 from "../assets/image/Gallery/g2.jpg";
import g3 from "../assets/image/Gallery/g3.jpg";
import g4 from "../assets/image/Gallery/g4.jpg";
import sw1 from "../assets/image/Gallery/sw1.jpg";
import sw2 from "../assets/image/Gallery/sw2.jpg";
import sw3 from "../assets/image/Gallery/sw3.jpg";
import sw4 from "../assets/image/Gallery/sw4.jpg";
import process1 from "../assets/image/Gallery/process1.jpg";
import process2 from "../assets/image/Gallery/process2.jpg";
import process3 from "../assets/image/Gallery/process3.jpg";
import process4 from "../assets/image/Gallery/process4.jpg";

export default function Gallery() {
  const galleryRef = useRef(null);
  const artworks = [
    {
      image: g1,
      title: "«Синя мандала життя»",
      meta: "техніка: акрил, полотно",
      year: "2024–2025",
      alt: "Синя мандала життя",
    },
    {
      image: g2,
      title: "«Райський сад з жар-птахами»",
      meta: "техніка: акрил, полотно",
      year: "2024–2025",
      alt: "Райський сад з жар-птахами",
    },
    {
      image: g3,
      title: "«Птах любові»",
      meta: "техніка: акрил, полотно",
      year: "2024–2025",
      alt: "Птах любові",
    },
    {
      image: g4,
      title: "«Квітковий вінок достатку»",
      meta: "техніка: акрил, полотно",
      year: "2024–2025",
      alt: "Квітковий вінок достатку",
    },
  ];

  const studentWorks = [
    {
      image: sw1,
      title: "“Птах щастя”",
      author: "Автор: Ольга, 44 роки",
      technique: "Техніка: акрил, дерево",
      alt: "Птах щастя",
    },
    {
      image: sw2,
      title: "“Весняна квітка”",
      author: "Автор: Марія, 28 років",
      technique: "Техніка: гуаш, папір",
      alt: "Весняна квітка",
    },
    {
      image: sw3,
      title: "“Квітуча душа”",
      author: "Автор: Софія, 11 років",
      technique: "Техніка: гуаш, картон",
      alt: "Квітуча душа",
    },
    {
      image: sw4,
      title: "“Пташина пісня”",
      author: "Автор: Марко, 10 років",
      technique: "Техніка: гуаш, картон",
      alt: "Пташина пісня",
    },
  ];

  useEffect(() => {
    const root = galleryRef.current;
    if (!root) return undefined;

    const revealItems = Array.from(root.querySelectorAll(".gallery-reveal"));
    if (!revealItems.length) return undefined;

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 55, 420)}ms`);
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
    <section className="about-page" ref={galleryRef}>
      <div className="about-container">
        <div className="about-header home-reveal gallery-reveal" data-reveal="up">
          <h1 className="about-title">Авторські роботи майстрині</h1>
          <p className="about-subtitle">by Nataliia Spyrydonova</p>
        </div>

        <div className="about-gallery home-reveal gallery-reveal" data-reveal="up">
          {artworks.map((artwork) => (
            <article key={artwork.title} className="gallery-art-card home-reveal gallery-reveal" data-reveal="scale">
              <img src={artwork.image} alt={artwork.alt} />

              <div className="gallery-art-overlay">
                <h3 className="gallery-art-title">{artwork.title}</h3>
                <p className="gallery-art-meta">
                  {artwork.meta}
                  <br />
                  {artwork.year}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="about-description home-reveal gallery-reveal" data-reveal="up">
          Унікальні роботи, створені з любов’ю та майстерністю.
          <br />
          Кожен виріб — результат натхнення і досвіду.
        </p>

        <section className="gallery-students home-reveal gallery-reveal" data-reveal="up">
          <div className="gallery-students-container">
            <div className="gallery-students-header home-reveal gallery-reveal" data-reveal="up">
              <h2 className="symbols-section__title">Творчість учнів</h2>
            </div>

            <div className="gallery-students-grid">
              {studentWorks.map((work) => (
                <article key={work.title} className="gallery-students-card home-reveal gallery-reveal" data-reveal="scale">
                  <div className="gallery-students-media">
                    <img src={work.image} alt={work.alt} />
                  </div>
                  <div className="gallery-students-caption">
                    <h3 className="gallery-students-title">{work.title}</h3>
                    <p className="gallery-students-author">{work.author}</p>
                    <p className="gallery-students-technique">{work.technique}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-process home-reveal gallery-reveal" data-reveal="up">
          <div className="gallery-process-container">
            <div className="gallery-process-header home-reveal gallery-reveal" data-reveal="up">
              <h2 className="gallery-process-title">Процес створення</h2>
              <p className="gallery-process-subtitle">Як ми творимо: процес у деталях</p>
            </div>

            <div className="gallery-process-layout">
              <div className="gallery-process-col gallery-process-col--left">
                <figure className="gallery-process-card gallery-process-card--p1 home-reveal gallery-reveal" data-reveal="scale">
                  <img src={process1} alt="Процес створення: крок 1" />
                </figure>
                <figure className="gallery-process-card gallery-process-card--p3 home-reveal gallery-reveal" data-reveal="scale">
                  <img src={process3} alt="Процес створення: крок 3" />
                </figure>
              </div>

              <div className="gallery-process-col gallery-process-col--right">
                <figure className="gallery-process-card gallery-process-card--p2 home-reveal gallery-reveal" data-reveal="scale">
                  <img src={process2} alt="Процес створення: крок 2" />
                </figure>
                <figure className="gallery-process-card gallery-process-card--p4 home-reveal gallery-reveal" data-reveal="scale">
                  <img src={process4} alt="Процес створення: крок 4" />
                  <Link to="/classes" className="classes-enroll bloghome-more">
                    <span className="bloghome-moretext">Записатись</span>
                    <span className="bloghome-morecircle" aria-hidden="true">
                      <span className="bloghome-morearrow">↗</span>
                    </span>
                  </Link>
                </figure>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
