import { useEffect, useMemo, useRef, useState } from "react";
import facebookIcon from "../assets/icons/facebook3.png";
import instagramIcon from "../assets/icons/instagram3.png";
import { sendLead } from "../lib/leadApi";
import { useLanguage } from "../context/LanguageContext";

const contactsText = {
  uk: {
    required: "Будь ласка, заповніть це поле.",
    invalidEmail: "Введіть коректну email адресу.",
    submitError: "Не вдалося надіслати повідомлення. Спробуйте ще раз.",
    subtitle: "Майстерня Петриківського розпису",
    contactTitle: "Зв’язок зі мною",
    contactText: ["Маєте запитання або пропозиції?", "Напишіть нам, і ми обов’язково відповімо якнайшвидше.", "Ми завжди раді зворотному зв’язку!"],
    address: "Адреса",
    addressValue: "Глазго, Шотландія. Точна адреса після бронювання.",
    phone: "Телефон",
    email: "Електронна пошта",
    follow: "Слідкуйте за нами",
    successTitle: "Дякуємо за повідомлення!",
    successText: "Ми отримали ваш запит і зв’яжемося з вами найближчим часом.",
    formTitle: "Надіслати повідомлення",
    firstName: "Ім'я",
    lastName: "Прізвище",
    subject: "Тема",
    message: "Коментар або повідомлення",
    sending: "Надсилаємо...",
    send: "Надіслати",
    quote: "НЕХАЙ ПЕТРИКІВСЬКИЙ РОЗПИС\nПРИНОСИТЬ ВАМ КРАСУ,\nСПОКІЙ І НАТХНЕННЯ.\nТВОРІТЬ І РАДІЙТЕ РАЗОМ З «SOVA»!",
    ring: "Відчуй магію Петриківки",
  },
  en: {
    required: "Please fill in this field.",
    invalidEmail: "Please enter a valid email address.",
    submitError: "Could not send the message. Please try again.",
    subtitle: "Petrykivka painting studio",
    contactTitle: "Get in touch",
    contactText: ["Have a question or an idea?", "Send us a message and we will get back to you as soon as possible.", "We are always happy to hear from you."],
    address: "Address",
    addressValue: "Glasgow, Scotland. Exact address is shared after booking.",
    phone: "Phone",
    email: "Email",
    follow: "Follow us",
    successTitle: "Thank you for your message!",
    successText: "We have received your request and will contact you shortly.",
    formTitle: "Send a message",
    firstName: "First name",
    lastName: "Last name",
    subject: "Subject",
    message: "Message",
    sending: "Sending...",
    send: "Send",
    quote: "MAY PETRYKIVKA PAINTING\nBRING YOU BEAUTY,\nPEACE, AND INSPIRATION.\nCREATE AND ENJOY WITH “SOVA”!",
    ring: "Feel the magic of Petrykivka",
  },
};

