import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sendLead } from "../lib/leadApi";
import work1 from "../assets/image/Workshops/work1.jpg";
import { useLanguage } from "../context/LanguageContext";

const requestContent = {
  uk: {
    defaultWorkshop: {
      title: "Основи Петриківського розпису",
      image: work1,
      intro:
        "Запрошуємо вас на атмосферний майстер-клас, де ви поринете у світ українського народного мистецтва — Петриківського розпису.",
      details:
        "Це не просто урок малювання — це знайомство з живою традицією, яка передавалась із покоління в покоління і сьогодні продовжує надихати митців по всьому світу.",
      atmosphere:
        "Майстер-клас проходить у теплій, творчій атмосфері, де немає критики, а є тільки підтримка, натхнення й любов до української культури. Ви зможете відволіктись від буденності, зняти напругу, розслабитись і провести час з користю для душі.",
      date: "11 серпня 2025",
      time: "11:00",
      duration: "2 год",
      age: "+10",
      level: "Початковий",
      price: "1200 ₴",
    },
    benefits: [
      "Усі матеріали вже включені у вартість.",
      "Підійде навіть тим, хто ніколи не малював.",
      "Підтвердимо запис і деталі участі особисто після заявки.",
    ],
    steps: [
      "Ви залишаєте коротку заявку.",
      "Ми підтверджуємо наявність місця.",
      "Надсилаємо всі деталі участі особисто.",
    ],
    required: "Заповніть поле.",
    invalidEmail: "Вкажіть коректний email.",
    invalidPhone: "Вкажіть коректний номер.",
    submitError: "Не вдалося надіслати заявку. Спробуйте ще раз.",
    pageNav: "Навігація сторінки",
    classes: "Майстер-класи",
    book: "Записатись",
    eyebrow: "Запис на майстер-клас",
    subtitle: "Оберіть майстер-клас, залиште контакти, а ми підтвердимо участь.",
    price: "Вартість",
    workshop: "Майстер-клас",
    duration: "Тривалість:",
    age: "Вік:",
    level: "Рівень:",
    requestTitle: "Заявка на участь",
    bookingNoPay: "Бронювання без оплати",
    date: "Дата",
    time: "Час",
    personPrice: "Ціна за особу",
    next: "Що далі",
    continue: "Продовжити",
    allEvents: "Перегляньте всі події тут",
    modalLabel: "Бронювання майстер-класу",
    close: "Закрити",
    customerData: "Дані клієнта",
    confirmation: "Підтвердження",
    enterData: "Введіть ваші дані",
    firstName: "Ім'я",
    lastName: "Прізвище",
    email: "Електронна пошта",
    phone: "Телефон",
    comment: "Коментар",
    workshopLabel: "Майстер-клас:",
    dateLabel: "Дата:",
    timeLabel: "Час:",
    quantityQuestion: "Скільки місць ви хочете забронювати?",
    decrease: "Зменшити",
    increase: "Збільшити",
    total: "Загалом:",
    name: "Ім'я:",
    phoneLabel: "Телефон:",
    quantity: "Кількість місць:",
    commentLabel: "Коментар:",
    format: "Формат:",
    requestFormat: "Запит на участь без онлайн-оплати",
    sending: "Надсилаємо...",
    sendRequest: "Надіслати запит",
    thankYou: "ДЯКУЄМО!",
    success: "Ваш запит на участь успішно надіслано.",
    newRequest: "Нова заявка",
  },
  en: {
    defaultWorkshop: {
      title: "Basics of Petrykivka Painting",
      image: work1,
      intro:
        "Join a welcoming workshop and step into the world of Ukrainian folk art through Petrykivka painting.",
      details:
        "This is more than a painting lesson. It is an introduction to a living tradition that continues to inspire artists across generations.",
      atmosphere:
        "The workshop takes place in a warm, creative atmosphere filled with support, inspiration, and love for Ukrainian culture. It is a chance to slow down, relax, and enjoy meaningful creative time.",
      date: "11 August 2025",
      time: "11:00",
      duration: "2 hrs",
      age: "+10",
      level: "Beginner",
      price: "1200 ₴",
    },
    benefits: [
      "All materials are already included in the price.",
      "Perfect even if you have never painted before.",
      "We will confirm your booking and send the details personally after your request.",
    ],
    steps: [
      "You leave a short request.",
      "We confirm availability.",
      "We send you all the details personally.",
    ],
    required: "Please fill in this field.",
    invalidEmail: "Please enter a valid email.",
    invalidPhone: "Please enter a valid phone number.",
    submitError: "Could not send your request. Please try again.",
    pageNav: "Page navigation",
    classes: "Workshops",
    book: "Book now",
    eyebrow: "Workshop booking",
    subtitle: "Choose a workshop, leave your contact details, and we will confirm your participation.",
    price: "Price",
    workshop: "Workshop",
    duration: "Duration:",
    age: "Age:",
    level: "Level:",
    requestTitle: "Booking request",
    bookingNoPay: "Reserve now, pay later",
    date: "Date",
    time: "Time",
    personPrice: "Price per person",
    next: "What happens next",
    continue: "Continue",
    allEvents: "View all events here",
    modalLabel: "Workshop booking",
    close: "Close",
    customerData: "Customer details",
    confirmation: "Confirmation",
    enterData: "Enter your details",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    comment: "Comment",
    workshopLabel: "Workshop:",
    dateLabel: "Date:",
    timeLabel: "Time:",
    quantityQuestion: "How many seats would you like to book?",
    decrease: "Decrease",
    increase: "Increase",
    total: "Total:",
    name: "Name:",
    phoneLabel: "Phone:",
    quantity: "Number of seats:",
    commentLabel: "Comment:",
    format: "Format:",
    requestFormat: "Booking request without online payment",
    sending: "Sending...",
    sendRequest: "Send request",
    thankYou: "THANK YOU!",
    success: "Your participation request has been sent successfully.",
    newRequest: "New request",
  },
};

