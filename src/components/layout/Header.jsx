import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import cartIcon from "../../assets/icons/cart.svg";
import heartIcon from "../../assets/icons/heart.svg";
import logo from "../../assets/logo/logo.svg";

export default function Header({ menuOpen, onMenuToggle }) {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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
            aria-label="menu"
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
            Про нас
          </NavLink>

          <NavLink to="/shop" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            Магазин
          </NavLink>

          <NavLink to="/classes" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            Майстер-класи
          </NavLink>

          <NavLink to="/gallery" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            Галерея
          </NavLink>

          <NavLink to="/contacts" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            Контакти
          </NavLink>
        </nav>

        <div className="actions">
          <button
            type="button"
            className="cart cart-trigger"
            onClick={handleCartOpen}
            aria-label="Відкрити кошик"
          >
            <img src={cartIcon} alt="cart" />
            <span className="cart-badge">{cartCount}</span>
          </button>

          <button
            type="button"
            className="cart cart-trigger wishlist-trigger"
            onClick={() => navigate("/wishlist")}
            aria-label="Відкрити список бажань"
          >
            <img src={heartIcon} alt="favorites" />
          </button>
        </div>
      </div>
    </header>
  );
}