export default function Contacts() {
  const { language } = useLanguage();
  const t = useMemo(() => contactsText[language], [language]);
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
    document.body.classList.add("page-contacts");
    return () => {
      document.body.classList.remove("page-contacts");
    };
  }, []);

  useEffect(() => {
    const root = contactsRef.current;
    if (!root) return undefined;
    const revealItems = Array.from(root.querySelectorAll(".contacts-reveal"));
    if (!revealItems.length) return undefined;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (isMobile) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      setShowFormWithoutMotion(true);
      return undefined;
    }

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
    const fadeTimer = setTimeout(() => setIsSuccessFading(true), SUCCESS_HOLD_MS);
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
    if (!values.firstName.trim()) nextErrors.firstName = t.required;
    if (!values.lastName.trim()) nextErrors.lastName = t.required;
    if (!values.subject.trim()) nextErrors.subject = t.required;
    if (!values.message.trim()) nextErrors.message = t.required;
    if (!values.email.trim()) nextErrors.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = t.invalidEmail;
    return nextErrors;
  };

  const handleFieldValidate = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      const trimmedValue = value.trim();
      if (!trimmedValue) next[name] = t.required;
      else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) next[name] = t.invalidEmail;
      else delete next[name];
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
    } catch (error) {
      setSubmitError(error instanceof Error && error.message ? error.message : t.submitError);
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

  const quoteLines = t.quote.split("\n");
  const quoteChars = quoteLines.map((line) => [...line]);
  const quoteParticleDots = useMemo(() => {
    const count = 120;
    const seed = [...t.quote].reduce((acc, ch, index) => acc + ch.charCodeAt(0) * (index + 1), 0);
    const random = (n) => {
      const x = Math.sin((n + 1) * 12.9898 + seed * 0.001) * 43758.5453123;
      return x - Math.floor(x);
    };

    return Array.from({ length: count }, (_, index) => {
      const x = 6 + random(index * 3 + 1) * 88;
      const y = 8 + random(index * 3 + 2) * 84;
      const dx = (random(index * 3 + 3) - 0.5) * 32;
      const dy = (random(index * 3 + 4) - 0.5) * 26;
      const size = 1.4 + random(index * 3 + 5) * 2.2;
      const delay = 70 + random(index * 3 + 6) * 780;
      return { x, y, dx, dy, size, delay };
    });
  }, [t.quote]);
  let charCounter = -1;

  return (
    <div className="contacts-page" ref={contactsRef}>
      <section className="contacts-hero home-reveal contacts-reveal" data-reveal="up">
        <div className="contacts-hero-container home-reveal contacts-reveal" data-reveal="up">
          <h1 className="contacts-hero-brand">«Sova»</h1>
          <p className="contacts-hero-subtitle">{t.subtitle}</p>
        </div>
      </section>

      <section className="contacts-main home-reveal contacts-reveal" data-reveal="up">
        <div className="contacts-main-container">
          <div className="contacts-grid">
            <article className="contacts-info home-reveal contacts-reveal" data-reveal="up">
              <h2 className="contacts-info-title home-reveal contacts-reveal" data-reveal="up">{t.contactTitle}</h2>
              <p className="contacts-info-text home-reveal contacts-reveal" data-reveal="up">
                {t.contactText.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {line}
                    {index < t.contactText.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>

              <div className="contacts-info-list">
                <div className="contacts-info-item home-reveal contacts-reveal" data-reveal="up">
                  <div className="contacts-info-label">
                    <span className="contacts-info-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                    </span>
                    {t.address}
                  </div>
                  <p className="contacts-info-value">{t.addressValue}</p>
                </div>

                <div className="contacts-info-item home-reveal contacts-reveal" data-reveal="up">
                  <div className="contacts-info-label">
                    <span className="contacts-info-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M6.2 3.8l2.7 2.2a1.4 1.4 0 0 1 .3 1.8l-1.1 1.7a1 1 0 0 0 .1 1.2c1 1.4 2.1 2.6 3.5 3.6a1 1 0 0 0 1.2.1l1.7-1.1a1.4 1.4 0 0 1 1.8.3l2.2 2.7a1.5 1.5 0 0 1-.2 2.1l-1.6 1.3a3.2 3.2 0 0 1-3.2.5 20.3 20.3 0 0 1-10-10 3.2 3.2 0 0 1 .5-3.2l1.3-1.6a1.5 1.5 0 0 1 2.1-.2Z" fill="currentColor" />
                      </svg>
                    </span>
                    {t.phone}
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
                    {t.email}
                  </div>
                  <a className="contacts-info-link" href="mailto:spiridonova25@gmail.com">spiridonova25@gmail.com</a>
                </div>
              </div>

              <div className="contacts-social home-reveal contacts-reveal" data-reveal="up">
                <p className="contacts-social-title home-reveal contacts-reveal" data-reveal="up">{t.follow}</p>
                <div className="contacts-social-list home-reveal contacts-reveal" data-reveal="up">
                  <a className="contacts-social-link" href="https://www.facebook.com/@natalia.spiridonova.142/?http_ref=eyJ0cyI6MTc3MTQ0ODE1MjAwMCwiciI6IiJ9&hr=1&wtsid=rdr_1UoeZnzzI1m4FXZbR" aria-label="Facebook" target="_blank" rel="noreferrer">
                    <img src={facebookIcon} alt="" />
                  </a>
                  <a className="contacts-social-link" href="https://www.instagram.com/tasia_s._ova?igsh=MWs1eDIwOGdvaGtsZQ==" aria-label="Instagram" target="_blank" rel="noreferrer">
                    <img src={instagramIcon} alt="" />
                  </a>
                </div>
              </div>
            </article>

            <aside className={`contacts-form-card home-reveal contacts-reveal contacts-form-reveal is-visible${sent ? " is-success" : ""}${showFormWithoutMotion ? " no-reveal-motion" : ""}`} data-reveal="scale">
              {sent ? (
                <div className={`contacts-success${isSuccessFading ? " is-fading" : ""}`}>
                  <h3>{t.successTitle}</h3>
                  <p>{t.successText}</p>
                </div>
              ) : (
                <>
                  <h2 className="contacts-form-title contacts-form-reveal-item">{t.formTitle}</h2>
                  <form className="contacts-form" onSubmit={handleSubmit} noValidate>
                    <div className="contacts-form-row contacts-form-reveal-item">
                      <label>
                        {t.firstName}
                        <input type="text" name="firstName" aria-invalid={Boolean(errors.firstName)} className={errors.firstName ? "contacts-input-error" : ""} onChange={handleFieldValidate} onBlur={handleFieldValidate} />
                        {errors.firstName && <span className="contacts-field-error">{errors.firstName}</span>}
                      </label>
                      <label>
                        {t.lastName}
                        <input type="text" name="lastName" aria-invalid={Boolean(errors.lastName)} className={errors.lastName ? "contacts-input-error" : ""} onChange={handleFieldValidate} onBlur={handleFieldValidate} />
                        {errors.lastName && <span className="contacts-field-error">{errors.lastName}</span>}
                      </label>
                    </div>

                    <label className="contacts-form-reveal-item">
                      {t.email}
                      <input type="email" name="email" aria-invalid={Boolean(errors.email)} className={errors.email ? "contacts-input-error" : ""} onChange={handleFieldValidate} onBlur={handleFieldValidate} />
                      {errors.email && <span className="contacts-field-error">{errors.email}</span>}
                    </label>

                    <label className="contacts-form-reveal-item">
                      {t.subject}
                      <input type="text" name="subject" aria-invalid={Boolean(errors.subject)} className={errors.subject ? "contacts-input-error" : ""} onChange={handleFieldValidate} onBlur={handleFieldValidate} />
                      {errors.subject && <span className="contacts-field-error">{errors.subject}</span>}
                    </label>

                    <label className="contacts-form-reveal-item">
                      {t.message}
                      <textarea name="message" rows="6" aria-invalid={Boolean(errors.message)} className={errors.message ? "contacts-input-error" : ""} onChange={handleFieldValidate} onBlur={handleFieldValidate} />
                      {errors.message && <span className="contacts-field-error">{errors.message}</span>}
                    </label>

                    <button type="submit" className="contacts-submit contacts-form-reveal-item" disabled={isSubmitting}>
                      {isSubmitting ? t.sending : t.send}
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
            <span className="contacts-quote-particles" aria-hidden="true">
              {quoteParticleDots.map((dot, index) => (
                <span
                  key={`dot-${index}`}
                  className="contacts-quote-particle"
                  style={{
                    "--p-x": `${dot.x}%`,
                    "--p-y": `${dot.y}%`,
                    "--p-dx": `${dot.dx}px`,
                    "--p-dy": `${dot.dy}px`,
                    "--p-size": `${dot.size}px`,
                    "--p-delay": `${dot.delay}ms`,
                  }}
                />
              ))}
            </span>
            {quoteChars.map((lineChars, lineIndex) => (
              <span key={`line-${lineIndex}`} className="contacts-signoff-line">
                {lineChars.map((char, charIndex) => {
                  charCounter += 1;
                  const driftX = ((charCounter * 7) % 9) - 4;
                  const driftY = ((charCounter * 5) % 11) - 5;
                  return (
                    <span
                      key={`char-${lineIndex}-${charIndex}-${charCounter}`}
                      className="contacts-quote-char"
                      style={{
                        "--char-delay": `${charCounter * 18}ms`,
                        "--char-drift-x": `${driftX}px`,
                        "--char-drift-y": `${driftY}px`,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>
          <p className="contacts-signoff-byline">by Nataliia Spyrydonova</p>

          <div className="contacts-signoff-ring" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="contactsSignoffCirclePath" d=" M 32, 100 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0 " />
              </defs>
              <text>
                <textPath href="#contactsSignoffCirclePath" startOffset="0%" textAnchor="start" textLength="427" lengthAdjust="spacing">
                  {`${t.ring}·\u00A0`}
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
