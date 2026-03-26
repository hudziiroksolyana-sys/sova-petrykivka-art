import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import work1 from "../assets/image/Workshops/work1.jpg";
import work2 from "../assets/image/Workshops/work2.jpg";
import work3 from "../assets/image/Workshops/work3.jpg";
import work4 from "../assets/image/Workshops/work4.jpg";
import work5 from "../assets/image/Workshops/work5.jpg";
import abNat from "../assets/image/Workshops/abNat.jpg";
import { useLanguage } from "../context/LanguageContext";

const classesContent = {
  uk: {
    title: "Майстер-класи",
    subtitle: "Створи щось красиве власноруч. Доторкнись до українського мистецтва.",
    prevWorkshop: "Попередній майстер-клас",
    nextWorkshop: "Наступний майстер-клас",
    enroll: "Записатись",
    workshopLabel: "Майстер-клас:",
    duration: "Тривалість:",
    age: "Вік:",
    level: "Рівень:",
    moreTitle: "Більше:",
    morePrev: "Показати попередні майстер-класи",
    moreNext: "Показати наступні майстер-класи",
    calendarTitle: "Календар майстер-класів",
    calendarSubtitle: "Обери місяць і переглянь події",
    calendarAria: "Місяці календаря майстер-класів",
    perPerson: "/ за особу",
    faqTitle: "Про майстерню і Наталію",
    faqSubtitle: "Часті питання тут:",
    workshops: [
      { id: 1, image: work1, title: "Основи Петриківського розпису", moreTitle: "Основи\nПетриківського розпису", intro: "Запрошуємо вас на атмосферний майстер-клас, де ви поринете у світ українського народного мистецтва — Петриківського розпису.", details: "Це не просто урок малювання — це знайомство з живою традицією, яка передавалась із покоління в покоління і сьогодні продовжує надихати митців по всьому світу.", atmosphere: "Майстер-клас проходить у теплій, творчій атмосфері, де немає критики, а є тільки підтримка, натхнення й любов до української культури. Ви зможете відволіктись від буденності, зняти напругу, розслабитись і провести час з користю для душі.", date: "11 серпня 2025", time: "11:00", duration: "2 год", age: "+10", level: "Початковий", price: "1200 ₴" },
      { id: 2, image: work2, title: "Петриківський розпис на тканині", moreTitle: "Петриківський розпис\nна тканині", intro: "Запрошуємо вас на майстер-клас, де ви спробуєте перенести традиційний Петриківський розпис на тканину. Ви ознайомитесь із базовими елементами Петриківки — квітами, крапками та характерними мазками — і навчитесь гармонійно поєднувати їх у власній роботі.", details: "Це чудова можливість відчути матеріал, попрацювати з кольором і створити унікальний виріб своїми руками. Атмосфера заняття сприяє творчості, натхненню та спокійному зануренню у процес.", date: "17 серпня 2025", time: "17:00", duration: "2 год", age: "+10", level: "Початковий", price: "600 ₴" },
      { id: 3, image: work3, title: "Квіти в стилі Петриківки", moreTitle: "Квіти в стилі\nПетриківки", intro: "На цьому майстер-класі ви познайомитесь із базовими елементами Петриківського розпису — квітами, крапками та мазками. Особливу увагу приділимо побудові квіткових форм, плавності ліній та поєднанню кольорів.", details: "Заняття допоможе розвинути відчуття ритму, композиції та впевненості у роботі з пензлем. Ви створите власну квіткову композицію в стилі Петриківки та отримаєте задоволення від творчого процесу.", date: "18 серпня 2025", time: "10:00", duration: "2 год", age: "+10", level: "Початковий", price: "900 ₴" },
      { id: 4, image: work4, title: "Ягоди та листя Петриківки", moreTitle: "Ягоди та листя\nПетриківки", intro: "Майстер-клас присвячений рослинним мотивам Петриківського розпису — ягодам, листю та ритму композиції. Ви навчитесь передавати об’єм, легкість і характерні декоративні форми, які створюють живу та гармонійну роботу.", details: "У теплій творчій атмосфері ви крок за кроком опануєте нові елементи та складете власну композицію, зберігаючи традиційний стиль і водночас додаючи індивідуальність.", date: "20 серпня 2025", time: "17:00", duration: "2 год", age: "+10", level: "Початковий", price: "900 ₴" },
      { id: 5, image: work5, title: "Орнамент і композиція Петриківки", moreTitle: "Орнамент і композиція\nПетриківки", intro: "Цей майстер-клас присвячений основам побудови орнаменту в стилі Петриківки. Ви розглянете різні види мазків, принципи балансу та створення завершеної композиції.", details: "Заняття допоможе зрозуміти, як окремі елементи поєднуються в єдину гармонійну роботу. Ви навчитесь відчувати ритм, симетрію та впевнено будувати орнаментальні форми.", date: "30 серпня 2025", time: "11:00", duration: "2 год", age: "+10", level: "Початковий", price: "1200 ₴" },
    ],
    months: [
      { id: "august-2025", label: "Серпень 2025", events: [
        { id: "aug-1", title: "Основи Петриківського розпису", date: "11 серпня 2025", time: "11:00", summary: "Знайомство з базовими елементами Петриківки: квіти, крапки, мазки.", duration: "2 год", age: "+10", level: "Початковий", image: work1, price: "1200 ₴" },
        { id: "aug-2", title: "Петриківський розпис на тканині", date: "17 серпня 2025", time: "17:00", summary: "Знайомство з базовими елементами Петриківки: квіти, крапки, мазки.", duration: "2 год", age: "+10", level: "Початковий", image: work2, price: "600 ₴" },
      ]},
      { id: "september-2025", label: "Вересень 2025", events: [
        { id: "sep-1", title: "Класичні квіти Петриківки", date: "7 вересня 2025", time: "11:30", summary: "Побудова квіткових форм, ритм мазка та гармонійне поєднання кольорів.", duration: "2 год", age: "+10", level: "Початковий", image: work3, price: "900 ₴" },
        { id: "sep-2", title: "Тканина та орнамент", date: "12 вересня 2025", time: "14:00", summary: "Практика розпису на тканині з акцентом на чистоту лінії та композицію.", duration: "2 год", age: "+10", level: "Початковий", image: work2, price: "700 ₴" },
      ]},
      { id: "october-2025", label: "Жовтень 2025", events: [
        { id: "oct-1", title: "Осінній розпис: гілки та ягоди", date: "5 жовтня 2025", time: "12:00", summary: "Рослинні елементи та живі акценти кольору для осінніх композицій.", duration: "2 год", age: "+10", level: "Початковий", image: work4, price: "950 ₴" },
        { id: "oct-2", title: "Петриківські квіти на полотні", date: "10 жовтня 2025", time: "15:30", summary: "Квіткова композиція на полотні: від ескізу до завершеного результату.", duration: "2 год", age: "+10", level: "Початковий", image: work1, price: "1200 ₴" },
      ]},
    ],
    faqItems: [
      { question: "1. Хто така Наталія Спиридонова?", answer: "Наталія — майстриня Петриківського розпису з багаторічним досвідом, авторка проекту «Sova», яка популяризує традиційне українське мистецтво через картини, предмети побуту та навчання." },
      { question: "2. Що таке Петриківський розпис?", answer: "Це унікальна українська народна техніка декоративного розпису з особливими квітковими мотивами, що символізують природу і життя." },
      { question: "3. Чи потрібен досвід для участі в майстер-класах?", answer: "Ні, наші заняття підходять для будь-якого рівня — від новачків до досвідчених художників." },
      { question: "4. Які формати навчання пропонуєте?", answer: "Живі (офлайн) майстер-класи у майстерні та онлайн-курси, які можна проходити вдома." },
      { question: "5. Як оформити замовлення?", answer: "Виберіть товар, додайте до кошика та перейдіть до оплати. Детальна інформація є у розділі «Оплата і доставка»." },
      { question: "6. Чи можна подарувати майстер-клас у подарунок?", answer: "Так, ми пропонуємо подарункові сертифікати на будь-які майстер-класи." },
      { question: "7. Чи є обмеження за віком для участі в майстер-класах?", answer: "Наші заняття підходять для дітей від 10 років і дорослих. Для молодших дітей є окремі сімейні та дитячі майстер-класи." },
    ],
    monthMap: { січня: 0, лютого: 1, березня: 2, квітня: 3, травня: 4, червня: 5, липня: 6, серпня: 7, вересня: 8, жовтня: 9, листопада: 10, грудня: 11 },
    weekdayMap: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  },
  en: {
    title: "Workshops",
    subtitle: "Create something beautiful by hand. Experience Ukrainian art up close.",
    prevWorkshop: "Previous workshop",
    nextWorkshop: "Next workshop",
    enroll: "Book now",
    workshopLabel: "Workshop:",
    duration: "Duration:",
    age: "Age:",
    level: "Level:",
    moreTitle: "More:",
    morePrev: "Show previous workshops",
    moreNext: "Show next workshops",
    calendarTitle: "Workshop calendar",
    calendarSubtitle: "Choose a month and browse events",
    calendarAria: "Workshop calendar months",
    perPerson: "/ per person",
    faqTitle: "About the studio and Nataliia",
    faqSubtitle: "Frequently asked questions:",
    workshops: [
      { id: 1, image: work1, title: "Petrykivka Painting Basics", moreTitle: "Petrykivka\nPainting Basics", intro: "Join a welcoming workshop and step into the world of Ukrainian folk art through Petrykivka painting.", details: "This is more than a painting lesson. It is an introduction to a living tradition that has been passed down through generations and still inspires artists today.", atmosphere: "The workshop is held in a warm, creative atmosphere filled with support and inspiration, giving you space to relax and enjoy the process.", date: "11 August 2025", time: "11:00", duration: "2 hrs", age: "+10", level: "Beginner", price: "1200 ₴" },
      { id: 2, image: work2, title: "Petrykivka Painting on Fabric", moreTitle: "Petrykivka Painting\non Fabric", intro: "In this workshop, you will explore how traditional Petrykivka painting can be transferred onto fabric while learning the basic elements of the style.", details: "It is a great opportunity to work with texture, color, and composition while creating a one-of-a-kind piece by hand.", date: "17 August 2025", time: "17:00", duration: "2 hrs", age: "+10", level: "Beginner", price: "600 ₴" },
      { id: 3, image: work3, title: "Flowers in the Petrykivka Style", moreTitle: "Flowers in the\nPetrykivka Style", intro: "This workshop introduces the core elements of Petrykivka painting, with a special focus on floral forms, flowing lines, and color harmony.", details: "You will build confidence with the brush while developing a stronger sense of rhythm and composition in your own floral piece.", date: "18 August 2025", time: "10:00", duration: "2 hrs", age: "+10", level: "Beginner", price: "900 ₴" },
      { id: 4, image: work4, title: "Petrykivka Berries and Leaves", moreTitle: "Petrykivka Berries\nand Leaves", intro: "This workshop is dedicated to the plant motifs of Petrykivka painting: berries, leaves, and the rhythm of composition.", details: "Step by step, you will learn new elements and create your own composition while keeping the traditional spirit and adding your own touch.", date: "20 August 2025", time: "17:00", duration: "2 hrs", age: "+10", level: "Beginner", price: "900 ₴" },
      { id: 5, image: work5, title: "Petrykivka Ornament and Composition", moreTitle: "Petrykivka Ornament\nand Composition", intro: "This workshop focuses on the basics of building ornament in the Petrykivka style.", details: "You will explore strokes, balance, and complete composition while learning how to create ornamental forms with confidence.", date: "30 August 2025", time: "11:00", duration: "2 hrs", age: "+10", level: "Beginner", price: "1200 ₴" },
    ],
    months: [
      { id: "august-2025", label: "August 2025", events: [
        { id: "aug-1", title: "Basics of Petrykivka Painting", date: "11 August 2025", time: "11:00", summary: "Introduction to core Petrykivka elements: flowers, dots, and strokes.", duration: "2 hrs", age: "+10", level: "Beginner", image: work1, price: "1200 ₴" },
        { id: "aug-2", title: "Petrykivka Painting on Fabric", date: "17 August 2025", time: "17:00", summary: "Learn the basic Petrykivka elements: flowers, dots, and characteristic strokes.", duration: "2 hrs", age: "+10", level: "Beginner", image: work2, price: "600 ₴" },
      ]},
      { id: "september-2025", label: "September 2025", events: [
        { id: "sep-1", title: "Classic Petrykivka Flowers", date: "7 September 2025", time: "11:30", summary: "Building flower shapes, brush rhythm, and harmonious color combinations.", duration: "2 hrs", age: "+10", level: "Beginner", image: work3, price: "900 ₴" },
        { id: "sep-2", title: "Fabric and Ornament", date: "12 September 2025", time: "14:00", summary: "Painting practice on fabric with a focus on clean lines and composition.", duration: "2 hrs", age: "+10", level: "Beginner", image: work2, price: "700 ₴" },
      ]},
      { id: "october-2025", label: "October 2025", events: [
        { id: "oct-1", title: "Autumn Painting: Branches and Berries", date: "5 October 2025", time: "12:00", summary: "Plant elements and vivid color accents for autumn compositions.", duration: "2 hrs", age: "+10", level: "Beginner", image: work4, price: "950 ₴" },
        { id: "oct-2", title: "Petrykivka Flowers on Canvas", date: "10 October 2025", time: "15:30", summary: "A floral composition on canvas, from sketch to final result.", duration: "2 hrs", age: "+10", level: "Beginner", image: work1, price: "1200 ₴" },
      ]},
    ],
    faqItems: [
      { question: "1. Who is Nataliia Spyrydonova?", answer: "Nataliia is a Petrykivka painting artist with many years of experience and the creator of the Sova project, promoting traditional Ukrainian art through paintings, home objects, and teaching." },
      { question: "2. What is Petrykivka painting?", answer: "It is a unique Ukrainian decorative folk painting technique with floral motifs symbolizing nature and life." },
      { question: "3. Do I need prior experience to join a workshop?", answer: "No. Our classes are suitable for all levels, from complete beginners to experienced artists." },
      { question: "4. What learning formats do you offer?", answer: "We offer live offline workshops in the studio and online formats for learning from home." },
      { question: "5. How do I place an order?", answer: "Choose a product, add it to your cart, and proceed to payment. More details are available in the payment and delivery section." },
      { question: "6. Can I gift a workshop?", answer: "Yes, we offer gift certificates for any workshop." },
      { question: "7. Are there age limits?", answer: "Our workshops are suitable for children aged 10 and up as well as adults. We also offer separate family and children's formats for younger participants." },
    ],
    monthMap: { january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6, august: 7, september: 8, october: 9, november: 10, december: 11 },
    weekdayMap: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
};

export default function Classes() {
  const { language } = useLanguage();
  const t = useMemo(() => classesContent[language], [language]);
  const location = useLocation();
  const classesRef = useRef(null);
  const moreGridRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreAtStart, setMoreAtStart] = useState(true);
  const [moreAtEnd, setMoreAtEnd] = useState(false);
  const [activeCalendarMonth, setActiveCalendarMonth] = useState(t.months[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);

  useEffect(() => {
    setActiveCalendarMonth(t.months[0].id);
    setActiveIndex(0);
  }, [t.months]);

  const activeWorkshop = t.workshops[activeIndex];
  const selectedCalendar = t.months.find((month) => month.id === activeCalendarMonth) || t.months[0];
  const formatBadgePrice = (priceValue) => String(priceValue).replace(/\s{2,}/g, " ").trim();

  const parseDateParts = (dateValue) => {
    if (!dateValue) return null;
    const parts = dateValue.trim().split(/\s+/);
    if (parts.length < 3) return null;
    const [day, month, year] = parts;
    return { day, month, year };
  };

  const getWeekday = (dateValue) => {
    const parts = dateValue.trim().split(/\s+/);
    if (parts.length < 3) return "";
    const day = Number(parts[0]);
    const month = t.monthMap[parts[1]?.toLowerCase()];
    const year = Number(parts[2]);
    if (Number.isNaN(day) || Number.isNaN(year) || month === undefined) return "";
    const date = new Date(year, month, day, 12, 0, 0);
    return t.weekdayMap[date.getDay()] || "";
  };

  useEffect(() => {
    const grid = moreGridRef.current;
    if (!grid) return undefined;
    const edgeOffset = 16;
    const updateEdges = () => {
      const maxScroll = grid.scrollWidth - grid.clientWidth;
      setMoreAtStart(grid.scrollLeft <= edgeOffset);
      setMoreAtEnd(maxScroll - grid.scrollLeft <= edgeOffset);
    };
    grid.scrollLeft = 0;
    updateEdges();
    const rafId = window.requestAnimationFrame(updateEdges);
    grid.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    window.addEventListener("load", updateEdges);
    return () => {
      window.cancelAnimationFrame(rafId);
      grid.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
      window.removeEventListener("load", updateEdges);
    };
  }, []);

  useEffect(() => {
    setOpenFaqIndex(-1);
  }, [location.pathname]);

  useEffect(() => {
    const root = classesRef.current;
    if (!root) return undefined;
    const revealItems = Array.from(root.querySelectorAll(".classes-reveal"));
    if (!revealItems.length) return undefined;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (isMobile) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    revealItems.forEach((item, index) => {
      item.classList.remove("is-visible");
      item.style.setProperty("--reveal-delay", `${Math.min(index * 50, 420)}ms`);
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    const revealImmediatelyVisibleItems = () => {
      revealItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

        if (isInViewport) {
          item.classList.add("is-visible");
          return;
        }

        revealObserver.observe(item);
      });
    };

    const rafId = window.requestAnimationFrame(revealImmediatelyVisibleItems);
    return () => {
      window.cancelAnimationFrame(rafId);
      revealObserver.disconnect();
    };
  }, [language, activeCalendarMonth]);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + t.workshops.length) % t.workshops.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % t.workshops.length);
  const scrollMoreGrid = (direction) => {
    const grid = moreGridRef.current;
    if (!grid) return;
    const card = grid.querySelector(".classes-more-card");
    const cardWidth = card ? card.getBoundingClientRect().width : 0;
    const gap = 28;
    grid.scrollBy({ left: (cardWidth + gap) * direction, behavior: "smooth" });
  };
  const selectWorkshop = (index) => {
    setActiveIndex(index);
    classesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="classes-page" ref={classesRef}>
      <section className="classes-title home-reveal classes-reveal" data-reveal="up">
        <div className="classes-title-container">
          <h1 className="classes-title-text">{t.title}</h1>
          <p className="classes-title-subtitle">{t.subtitle}</p>
          <div className="classes-title-divider" />
        </div>
      </section>

      <section className="classes-main home-reveal classes-reveal" data-reveal="up">
        <div className="classes-main-container">
          <div className="classes-workshop-wrap">
            <button type="button" className="classes-nav-arrow classes-nav-arrow--left" onClick={goPrev} aria-label={t.prevWorkshop} />
            <button type="button" className="classes-nav-arrow classes-nav-arrow--right" onClick={goNext} aria-label={t.nextWorkshop} />

            <article className="classes-card home-reveal classes-reveal" data-reveal="scale">
              <div className="classes-media">
                <img src={activeWorkshop.image} alt={activeWorkshop.title} />
                {activeWorkshop.price && <div className="classes-price-badge">{formatBadgePrice(activeWorkshop.price)}</div>}
                <Link to="/request" state={{ workshop: activeWorkshop }} className="classes-enroll bloghome-more">
                  <span className="bloghome-moretext">{t.enroll}</span>
                  <span className="bloghome-morecircle" aria-hidden="true"><span className="bloghome-morearrow">↗</span></span>
                </Link>
              </div>

              <div className="classes-content">
                <p className="classes-kicker">{t.workshopLabel}</p>
                <h2 className="classes-name">{activeWorkshop.title}</h2>
                <p className="classes-text">{activeWorkshop.intro}</p>
                <p className="classes-text">{activeWorkshop.details}</p>
                {activeWorkshop.atmosphere ? <p className="classes-text classes-text--spaced">{activeWorkshop.atmosphere}</p> : null}
                {activeWorkshop.date && <p className="classes-date">{activeWorkshop.date}</p>}
                <ul className="classes-meta">
                  {activeWorkshop.duration && <li><span>{t.duration}</span> <strong>{activeWorkshop.duration}</strong></li>}
                  {activeWorkshop.age && <li><span>{t.age}</span> <strong>{activeWorkshop.age}</strong></li>}
                  {activeWorkshop.level && <li><span>{t.level}</span> <strong>{activeWorkshop.level}</strong></li>}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="classes-more home-reveal classes-reveal" data-reveal="up">
        <div className="classes-main-container">
          <h2 className="classes-more-title home-reveal classes-reveal" data-reveal="up">{t.moreTitle}</h2>
          <div className="classes-more-viewport">
            <button type="button" className={`classes-more-arrow classes-more-arrow--left${moreAtStart ? " is-hidden" : ""}`} aria-label={t.morePrev} onClick={() => scrollMoreGrid(-1)} />
            <button type="button" className={`classes-more-arrow classes-more-arrow--right${moreAtEnd ? " is-hidden" : ""}`} aria-label={t.moreNext} onClick={() => scrollMoreGrid(1)} />
            <div ref={moreGridRef} className="classes-more-grid">
              {t.workshops.map((item, index) => (
                <article key={item.id} className="classes-more-card home-reveal classes-reveal" data-reveal="scale">
                  <button type="button" className={`classes-more-card-button${index === activeIndex ? " is-active" : ""}`} onClick={() => selectWorkshop(index)} aria-label={item.title}>
                    <div className="classes-more-media">
                      <img src={item.image} alt={item.title} />
                      {item.price && <span className="classes-more-price">{formatBadgePrice(item.price)}</span>}
                    </div>
                    <h3 className="classes-more-name">{item.moreTitle || item.title}</h3>
                    {item.date ? (
                      (() => {
                        const parsedDate = parseDateParts(item.date);
                        if (!parsedDate) return <p className="classes-more-date">{item.date}</p>;
                        return (
                          <p className="classes-more-date">
                            <span className="classes-more-date-day">{parsedDate.day}</span>
                            <span className="classes-more-date-sep" aria-hidden="true">•</span>
                            <span className="classes-more-date-meta">
                              <span className="classes-more-date-month">{parsedDate.month}</span>
                              <span className="classes-more-date-year">{parsedDate.year}</span>
                            </span>
                          </p>
                        );
                      })()
                    ) : null}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="classes-calendar home-reveal classes-reveal" data-reveal="up">
        <div className="classes-main-container">
          <div className="classes-calendar-head home-reveal classes-reveal" data-reveal="up">
            <h2 className="classes-calendar-title home-reveal classes-reveal" data-reveal="up">{t.calendarTitle}</h2>
            <p className="classes-calendar-subtitle home-reveal classes-reveal" data-reveal="up">{t.calendarSubtitle}</p>
          </div>
          <div className="classes-calendar-switch home-reveal classes-reveal" data-reveal="up" role="tablist" aria-label={t.calendarAria}>
            {t.months.map((month) => (
              <button key={month.id} type="button" role="tab" aria-selected={activeCalendarMonth === month.id} className={`classes-calendar-month${activeCalendarMonth === month.id ? " is-active" : ""}`} onClick={() => setActiveCalendarMonth(month.id)}>
                {month.label}
              </button>
            ))}
          </div>

          <div className="classes-calendar-grid">
            {selectedCalendar.events.map((event) => (
              <article key={event.id} className="classes-calendar-card home-reveal classes-reveal" data-reveal="up">
                <div className="classes-calendar-desktop">
                  <div className="classes-calendar-content">
                    <div className="classes-calendar-datebox">
                      <span className="classes-calendar-daynum">{event.date.split(" ")[0]}</span>
                      <span className="classes-calendar-weekday">{getWeekday(event.date)}</span>
                    </div>
                    <div className="classes-calendar-info">
                      <div className="classes-calendar-headline">
                        <h3 className="classes-calendar-name">{event.title}</h3>
                        <span className="classes-calendar-time">{event.time}</span>
                      </div>
                      <p className="classes-calendar-summary">{event.summary}</p>
                      <p className="classes-calendar-meta">
                        <span>{t.duration} <strong>{event.duration}</strong></span>
                        <span>{t.age} <strong>{event.age}</strong></span>
                        <span>{t.level} <strong>{event.level}</strong></span>
                      </p>
                      <p className="classes-calendar-date">{formatBadgePrice(event.price)} {t.perPerson}</p>
                    </div>
                  </div>
                  <div className="classes-calendar-media"><img src={event.image} alt={event.title} /></div>
                </div>

                <div className="classes-calendar-mobile">
                  <h3 className="classes-calendar-mobile-name">{event.title}</h3>
                  <p className="classes-calendar-mobile-datetime">
                    <span className="classes-calendar-mobile-day">{event.date.split(" ")[0]} {getWeekday(event.date)}</span>
                    <span className="classes-calendar-mobile-time">{event.time}</span>
                  </p>
                  <div className="classes-calendar-mobile-body">
                    <div className="classes-calendar-mobile-text">
                      <p className="classes-calendar-mobile-summary">{event.summary}</p>
                      <p className="classes-calendar-mobile-meta"><span>{t.duration} <strong>{event.duration}</strong></span></p>
                      <p className="classes-calendar-mobile-meta"><span>{t.age} <strong>{event.age}</strong></span></p>
                      <p className="classes-calendar-mobile-meta"><span>{t.level} <strong>{event.level}</strong></span></p>
                    </div>
                    <div className="classes-calendar-mobile-media"><img src={event.image} alt={event.title} /></div>
                  </div>
                  <p className="classes-calendar-mobile-price">{formatBadgePrice(event.price)} {t.perPerson}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="classes-faq home-reveal classes-reveal" data-reveal="up">
        <div className="classes-main-container">
          <h2 className="classes-faq-title home-reveal classes-reveal" data-reveal="up">{t.faqTitle}</h2>
          <p className="classes-faq-subtitle home-reveal classes-reveal" data-reveal="up">{t.faqSubtitle}</p>
          <div className="classes-faq-layout home-reveal classes-reveal" data-reveal="up">
            <div className="classes-faq-photo home-reveal classes-reveal" data-reveal="scale"><img src={abNat} alt="Nataliia Spyrydonova" /></div>
            <div className="classes-faq-list">
              {t.faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <article key={item.question} className={`classes-faq-item${isOpen ? " is-open" : ""}`}>
                    <button type="button" className="classes-faq-question" onClick={() => setOpenFaqIndex((prev) => (prev === index ? -1 : index))} aria-expanded={isOpen}>
                      <span>{item.question}</span>
                      <span className="classes-faq-chevron" aria-hidden="true" />
                    </button>
                    <div className="classes-faq-answer-wrap"><p className="classes-faq-answer">{item.answer}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
