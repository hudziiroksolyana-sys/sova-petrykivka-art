import { useState } from "react";
import { sendLead } from "../lib/leadApi";

export default function Request() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = (values) => {
    const nextErrors = {};
    const requiredMessage = "Будь ласка, заповніть це поле.";

    if (!values.name.trim()) nextErrors.name = requiredMessage;
    const phoneDigits = values.phone.replace(/[^\d+]/g, "").replace(/\+/g, "");
    if (!values.phone.trim()) {
      nextErrors.phone = requiredMessage;
    } else if (phoneDigits.length < 10) {
      nextErrors.phone = "Вкажіть коректний номер телефону.";
    }
    if (!values.details.trim()) nextErrors.details = requiredMessage;

    return nextErrors;
  };

  const handleFieldValidate = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      if (!value.trim()) {
        next[name] = "Будь ласка, заповніть це поле.";
      } else if (name === "phone") {
        const phoneDigits = value.replace(/[^\d+]/g, "").replace(/\+/g, "");
        if (phoneDigits.length < 10) {
          next[name] = "Вкажіть коректний номер телефону.";
        } else {
          delete next[name];
        }
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
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      details: String(formData.get("details") || ""),
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
        formType: "request",
        page: "/request",
        name: values.name,
        phone: values.phone,
        format: String(formData.get("format") || ""),
        details: values.details,
      });
    } catch {
      setSubmitError("Не вдалося надіслати заявку. Спробуйте ще раз.");
      setIsSubmitting(false);
      return;
    }

    setErrors({});
    setSent(true);
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <div className="request-page">
      <section className="request-hero">
        <div className="request-hero-container">
          <h1 className="request-title">Залишити заявку</h1>
          <p className="request-subtitle">
            Розкажіть про вашу ідею, бажаний формат і кольори. Ми підготуємо ескіз та зв’яжемося з вами.
          </p>
          <div className="request-divider" />
        </div>
      </section>

      <section className="request-main">
        <div className="request-main-container">
          <div className="request-card">
            {sent ? (
              <div className="request-success">
                <h2>Дякуємо за заявку!</h2>
                <p>Ми отримали ваш запит і зв’яжемося з вами найближчим часом.</p>
              </div>
            ) : (
              <form className="request-form" onSubmit={handleSubmit} noValidate>
                <label>
                  Ім’я
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше ім’я"
                    aria-invalid={Boolean(errors.name)}
                    className={errors.name ? "request-input-error" : ""}
                    onChange={handleFieldValidate}
                    onBlur={handleFieldValidate}
                  />
                  {errors.name && <span className="request-field-error">{errors.name}</span>}
                </label>

                <label>
                  Телефон
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+380"
                    aria-invalid={Boolean(errors.phone)}
                    className={errors.phone ? "request-input-error" : ""}
                    onChange={handleFieldValidate}
                    onBlur={handleFieldValidate}
                  />
                  {errors.phone && <span className="request-field-error">{errors.phone}</span>}
                </label>

                <label>
                  Формат виробу
                  <input type="text" name="format" placeholder="Наприклад: тарілка, панно, шкатулка" />
                </label>

                <label>
                  Опис ідеї
                  <textarea
                    name="details"
                    rows="5"
                    placeholder="Опишіть побажання щодо розпису"
                    aria-invalid={Boolean(errors.details)}
                    className={errors.details ? "request-input-error" : ""}
                    onChange={handleFieldValidate}
                    onBlur={handleFieldValidate}
                  />
                  {errors.details && <span className="request-field-error">{errors.details}</span>}
                </label>

                <button type="submit" className="request-submit" disabled={isSubmitting}>
                  {isSubmitting ? "Надсилаємо..." : "Надіслати заявку"}
                </button>
                {submitError ? <p className="request-submit-error">{submitError}</p> : null}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
