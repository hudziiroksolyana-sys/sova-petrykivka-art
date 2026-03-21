import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo/logo.svg";
import facebookIcon from "../../assets/icons/facebook3.png";
import instagramIcon from "../../assets/icons/instagram3.png";
import emailIcon from "../../assets/icons/email.svg";
import { sendLead } from "../../lib/leadApi";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";
import { legalPageOrder } from "../../lib/legalPages";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const { language, setLanguage } = useLanguage();
  const headerText = translations[language].header;
  const footerText = translations[language].footer;

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!validateEmail(normalizedEmail)) {
      setFeedback({ type: "error", message: footerText.invalidEmail });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      await sendLead({
        formType: "footer-subscribe",
        page: typeof window !== "undefined" ? window.location.pathname : "/",
        email: normalizedEmail,
      });
      setFeedback({ type: "success", message: footerText.subscribeSuccess });
      setEmail("");
    } catch (error) {
      const fallback = footerText.subscribeError;
      const message = error instanceof Error && error.message ? error.message : fallback;
      setFeedback({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-left">
          <div className="footer-lang">
            <button
              className={`footer-langbtn${language === "uk" ? " is-active" : ""}`}
              type="button"
              onClick={() => handleLanguageChange("uk")}
            >
              UA
            </button>
            <button
              className={`footer-langbtn${language === "en" ? " is-active" : ""}`}
              type="button"
              onClick={() => handleLanguageChange("en")}
            >
              EN
            </button>
          </div>

          <nav className="footer-nav footer-nav--desktop">
            <Link className="footer-link" to="/about">{headerText.about}</Link>
            <Link className="footer-link" to="/gallery">{headerText.gallery}</Link>
            <Link className="footer-link" to="/shop">{headerText.shop}</Link>
            <Link className="footer-link" to="/contacts">{headerText.contacts}</Link>
            <Link className="footer-link" to="/classes">{headerText.classes}</Link>
          </nav>

        </div>

        {/* CENTER */}
        <div className="footer-center">
          <Link to="/" aria-label={footerText.homeAria}>
            <img className="footer-logo" src={logo} alt="sova" />
          </Link>
          <p className="footer-byline">by Nataliia Spyrydonova</p>
          <p className="footer-quote">
            {footerText.quote.split("\n").map((line, index, lines) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <div className="footer-social footer-social--desktop">
            <a className="footer-socialitem" href="https://www.facebook.com/@natalia.spiridonova.142/?http_ref=eyJ0cyI6MTc3MTQ0ODE1MjAwMCwiciI6IiJ9&hr=1&wtsid=rdr_1UoeZnzzI1m4FXZbR" aria-label="facebook" target="_blank" rel="noreferrer">
              <span className="footer-socialiconwrap">
                <img className="footer-socialicon" src={facebookIcon} alt="" />
              </span>
              <span>Facebook</span>
            </a>

            <a className="footer-socialitem" href="https://www.instagram.com/tasia_s._ova?igsh=MWs1eDIwOGdvaGtsZQ==" aria-label="instagram" target="_blank" rel="noreferrer">
              <span className="footer-socialiconwrap">
                <img className="footer-socialicon" src={instagramIcon} alt="" />
              </span>
              <span>Instagram</span>
            </a>
          </div>

          <p className="footer-note footer-note--desktop">
            {footerText.note.split("\n").map((line, index, lines) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>

          {/* EMAIL INPUT */}
          <form
            className="footer-subscribe"
            id="footer-subscribe-form"
            onSubmit={handleSubmit}
          >
            <div className="footer-inputrow">
              <input
                className="footer-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label={footerText.inputLabel}
                aria-invalid={feedback.type === "error"}
                disabled={isSubmitting}
              />

              <button
                className="footer-send"
                type="submit"
                aria-label="send"
                disabled={isSubmitting}
              >
                <img src={emailIcon} alt="" />
              </button>
            </div>
          </form>

          {feedback.message ? (
            <p className={`footer-feedback${feedback.type === "error" ? " footer-feedback--error" : ""}`}>
              {feedback.message}
            </p>
          ) : null}

          <button className="footer-submit" type="submit" form="footer-subscribe-form" disabled={isSubmitting}>
            {isSubmitting ? footerText.submitting : footerText.submit}
            <span className="footer-submitcircle" aria-hidden="true">
              <span className="footer-submitarrow">↗</span>
            </span>
          </button>

          <div className="footer-divider" />

          <nav className="footer-nav footer-nav--mobile">
            <Link className="footer-link" to="/about">{headerText.about}</Link>
            <Link className="footer-link" to="/gallery">{headerText.gallery}</Link>
            <Link className="footer-link" to="/shop">{headerText.shop}</Link>
            <Link className="footer-link" to="/contacts">{headerText.contacts}</Link>
            <Link className="footer-link" to="/classes">{headerText.classes}</Link>
          </nav>

          <p className="footer-socialtitle">{footerText.followUs}</p>
          <div className="footer-social footer-social--icons">
            <a className="footer-socialicononly" href="https://www.facebook.com/@natalia.spiridonova.142/?http_ref=eyJ0cyI6MTc3MTQ0ODE1MjAwMCwiciI6IiJ9&hr=1&wtsid=rdr_1UoeZnzzI1m4FXZbR" aria-label="facebook" target="_blank" rel="noreferrer">
              <span className="footer-socialiconwrap">
                <img className="footer-socialicon" src={facebookIcon} alt="" />
              </span>
            </a>
            <a className="footer-socialicononly" href="https://www.instagram.com/tasia_s._ova?igsh=MWs1eDIwOGdvaGtsZQ==" aria-label="instagram" target="_blank" rel="noreferrer">
              <span className="footer-socialiconwrap">
                <img className="footer-socialicon" src={instagramIcon} alt="" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-legalbar">
        <p className="footer-legalbar-title">{footerText.legalTitle}</p>
        <nav className="footer-legalbar-links" aria-label={footerText.legalTitle}>
          {legalPageOrder.map((slug) => (
            <Link key={slug} className="footer-legalbar-link" to={`/legal/${slug}`}>
              {footerText.legalLinks[slug]}
            </Link>
          ))}
        </nav>
        <p className="footer-legalbar-copy">{footerText.copyright}</p>
      </div>
    </footer>
  );
}
