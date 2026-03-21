import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import cartIcon from "../../assets/icons/cart.svg";
import languageIcon from "../../assets/icons/language.svg";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";

export default function MobileMenu({ isOpen, onClose }) {
  const { language, setLanguage } = useLanguage();
  const headerText = translations[language].header;
  const menuText = translations[language].mobileMenu;
  const quoteLines = menuText.quote.split("\n");

  return (
    <div className={`mobilemenu ${isOpen ? "is-open" : ""}`} onClick={onClose}>
      <div className="mobilemenu-panel" onClick={(e) => e.stopPropagation()}>
        {/* TOP BAR */}
        <div className="mobilemenu-top">
          <button
            className="header-burger mobilemenu-close is-open"
            type="button"
            onClick={onClose}
            aria-label={menuText.close}
          >
            <span />
            <span />
          </button>

          <div className="mobilemenu-brand">
            <img src={logo} alt="sova" />
          </div>

          <div className="mobilemenu-cart">
            <img src={cartIcon} alt="cart" />
            <span className="cart-badge">0</span>
          </div>
        </div>

        <div className="mobilemenu-body">
          {/* DIVIDER */}
          <div className="mobilemenu-divider" />

          {/* LINKS */}
          <nav className="mobilemenu-links">
            <NavLink to="/" className="mobilemenu-link" onClick={onClose}>
              {headerText.home}
            </NavLink>
            <NavLink to="/about" className="mobilemenu-link" onClick={onClose}>
              {headerText.about}
            </NavLink>
            <NavLink to="/shop" className="mobilemenu-link" onClick={onClose}>
              {headerText.shop}
            </NavLink>
            <NavLink to="/classes" className="mobilemenu-link" onClick={onClose}>
              {headerText.classes}
            </NavLink>
            <NavLink to="/gallery" className="mobilemenu-link" onClick={onClose}>
              {headerText.gallery}
            </NavLink>
            <NavLink to="/contacts" className="mobilemenu-link" onClick={onClose}>
              {headerText.contacts}
            </NavLink>
            <NavLink to="/wishlist" className="mobilemenu-link" onClick={onClose}>
              {headerText.wishlist}
            </NavLink>
          </nav>

          {/* PUSH QUOTE LOWER */}
          <div className="mobilemenu-spacer" />

          {/* QUOTE + CIRCLE */}
          <div className="mobilemenu-quote">
            <div className="mobilemenu-quotes">“</div>

            <p className="mobilemenu-quoteText">
              {quoteLines.map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < quoteLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>

            <div className="mobilemenu-quoteRow">
              <div className="mobilemenu-quoteBy">by Nataliia Spyrydonova</div>

              <div className="mobilemenu-circle">
                <svg viewBox="0 0 200 200">
                  <defs>
                    <path
                      id="circlePathMobile"
                      d="
                        M 32, 100
                        a 68,68 0 1,1 136,0
                        a 68,68 0 1,1 -136,0
                      "
                    />
                  </defs>

                  <text>
                    <textPath
                      href="#circlePathMobile"
                      startOffset="0%"
                      textAnchor="start"
                      textLength="427"
                      lengthAdjust="spacing"
                    >
                      {`${menuText.circleText}·\u00A0`}
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* BOTTOM LANG */}
          <div className="mobilemenu-bottom">
            <div className="mobilemenu-lang">
              <img className="mobilemenu-langicon" src={languageIcon} alt="language" />
              <button
                className={language === "uk" ? "is-active" : ""}
                type="button"
                onClick={() => setLanguage("uk")}
              >
                UA
              </button>
              <button
                className={language === "en" ? "is-active" : ""}
                type="button"
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
