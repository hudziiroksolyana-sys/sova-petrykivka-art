import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import cartIcon from "../../assets/icons/cart.svg";
import heartIcon from "../../assets/icons/heart.svg";
import logo from "../../assets/logo/logo.svg";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";

export default function Header({ menuOpen, onMenuToggle }) {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language].header;

  const handleCartOpen = () => {
    if (location.pathname === "/shop") {
      window.dispatchEvent(new Event("sova:open-cart"));
      return;
    }
    navigate("/shop", { state: { openCart: true } });
  };

  useEffect(() => {
    const readCounts = () => {
      try {
        const cartRaw = JSON.parse(localStorage.getItem("sova:cart") || "[]");
        const cartCountValue = Array.isArray(cartRaw)
          ? cartRaw.reduce((sum, item) => {
            if (item && typeof item === "object") {
              return sum + (item.qty || 1);
            }
            return sum + 1;
          }, 0)
          : 0;
        setCartCount(cartCountValue);
      } catch {
        setCartCount(0);
      }
    };

    readCounts();
    window.addEventListener("storage", readCounts);
    window.addEventListener("sova:counts", readCounts);
    return () => {
      window.removeEventListener("storage", readCounts);
      window.removeEventListener("sova:counts", readCounts);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">

        <div className="header-left">
          <button
            className={`header-burger${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-label={t.menu}
            aria-expanded={menuOpen}
            onClick={onMenuToggle}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <Link to="/" className="logo" aria-label="home">
          <img src={logo} alt="sova" />
        </Link>

        <nav className="nav">
          <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            {t.about}
          </NavLink>

          <NavLink to="/shop" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            {t.shop}
          </NavLink>

          <NavLink to="/classes" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            {t.classes}
          </NavLink>

          <NavLink to="/gallery" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            {t.gallery}
          </NavLink>

          <NavLink to="/contacts" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            {t.contacts}
          </NavLink>
        </nav>

        <div className="actions">
          <button
            type="button"
            className="cart cart-trigger"
            onClick={handleCartOpen}
            aria-label={t.openCart}
          >
            <img src={cartIcon} alt="cart" />
            <span className="cart-badge">{cartCount}</span>
          </button>

          <button
            type="button"
            className="cart cart-trigger wishlist-trigger"
            onClick={() => navigate("/wishlist")}
            aria-label={t.openWishlist}
          >
            <img src={heartIcon} alt="favorites" />
          </button>
        </div>
      </div>
    </header>
  );
}
