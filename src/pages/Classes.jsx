import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import work1 from "../assets/image/Workshops/work1.jpg";
import work2 from "../assets/image/Workshops/work2.jpg";
import work3 from "../assets/image/Workshops/work3.jpg";
import work4 from "../assets/image/Workshops/work4.jpg";
import work5 from "../assets/image/Workshops/work5.jpg";
import abNat from "../assets/image/Workshops/abNat.jpg";

export default function Classes() {
  const location = useLocation();
  const classesRef = useRef(null);
  const workshops = [
    {
      id: 1,
      image: work1,
      title: "Основи Петриківського розпису",
      moreTitle: "Основи\nПетриківського розпису",
      intro:
        "Запрошуємо вас на атмосферний майстер-клас, де ви поринете у світ українського народного мистецтва — Петриківського розпису.",
      details:
        "Це не просто урок малювання — це знайомство з живою традицією, яка передавалась із покоління в покоління і сьогодні продовжує надихати митців по всьому світу.",
      atmosphere:
        "Майстер-клас проходить у теплій, творчій атмосфері, де немає критики, а є тільки підтримка, натхнення й любов до української культури. Ви зможете відволіктись від буденності, зняти напругу, розслабитись і провести час з користю для душі.",
      date: "11 серпня 2025",
      duration: "2 год",
      age: "+10",
      level: "Початковий",
      price: "1200 ₴",
    },
    {
      id: 2,
      image: work2,
      title: "Петриківський розпис на тканині",
      moreTitle: "Петриківський розпис\nна тканині",
      intro:
        "Запрошуємо вас на майстер-клас, де ви спробуєте перенести традиційний Петриківський розпис на тканину. Ви ознайомитесь із базовими елементами Петриківки — квітами, крапками та характерними мазками — і навчитесь гармонійно поєднувати їх у власній роботі.",
      details:
        "Це чудова можливість відчути матеріал, попрацювати з кольором і створити унікальний виріб своїми руками. Атмосфера заняття сприяє творчості, натхненню та спокійному зануренню у процес.",
      date: "17 серпня 2025",
      duration: "2 год",
      age: "+10",
      level: "Початковий",
      price: "600 ₴",
    },
    {
      id: 3,
      image: work3,
      title: "Квіти в стилі Петриківки",
      intro:
        "На цьому майстер-класі ви познайомитесь із базовими елементами Петриківського розпису — квітами, крапками та мазками. Особливу увагу приділимо побудові квіткових форм, плавності ліній та поєднанню кольорів.",
      details:
        "Заняття допоможе розвинути відчуття ритму, композиції та впевненості у роботі з пензлем. Ви створите власну квіткову композицію в стилі Петриківки та отримаєте задоволення від творчого процесу.",
      date: "18 серпня 2025",
      duration: "2 год",
      age: "+10",
      level: "Початковий",
      price: "900 ₴",
    },
    {
      id: 4,
      image: work4,
      title: "Ягоди та листя Петриківки",
      intro:
        "Майстер-клас присвячений рослинним мотивам Петриківського розпису — ягодам, листю та ритму композиції. Ви навчитесь передавати об’єм, легкість і характерні декоративні форми, які створюють живу та гармонійну роботу.",
      details:
        "У теплій творчій атмосфері ви крок за кроком опануєте нові елементи та складете власну композицію, зберігаючи традиційний стиль і водночас додаючи індивідуальність.",
      date: "20 серпня 2025",
      duration: "2 год",
      age: "+10",
      level: "Початковий",
      price: "900 ₴",
    },
    {
      id: 5,
      image: work5,
      title: "Орнамент і композиція Петриківки",
      intro:
        "Цей майстер-клас присвячений основам побудови орнаменту в стилі Петриківки. Ви розглянете різні види мазків, принципи балансу та створення завершеної композиції.",
      details:
        "Заняття допоможе зрозуміти, як окремі елементи поєднуються в єдину гармонійну роботу. Ви навчитесь відчувати ритм, симетрію та впевнено будувати орнаментальні форми.",
      date: "30 серпня 2025",
      duration: "2 год",
      age: "+10",
      level: "Початковий",
      price: "1200 ₴",
    },
  ];
  const calendarMonths = [
    {
      id: "august-2025",
      label: "Серпень 2025",
      events: [
        {
          id: "aug-1",
          title: "Основи Петриківського розпису",
          date: "11 серпня 2025",
          time: "11:00",
          summary: "Знайомство з базовими елементами Петриківки: квіти, крапки, мазки.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work1,
          price: "1200 ₴",
        },
        {
          id: "aug-2",
          title: "Петриківський розпис на тканині",
          date: "17 серпня 2025",
          time: "17:00",
          summary: "Знайомство з базовими елементами Петриківки: квіти, крапки, мазки.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work2,
          price: "600 ₴",
        },
        {
          id: "aug-3",
          title: "Квіти в стилі Петриківки",
          date: "18 серпня 2025",
          time: "10:00",
          summary: "Знайомство з базовими елементами Петриківки: квіти, крапки, мазки.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work3,
          price: "900 ₴",
        },
        {
          id: "aug-4",
          title: "Ягоди та листя Петриківки",
          date: "20 серпня 2025",
          time: "17:00",
          summary: "Знайомство з рослинними мотивами Петриківського розпису: ягоди, листя, ритм композиції.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work4,
          price: "900 ₴",
        },
        {
          id: "aug-5",
          title: "Орнамент і композиція Петриківки",
          date: "30 серпня 2025",
          time: "11:00",
          summary: "Основи побудови орнаменту в стилі Петриківки: мазки, баланс, завершена композиція.",
          duration: "2 год",
          age: "+12",
          level: "Початковий",
          image: work5,
          price: "1200 ₴",
        },
      ],
    },
    {
      id: "september-2025",
      label: "Вересень 2025",
      events: [
        {
          id: "sep-1",
          title: "Класичні квіти Петриківки",
          date: "7 вересня 2025",
          time: "11:30",
          summary: "Побудова квіткових форм, ритм мазка та гармонійне поєднання кольорів.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work3,
          price: "900 ₴",
        },
        {
          id: "sep-2",
          title: "Тканина та орнамент",
          date: "12 вересня 2025",
          time: "14:00",
          summary: "Практика розпису на тканині з акцентом на чистоту лінії та композицію.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work2,
          price: "700 ₴",
        },
        {
          id: "sep-3",
          title: "Рослинні мотиви: ягоди й листя",
          date: "15 вересня 2025",
          time: "12:00",
          summary: "Вчимося передавати об’єм ягід, легкість листя та декоративний ритм.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work4,
          price: "950 ₴",
        },
        {
          id: "sep-4",
          title: "Базові мазки для початківців",
          date: "21 вересня 2025",
          time: "10:30",
          summary: "Опановуємо базові мазки Петриківки та складаємо просту композицію.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work1,
          price: "1100 ₴",
        },
        {
          id: "sep-5",
          title: "Симетрія в орнаменті",
          date: "27 вересня 2025",
          time: "13:00",
          summary: "Робота з ритмом, симетрією та балансом елементів в орнаментальній формі.",
          duration: "2 год",
          age: "+12",
          level: "Початковий",
          image: work5,
          price: "1200 ₴",
        },
      ],
    },
    {
      id: "october-2025",
      label: "Жовтень 2025",
      events: [
        {
          id: "oct-1",
          title: "Осінній розпис: гілки та ягоди",
          date: "5 жовтня 2025",
          time: "12:00",
          summary: "Рослинні елементи та живі акценти кольору для осінніх композицій.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work4,
          price: "950 ₴",
        },
        {
          id: "oct-2",
          title: "Петриківські квіти на полотні",
          date: "10 жовтня 2025",
          time: "15:30",
          summary: "Квіткова композиція на полотні: від ескізу до завершеного результату.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work1,
          price: "1200 ₴",
        },
        {
          id: "oct-3",
          title: "Орнаментальні ритми",
          date: "16 жовтня 2025",
          time: "11:00",
          summary: "Ритм, повтор і баланс для цілісних орнаментальних композицій.",
          duration: "2 год",
          age: "+12",
          level: "Початковий",
          image: work5,
          price: "1250 ₴",
        },
        {
          id: "oct-4",
          title: "Текстильний декор у стилі Петриківки",
          date: "19 жовтня 2025",
          time: "13:30",
          summary: "Переносимо Петриківку на текстиль, працюємо з формою та ритмом елементів.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work2,
          price: "750 ₴",
        },
        {
          id: "oct-5",
          title: "Квіткова композиція за 2 години",
          date: "26 жовтня 2025",
          time: "11:30",
          summary: "Інтенсив із базових квіткових елементів та побудови завершеної композиції.",
          duration: "2 год",
          age: "+10",
          level: "Початковий",
          image: work3,
          price: "900 ₴",
        },
      ],
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const moreGridRef = useRef(null);
  const [moreAtStart, setMoreAtStart] = useState(true);
  const [moreAtEnd, setMoreAtEnd] = useState(false);
  const [activeCalendarMonth, setActiveCalendarMonth] = useState(calendarMonths[0].id);
  const faqItems = [
    {
      question: "1. Хто така Наталія Спиридонова?",
      answer:
        "Наталія — майстриня Петриківського розпису з багаторічним досвідом, авторка проекту «Sova», яка популяризує традиційне українське мистецтво через картини, предмети побуту та навчання.",
    },
    {
      question: "2. Що таке Петриківський розпис?",
      answer:
        "Це унікальна українська народна техніка декоративного розпису з особливими квітковими мотивами, що символізують природу і життя.",
    },
    {
      question: "3. Чи потрібен досвід для участі в майстер-класах?",
      answer:
        "Ні, наші заняття підходять для будь-якого рівня — від новачків до досвідчених художників.",
    },
    {
      question: "4. Які формати навчання пропонуєте?",
      answer:
        "Живі (офлайн) майстер-класи у майстерні та онлайн-курси, які можна проходити вдома.",
    },
    {
      question: "5. Як оформити замовлення?",
      answer:
        "Виберіть товар, додайте до кошика та перейдіть до оплати. Детальна інформація є у розділі «Оплата і доставка».",
    },
    {
      question: "6. Чи можна подарувати майстер-клас у подарунок?",
      answer: "Так, ми пропонуємо подарункові сертифікати на будь-які майстер-класи.",
    },
    {
      question: "7. Чи є обмеження за віком для участі в майстер-класах?",
      answer:
        "Наші заняття підходять для дітей від 10 років і дорослих. Для молодших дітей є окремі сімейні та дитячі майстер-класи.",
    },
  ];
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const activeWorkshop = workshops[activeIndex];
  const selectedCalendar = calendarMonths.find((month) => month.id === activeCalendarMonth) || calendarMonths[0];
  const formatBadgePrice = (priceValue) =>
    String(priceValue).replace(/\s{2,}/g, " ").trim();
  const parseDateParts = (dateValue) => {
    if (!dateValue) return null;
    const parts = dateValue.trim().split(/\s+/);
    if (parts.length < 3) return null;
    const [day, month, year] = parts;
    if (!day || !month || !year) return null;
    return { day, month, year };
  };
  const monthMap = {
    січня: 0,
    лютого: 1,
    березня: 2,
    квітня: 3,
    травня: 4,
    червня: 5,
    липня: 6,
    серпня: 7,
    вересня: 8,
    жовтня: 9,
    листопада: 10,
    грудня: 11,
  };
  const weekdayMap = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const getWeekdayFromUkDate = (dateValue) => {
    const parts = dateValue.trim().split(/\s+/);
    if (parts.length < 3) return "";
    const day = Number(parts[0]);
    const month = monthMap[parts[1]?.toLowerCase()];
    const year = Number(parts[2]);
    if (Number.isNaN(day) || Number.isNaN(year) || month === undefined) return "";
    const date = new Date(year, month, day, 12, 0, 0);
    return weekdayMap[date.getDay()] || "";
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const raf = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

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

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 50, 420)}ms`);
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

  useEffect(() => {
    const root = classesRef.current;
    if (!root) return undefined;

    const calendarItems = Array.from(root.querySelectorAll(".classes-calendar-reveal"));
    if (!calendarItems.length) return undefined;

    calendarItems.forEach((item, index) => {
      item.classList.remove("is-visible");
      item.style.setProperty("--reveal-delay", `${Math.min(index * 65, 360)}ms`);
    });

    const calendarObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            calendarObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    calendarItems.forEach((item) => calendarObserver.observe(item));

    return () => calendarObserver.disconnect();
  }, [activeCalendarMonth]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + workshops.length) % workshops.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % workshops.length);
  };

  const scrollMoreGrid = (direction) => {
    const grid = moreGridRef.current;
    if (!grid) return;
    const card = grid.querySelector(".classes-more-card");
    const cardWidth = card ? card.getBoundingClientRect().width : 0;
    const gap = 28;
    const delta = (cardWidth + gap) * direction;
    grid.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="classes-page" ref={classesRef}>
      <section className="classes-title home-reveal classes-reveal" data-reveal="up">
        <div className="classes-title-container">
          <h1 className="classes-title-text">Майстер-класи</h1>
          <p className="classes-title-subtitle">
            Створи щось красиве власноруч. Доторкнись до українського мистецтва.
          </p>
          <div className="classes-title-divider" />
        </div>
      </section>

      <section className="classes-main home-reveal classes-reveal" data-reveal="up">
        <div className="classes-main-container">
          <div className="classes-workshop-wrap">
            <button
              type="button"
              className="classes-nav-arrow classes-nav-arrow--left"
              onClick={goPrev}
              aria-label="Попередній майстер-клас"
            />
            <button
              type="button"
              className="classes-nav-arrow classes-nav-arrow--right"
              onClick={goNext}
              aria-label="Наступний майстер-клас"
            />

            <article key={activeWorkshop.id} className="classes-card home-reveal classes-reveal" data-reveal="scale">
            <div className="classes-media">
              <img src={activeWorkshop.image} alt={activeWorkshop.title} />
              {activeWorkshop.price && (
                <div className="classes-price-badge">{formatBadgePrice(activeWorkshop.price)}</div>
              )}

              <button type="button" className="classes-enroll bloghome-more">
                <span className="bloghome-moretext">Записатись</span>
                <span className="bloghome-morecircle" aria-hidden="true">
                  <span className="bloghome-morearrow">↗</span>
                </span>
              </button>
            </div>

            <div className="classes-content">
              <p className="classes-kicker">Майстер-клас:</p>
              <h2 className="classes-name">{activeWorkshop.title}</h2>

              <p className="classes-text">
                {activeWorkshop.intro}
              </p>
              <p className="classes-text">{activeWorkshop.details}</p>
              {activeWorkshop.atmosphere && (
                <p className="classes-text classes-text--spaced">
                  {activeWorkshop.atmosphere}
                </p>
              )}

              {activeWorkshop.date && <p className="classes-date">{activeWorkshop.date}</p>}
              <ul className="classes-meta">
                {activeWorkshop.duration && <li><span>Тривалість:</span> <strong>{activeWorkshop.duration}</strong></li>}
                {activeWorkshop.age && <li><span>Вік:</span> <strong>{activeWorkshop.age}</strong></li>}
                {activeWorkshop.level && <li><span>Рівень:</span> <strong>{activeWorkshop.level}</strong></li>}
              </ul>
            </div>
            </article>
          </div>
        </div>
      </section>

      <section className="classes-more home-reveal classes-reveal" data-reveal="up">
        <div className="classes-main-container">
          <h2 className="classes-more-title home-reveal classes-reveal" data-reveal="up">Більше:</h2>
          <div className="classes-more-viewport">
            <button
              type="button"
              className={`classes-more-arrow classes-more-arrow--left${moreAtStart ? " is-hidden" : ""}`}
              aria-label="Показати попередні майстер-класи"
              onClick={() => scrollMoreGrid(-1)}
            />
            <button
              type="button"
              className={`classes-more-arrow classes-more-arrow--right${moreAtEnd ? " is-hidden" : ""}`}
              aria-label="Показати наступні майстер-класи"
              onClick={() => scrollMoreGrid(1)}
            />

            <div ref={moreGridRef} className="classes-more-grid">
              {workshops.map((item) => (
                <article key={item.id} className="classes-more-card home-reveal classes-reveal" data-reveal="scale">
                  <div className="classes-more-media">
                    <img src={item.image} alt={item.title} />
                    {item.price && <span className="classes-more-price">{formatBadgePrice(item.price)}</span>}
                  </div>
                  <h3 className="classes-more-name">
                    {(() => {
                      const lines = (item.moreTitle || item.title).split("\n");
                      return lines.map((line, index) => (
                        <span key={`${item.id}-${index}`}>
                          {line}
                          {index < lines.length - 1 && <br />}
                        </span>
                      ));
                    })()}
                  </h3>
                  {item.date && (
                    (() => {
                      const parsedDate = parseDateParts(item.date);
                      if (!parsedDate) return <p className="classes-more-date">{item.date}</p>;
                      return (
                        <p className="classes-more-date" aria-label={`Дата: ${item.date}`}>
                          <span className="classes-more-date-day">{parsedDate.day}</span>
                          <span className="classes-more-date-sep" aria-hidden="true">
                            •
                          </span>
                          <span className="classes-more-date-meta">
                            <span className="classes-more-date-month">{parsedDate.month}</span>
                            <span className="classes-more-date-year">{parsedDate.year}</span>
                          </span>
                        </p>
                      );
                    })()
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="classes-calendar home-reveal classes-reveal" data-reveal="up">
        <div className="classes-main-container">
          <div className="classes-calendar-head home-reveal classes-reveal" data-reveal="up">
            <h2 className="classes-calendar-title home-reveal classes-reveal" data-reveal="up">Календар майстер-класів</h2>
            <p className="classes-calendar-subtitle home-reveal classes-reveal" data-reveal="up">Обери місяць і переглянь події</p>
          </div>

          <div className="classes-calendar-switch home-reveal classes-reveal" data-reveal="up" role="tablist" aria-label="Місяці календаря майстер-класів">
            {calendarMonths.map((month) => (
              <button
                key={month.id}
                type="button"
                role="tab"
                aria-selected={activeCalendarMonth === month.id}
                className={`classes-calendar-month${activeCalendarMonth === month.id ? " is-active" : ""}`}
                onClick={() => setActiveCalendarMonth(month.id)}
              >
                {month.label}
              </button>
            ))}
          </div>

          <div className="classes-calendar-grid">
            {selectedCalendar.events.map((event) => (
              <article key={event.id} className="classes-calendar-card home-reveal classes-calendar-reveal" data-reveal="up">
                <div className="classes-calendar-content">
                  <div className="classes-calendar-datebox" aria-label={`Дата ${event.date}`}>
                    <span className="classes-calendar-daynum">{event.date.split(" ")[0]}</span>
                    <span className="classes-calendar-weekday">{getWeekdayFromUkDate(event.date)}</span>
                  </div>
                  <div className="classes-calendar-info">
                    <div className="classes-calendar-headline">
                      <h3 className="classes-calendar-name">{event.title}</h3>
                      <span className="classes-calendar-time">{event.time}</span>
                    </div>
                    <p className="classes-calendar-summary">{event.summary}</p>
                    <p className="classes-calendar-meta">
                      <span>Тривалість: <strong>{event.duration}</strong></span>
                      <span>Вік: <strong>{event.age}</strong></span>
                      <span>Рівень: <strong>{event.level}</strong></span>
                    </p>
                    <p className="classes-calendar-date">{formatBadgePrice(event.price)} / за особу</p>
                  </div>
                </div>
                <div className="classes-calendar-media">
                  <img src={event.image} alt={event.title} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="classes-faq home-reveal classes-reveal" data-reveal="up">
        <div className="classes-main-container">
          <h2 className="classes-faq-title home-reveal classes-reveal" data-reveal="up">Про майстерню і Наталію</h2>
          <p className="classes-faq-subtitle home-reveal classes-reveal" data-reveal="up">Часті питання тут:</p>

          <div className="classes-faq-layout home-reveal classes-reveal" data-reveal="up">
            <div className="classes-faq-photo home-reveal classes-reveal" data-reveal="scale">
              <img src={abNat} alt="Наталія Спиридонова" />
            </div>

            <div className="classes-faq-list">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <article key={item.question} className={`classes-faq-item${isOpen ? " is-open" : ""}`}>
                    <button
                      type="button"
                      className="classes-faq-question"
                      onClick={() => setOpenFaqIndex((prev) => (prev === index ? -1 : index))}
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      <span className="classes-faq-chevron" aria-hidden="true" />
                    </button>
                    <div className="classes-faq-answer-wrap">
                      <p className="classes-faq-answer">{item.answer}</p>
                    </div>
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
