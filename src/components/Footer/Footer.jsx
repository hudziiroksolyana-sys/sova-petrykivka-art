import { Link } from "react-router-dom";

import logo from "../../assets/logo/logo.svg";
import facebookIcon from "../../assets/icons/facebook3.png";
import instagramIcon from "../../assets/icons/instagram3.png";
import emailIcon from "../../assets/icons/email.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-left">
          <div className="footer-lang">
            <button className="footer-langbtn is-active" type="button">
              UA
            </button>
            <button className="footer-langbtn" type="button">
              EN
            </button>
          </div>

          <nav className="footer-nav footer-nav--desktop">
            <Link className="footer-link" to="/about">Про нас</Link>
            <Link className="footer-link" to="/gallery">Галерея</Link>
            <Link className="footer-link" to="/shop">Магазин</Link>
            <Link className="footer-link" to="/contacts">Контакти</Link>
            <Link className="footer-link" to="/classes">Майстер-класи</Link>
          </nav>
        </div>

        {/* CENTER */}
        <div className="footer-center">
          <Link to="/" aria-label="Головна">
            <img className="footer-logo" src={logo} alt="sova" />
          </Link>
          <p className="footer-byline">by Nataliia Spyrydonova</p>
          <p className="footer-quote">
            "Петриківка — мистецтво,
            <br />
            що живе в серці України"
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
            Будьте в курсі новин Підпишіться на
            <br />
            оновлення та ексклюзивний контент
          </p>

          {/* EMAIL INPUT */}
          <form
            className="footer-subscribe"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="footer-inputrow">
              <input
                className="footer-input"
                type="email"
                placeholder="Email"
              />

              <button
                className="footer-send"
                type="submit"
                aria-label="send"
              >
                <img src={emailIcon} alt="" />
              </button>
            </div>
          </form>

          <button className="footer-submit" type="button">
            Надіслати
            <span className="footer-submitcircle" aria-hidden="true">
              <span className="footer-submitarrow">↗</span>
            </span>
          </button>

          <div className="footer-divider" />

          <nav className="footer-nav footer-nav--mobile">
            <Link className="footer-link" to="/about">Про нас</Link>
            <Link className="footer-link" to="/gallery">Галерея</Link>
            <Link className="footer-link" to="/shop">Магазин</Link>
            <Link className="footer-link" to="/contacts">Контакти</Link>
            <Link className="footer-link" to="/classes">Майстер-класи</Link>
          </nav>

          <p className="footer-socialtitle">Слідкуйте за нами</p>
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
    </footer>
  );
}