const createEmptyForm = () => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  comment: "",
});

const parsePriceValue = (priceValue) => {
  const numeric = String(priceValue || "").replace(/[^\d]/g, "");
  return Number(numeric || 0);
};

export default function Request() {
  const { language } = useLanguage();
  const t = requestContent[language];
  const location = useLocation();
  const workshop = useMemo(() => location.state?.workshop || t.defaultWorkshop, [location.state, t.defaultWorkshop]);
  const basePrice = useMemo(() => parsePriceValue(workshop.price), [workshop.price]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState(createEmptyForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = basePrice * quantity;

  useEffect(() => {
    if (!isBookingOpen) return undefined;
    const scrollY = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isBookingOpen]);

  const openBooking = () => {
    setIsBookingOpen(true);
    setBookingStep(1);
    setSubmitError("");
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setBookingStep(1);
    setSubmitError("");
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validateStepOne = () => {
    const nextErrors = {};
    if (!formData.firstName.trim()) nextErrors.firstName = t.required;
    if (!formData.lastName.trim()) nextErrors.lastName = t.required;
    if (!formData.email.trim()) nextErrors.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = t.invalidEmail;

    const phoneDigits = formData.phone.replace(/[^\d]/g, "");
    if (!formData.phone.trim()) nextErrors.phone = t.required;
    else if (phoneDigits.length < 10) nextErrors.phone = t.invalidPhone;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateStepOne()) return;
    setBookingStep(2);
  };

  const handleSubmitRequest = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await sendLead({
        formType: "workshop-request",
        page: "/request",
        workshopTitle: workshop.title,
        workshopDate: workshop.date,
        workshopTime: workshop.time || "",
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        format: language === "en" ? `${quantity} participant(s)` : `${quantity} учасник(и)`,
        details: `${language === "en" ? "Email" : "Email"}: ${formData.email}; ${language === "en" ? "Comment" : "Коментар"}: ${formData.comment || "—"}; ${language === "en" ? "Approx. total" : "Сума орієнтовно"}: ${totalPrice} грн`,
      });
      setBookingStep(3);
    } catch (error) {
      setSubmitError(error instanceof Error && error.message ? error.message : t.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBookingFlow = () => {
    setBookingStep(1);
    setFormData(createEmptyForm());
    setErrors({});
    setSubmitError("");
    setQuantity(1);
    setIsSubmitting(false);
  };

  const handleQuantityChange = (nextQuantity) => {
    setQuantity(Math.min(9, Math.max(1, nextQuantity)));
  };

  return (
    <div className="request-page">
      <section className="request-hero">
        <div className="request-shell">
          <nav className="request-breadcrumbs" aria-label={t.pageNav}>
            <Link to="/classes">{t.classes}</Link>
            <span aria-hidden="true">›</span>
            <span>{t.book}</span>
          </nav>

          <div className="request-topbar">
            <div className="request-topbar-copy">
              <span className="request-eyebrow">{t.eyebrow}</span>
              <h1 className="request-title">{workshop.title}</h1>
              <p className="request-subtitle">{t.subtitle}</p>
            </div>

            <div className="request-price-pill">
              <span className="request-price-label">{t.price}</span>
              <strong>{workshop.price}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="request-main">
        <div className="request-shell">
          <div className="request-grid">
            <article className="request-story">
              <div className="request-story-media">
                <img src={workshop.image} alt={workshop.title} />
                <div className="request-story-price">{workshop.price}</div>
                <div className="request-story-badge">
                  <span>{workshop.date}</span>
                  {workshop.time ? <strong>{workshop.time}</strong> : null}
                </div>
              </div>

              <div className="request-story-content">
                <div className="request-story-head">
                  <span className="request-card-kicker">{t.workshop}</span>
                  <h2 className="request-story-title">{workshop.title}</h2>
                </div>

                <div className="request-story-copy request-story-copy--lead">
                  <p>{workshop.intro}</p>
                </div>

                <div className="request-story-meta" aria-label={t.workshop}>
                  <p><strong>{t.duration}</strong> {workshop.duration}</p>
                  <p><strong>{t.age}</strong> {workshop.age}</p>
                  <p><strong>{t.level}</strong> {workshop.level}</p>
                </div>

                <div className="request-benefits">
                  {t.benefits.map((item) => (
                    <div key={item} className="request-benefit">{item}</div>
                  ))}
                </div>
              </div>
            </article>

            <aside className="request-card">
              <div className="request-card-head">
                <span className="request-card-kicker">{t.requestTitle}</span>
                <h2>{t.bookingNoPay}</h2>
              </div>

              <div className="request-summary">
                <div className="request-summary-row"><span>{t.date}</span><strong>{workshop.date}</strong></div>
                <div className="request-summary-row"><span>{t.time}</span><strong>{workshop.time}</strong></div>
                <div className="request-summary-row"><span>{t.personPrice}</span><strong>{workshop.price}</strong></div>
              </div>

              <div className="request-card-flow">
                <span className="request-card-flow-title">{t.next}</span>
                <div className="request-card-flow-list">
                  {t.steps.map((item, index) => (
                    <div key={item} className="request-card-flow-item">
                      <span className="request-card-flow-index">{index + 1}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button type="button" className="request-submit" onClick={openBooking}>{t.continue}</button>
            </aside>
          </div>

          <div className="request-all-events">
            <Link to="/classes" className="request-all-events-link">{t.allEvents}</Link>
          </div>
        </div>
      </section>

      {isBookingOpen ? (
        <div className="request-modal-overlay" role="dialog" aria-modal="true" aria-label={t.modalLabel} onClick={closeBooking}>
          <div className="request-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="request-modal-close" onClick={closeBooking} aria-label={t.close}>
              <span className="request-modal-close-line request-modal-close-line--a" />
              <span className="request-modal-close-line request-modal-close-line--b" />
            </button>

            <div className="request-modal-scroll">
              {bookingStep < 3 ? (
                <>
                  <div className="request-steps request-steps--compact">
                    {[1, 2].map((step) => {
                      const isDone = bookingStep > step;
                      const isActive = bookingStep === step;
                      return (
                        <div key={step} className={`request-step${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}`}>
                          <span className="request-step-line" aria-hidden="true" />
                          <span className="request-step-dot" aria-hidden="true">{isDone ? "✓" : ""}</span>
                          <span className="request-step-line" aria-hidden="true" />
                          <span className="request-step-label">{step === 1 ? t.customerData : t.confirmation}</span>
                        </div>
                      );
                    })}
                  </div>

                  {bookingStep === 1 ? (
                    <div className="request-modal-body">
                      <h2 className="request-modal-title">{t.enterData}</h2>
                      <div className="request-modal-divider" />

                      <div className="request-booking-grid">
                        <label>
                          {t.firstName}
                          <input type="text" name="firstName" value={formData.firstName} onChange={handleFieldChange} className={errors.firstName ? "request-input-error" : ""} />
                          {errors.firstName ? <span className="request-field-error">{errors.firstName}</span> : null}
                        </label>
                        <label>
                          {t.lastName}
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleFieldChange} className={errors.lastName ? "request-input-error" : ""} />
                          {errors.lastName ? <span className="request-field-error">{errors.lastName}</span> : null}
                        </label>
                      </div>

                      <label className="request-booking-field">
                        {t.email}
                        <input type="email" name="email" value={formData.email} onChange={handleFieldChange} className={errors.email ? "request-input-error" : ""} />
                        {errors.email ? <span className="request-field-error">{errors.email}</span> : null}
                      </label>

                      <label className="request-booking-field">
                        {t.phone}
                        <input type="tel" name="phone" value={formData.phone} onChange={handleFieldChange} className={errors.phone ? "request-input-error" : ""} />
                        {errors.phone ? <span className="request-field-error">{errors.phone}</span> : null}
                      </label>

                      <label className="request-booking-field">
                        {t.comment}
                        <input type="text" name="comment" value={formData.comment} onChange={handleFieldChange} />
                      </label>

                      <div className="request-booking-summary">
                        <p><strong>{t.workshopLabel}</strong> {workshop.title}</p>
                        <p><strong>{t.dateLabel}</strong> {workshop.date}</p>
                        <p><strong>{t.timeLabel}</strong> {workshop.time} ({workshop.duration})</p>
                      </div>

                      <div className="request-quantity">
                        <div><span className="request-quantity-label">{t.quantityQuestion}</span></div>
                        <div className="request-quantity-controls">
                          <button type="button" onClick={() => handleQuantityChange(quantity - 1)} aria-label={t.decrease}>−</button>
                          <span>{quantity}</span>
                          <button type="button" onClick={() => handleQuantityChange(quantity + 1)} aria-label={t.increase}>+</button>
                        </div>
                      </div>

                      <div className="request-modal-footer">
                        <p className="request-total">{t.total} <strong>{totalPrice} грн</strong></p>
                        <button type="button" className="request-modal-action bloghome-more" onClick={handleContinue}>
                          <span className="bloghome-moretext">{t.continue}</span>
                          <span className="bloghome-morecircle" aria-hidden="true"><span className="bloghome-morearrow">↗</span></span>
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {bookingStep === 2 ? (
                    <div className="request-modal-body">
                      <h2 className="request-modal-title">{t.confirmation}</h2>
                      <div className="request-modal-divider" />

                      <div className="request-confirmation">
                        <p><strong>{t.workshopLabel}</strong> {workshop.title}</p>
                        <p><strong>{t.dateLabel}</strong> {workshop.date}</p>
                        <p><strong>{t.timeLabel}</strong> {workshop.time} ({workshop.duration})</p>
                        <p><strong>{t.name}</strong> {formData.firstName} {formData.lastName}</p>
                        <p><strong>{t.email}:</strong> {formData.email}</p>
                        <p><strong>{t.phoneLabel}</strong> {formData.phone}</p>
                        <p><strong>{t.quantity}</strong> {quantity}</p>
                        {formData.comment ? <p><strong>{t.commentLabel}</strong> {formData.comment}</p> : null}
                        <p><strong>{t.format}</strong> {t.requestFormat}</p>
                      </div>

                      {submitError ? <p className="request-submit-error">{submitError}</p> : null}

                      <div className="request-modal-footer">
                        <p className="request-total">{t.total} <strong>{totalPrice} грн</strong></p>
                        <button type="button" className="request-modal-action bloghome-more" onClick={handleSubmitRequest} disabled={isSubmitting}>
                          <span className="bloghome-moretext">{isSubmitting ? t.sending : t.sendRequest}</span>
                          <span className="bloghome-morecircle" aria-hidden="true"><span className="bloghome-morearrow">↗</span></span>
                        </button>
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="request-success-screen">
                  <div className="request-success-mark" aria-hidden="true">✓</div>
                  <h2>{t.thankYou}</h2>
                  <p>{t.success}</p>
                  <div className="request-success-actions">
                    <button type="button" className="request-modal-action bloghome-more" onClick={closeBooking}>
                      <span className="bloghome-moretext">{t.close}</span>
                      <span className="bloghome-morecircle" aria-hidden="true"><span className="bloghome-morearrow">↗</span></span>
                    </button>
                    <button type="button" className="request-modal-secondary" onClick={resetBookingFlow}>{t.newRequest}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
