import { useEffect, useRef, useState } from "react";
import facebookIcon from "../assets/icons/facebook3.png";
import instagramIcon from "../assets/icons/instagram3.png";
import { sendLead } from "../lib/leadApi";

export default function Contacts() {
  const SUCCESS_HOLD_MS = 3000;
  const SUCCESS_FADE_MS = 700;
  const contactsRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [isSuccessFading, setIsSuccessFading] = useState(false);
  const [showFormWithoutMotion, setShowFormWithoutMotion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const root = contactsRef.current;
    if (!root) return undefined;

    const revealItems = Array.from(root.querySelectorAll(".contacts-reveal"));
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

  useEffect(() => {
    if (!sent) return undefined;

    const fadeTimer = setTimeout(() => {
      setIsSuccessFading(true);
    }, SUCCESS_HOLD_MS);

    const resetTimer = setTimeout(() => {
      setSent(false);
      setIsSuccessFading(false);
      setShowFormWithoutMotion(true);
    }, SUCCESS_HOLD_MS + SUCCESS_FADE_MS + 80);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(resetTimer);
    };
  }, [sent]);

  const validateForm = (values) => {
    const nextErrors = {};
    const requiredMessage = "Будь ласка, заповніть це поле.";

    if (!values.firstName.trim()) nextErrors.firstName = requiredMessage;
    if (!values.lastName.trim()) nextErrors.lastName = requiredMessage;
    if (!values.subject.trim()) nextErrors.subject = requiredMessage;
    if (!values.message.trim()) nextErrors.message = requiredMessage;

    if (!values.email.trim()) {
      nextErrors.email = requiredMessage;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Введіть коректну email адресу.";
    }

    return nextErrors;
  };

  const handleFieldValidate = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        next[name] = "Будь ласка, заповніть це поле.";
      } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        next[name] = "Введіть коректну email адресу.";
      } else {
        delete next[name];
      }

      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };
    const nextErrors = validateForm(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await sendLead({
        formType: "contacts",
        page: "/contacts",
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });
    } catch {
      setSubmitError("Не вдалося надіслати повідомлення. Спробуйте ще раз.");
      setIsSubmitting(false);
      return;
    }

    setErrors({});
    setShowFormWithoutMotion(false);
    setIsSuccessFading(false);
    setSent(true);
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <div className="contacts-page" ref={contactsRef}>
      <section className="contacts-hero home-reveal contacts-reveal" data-reveal="up">
        <div className="contacts-hero-container home-reveal contacts-reveal" data-reveal="up">
          <h1 className="contacts-hero-brand">«Sova»</h1>
          <p className="contacts-hero-subtitle">Майстерня Петриківського розпису</p>
        </div>
      </section>

      <section className="contacts-main home-reveal contacts-reveal" data-reveal="up">
        <div className="contacts-main-container">
          <div className="contacts-grid">
            <article className="contacts-info home-reveal contacts-reveal" data-reveal="up">
              <h2 className="contacts-info-title home-reveal contacts-reveal" data-reveal="up">Зв’язок зі мною</h2>
              <p className="contacts-info-text home-reveal contacts-reveal" data-reveal="up">
                Маєте запитання або пропозиції?
                <br />
                Напишіть нам, і ми обов’язково відповімо якнайшвидше.
                <br />
                Ми завжди раді зворотному зв’язку!
              </p>

              <div className="contacts-info-list">
                <div className="contacts-info-item home-reveal contacts-reveal" data-reveal="up">
                  <div className="contacts-info-label">
                    <span className="contacts-info-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                    </span>
                    Адреса
                  </div>
                  <p className="contacts-info-value">Глазго, Шотландія. Точна адреса після бронювання.</p>
                </div>

                <div className="contacts-info-item home-reveal contacts-reveal" data-reveal="up">
                  <div className="contacts-info-label">
                    <span className="contacts-info-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6.2 3.8l2.7 2.2a1.4 1.4 0 0 1 .3 1.8l-1.1 1.7a1 1 0 0 0 .1 1.2c1 1.4 2.1 2.6 3.5 3.6a1 1 0 0 0 1.2.1l1.7-1.1a1.4 1.4 0 0 1 1.8.3l2.2 2.7a1.5 1.5 0 0 1-.2 2.1l-1.6 1.3a3.2 3.2 0 0 1-3.2.5 20.3 20.3 0 0 1-10-10 3.2 3.2 0 0 1 .5-3.2l1.3-1.6a1.5 1.5 0 0 1 2.1-.2Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    Телефон
                  </div>
                  <a className="contacts-info-link" href="tel:+447500482995">+44 7500 482995</a>
                </div>

                <div className="contacts-info-item home-reveal contacts-reveal" data-reveal="up">
                  <div className="contacts-info-label">
                    <span className="contacts-info-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Zm2.15-.5L12 11.2 18.85 7H5.15Z" />
                      </svg>
                    </span>
                    Електронна пошта
                  </div>
                  <a className="contacts-info-link" href="mailto:spiridonova25@gmail.com">
                    spiridonova25@gmail.com
                  </a>
                </div>
              </div>

              <div className="contacts-social home-reveal contacts-reveal" data-reveal="up">
                <p className="contacts-social-title home-reveal contacts-reveal" data-reveal="up">Слідкуйте за нами</p>
                <div className="contacts-social-list home-reveal contacts-reveal" data-reveal="up">
                  <a
                    className="contacts-social-link"
                    href="https://www.facebook.com/@natalia.spiridonova.142/?http_ref=eyJ0cyI6MTc3MTQ0ODE1MjAwMCwiciI6IiJ9&hr=1&wtsid=rdr_1UoeZnzzI1m4FXZbR"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={facebookIcon} alt="" />
                  </a>
                  <a
                    className="contacts-social-link"
                    href="https://www.instagram.com/tasia_s._ova?igsh=MWs1eDIwOGdvaGtsZQ=="
                    aria-label="Instagram"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={instagramIcon} alt="" />
                  </a>
                </div>
              </div>
            </article>

            <aside
              className={`contacts-form-card home-reveal contacts-reveal contacts-form-reveal is-visible${sent ? " is-success" : ""}${showFormWithoutMotion ? " no-reveal-motion" : ""}`}
              data-reveal="scale"
            >
              {sent ? (
                <div className={`contacts-success${isSuccessFading ? " is-fading" : ""}`}>
                  <h3>Дякуємо за повідомлення!</h3>
                  <p>Ми отримали ваш запит і зв’яжемося з вами найближчим часом.</p>
                </div>
              ) : (
                <>
                  <h2 className="contacts-form-title contacts-form-reveal-item">Надіслати повідомлення</h2>
                  <form className="contacts-form" onSubmit={handleSubmit} noValidate>
                    <div className="contacts-form-row contacts-form-reveal-item">
                      <label>
                        Ім&apos;я
                        <input
                          type="text"
                          name="firstName"
                          aria-invalid={Boolean(errors.firstName)}
                          className={errors.firstName ? "contacts-input-error" : ""}
                          onChange={handleFieldValidate}
                          onBlur={handleFieldValidate}
                        />
                        {errors.firstName && <span className="contacts-field-error">{errors.firstName}</span>}
                      </label>
                      <label>
                        Прізвище
                        <input
                          type="text"
                          name="lastName"
                          aria-invalid={Boolean(errors.lastName)}
                          className={errors.lastName ? "contacts-input-error" : ""}
                          onChange={handleFieldValidate}
                          onBlur={handleFieldValidate}
                        />
                        {errors.lastName && <span className="contacts-field-error">{errors.lastName}</span>}
                      </label>
                    </div>

                    <label className="contacts-form-reveal-item">
                      Електронна пошта
                      <input
                        type="email"
                        name="email"
                        aria-invalid={Boolean(errors.email)}
                        className={errors.email ? "contacts-input-error" : ""}
                        onChange={handleFieldValidate}
                        onBlur={handleFieldValidate}
                      />
                      {errors.email && <span className="contacts-field-error">{errors.email}</span>}
                    </label>

                    <label className="contacts-form-reveal-item">
                      Тема
                      <input
                        type="text"
                        name="subject"
                        aria-invalid={Boolean(errors.subject)}
                        className={errors.subject ? "contacts-input-error" : ""}
                        onChange={handleFieldValidate}
                        onBlur={handleFieldValidate}
                      />
                      {errors.subject && <span className="contacts-field-error">{errors.subject}</span>}
                    </label>

                    <label className="contacts-form-reveal-item">
                      Коментар або повідомлення
                      <textarea
                        name="message"
                        rows="6"
                        aria-invalid={Boolean(errors.message)}
                        className={errors.message ? "contacts-input-error" : ""}
                        onChange={handleFieldValidate}
                        onBlur={handleFieldValidate}
                      />
                      {errors.message && <span className="contacts-field-error">{errors.message}</span>}
                    </label>

                    <button type="submit" className="contacts-submit contacts-form-reveal-item" disabled={isSubmitting}>
                      {isSubmitting ? "Надсилаємо..." : "Надіслати"}
                    </button>
                    {submitError ? <p className="contacts-submit-error contacts-form-reveal-item">{submitError}</p> : null}
                  </form>
                </>
              )}
            </aside>
          </div>
        </div>
      </section>

      <section className="contacts-signoff home-reveal contacts-reveal" data-reveal="up">
        <div className="contacts-signoff-container home-reveal contacts-reveal" data-reveal="up">
          <p className="contacts-signoff-mark" aria-hidden="true">“</p>
          <h2 className="contacts-signoff-quote">
            НЕХАЙ ПЕТРИКІВСЬКИЙ РОЗПИС
            <br />
            ПРИНОСИТЬ ВАМ КРАСУ,
            <br />
            СПОКІЙ І НАТХНЕННЯ.
            <br />
            ТВОРІТЬ І РАДІЙТЕ РАЗОМ З «SOVA»!
          </h2>
          <p className="contacts-signoff-byline">by Nataliia Spyrydonova</p>

          <div className="contacts-signoff-ring" aria-hidden="true">
            <svg viewBox="0 0 248 248">
              <defs>
                <path
                  id="contactsSignoffCirclePath"
                  d="M124,124 m-95,0 a95,95 0 1,1 190,0 a95,95 0 1,1 -190,0"
                />
              </defs>
              <text>
                <textPath
                  href="#contactsSignoffCirclePath"
                  startOffset="50%"
                  textAnchor="middle"
                  textLength="565"
                  lengthAdjust="spacing"
                >
                  <tspan className="contacts-signoff-ring__black">Відчуй магію </tspan>
                  <tspan className="contacts-signoff-ring__white">Петриківки ·</tspan>
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </section>

    </div>
  );
}
