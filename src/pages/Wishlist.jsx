import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";

export default function Wishlist() {
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Map());
  const navigate = useNavigate();

  const syncCounts = () => {
    window.dispatchEvent(new Event("sova:counts"));
  };

  const loadFavorites = () => {
    try {
      const raw = JSON.parse(localStorage.getItem("sova:favorites") || "[]");
      return new Set(Array.isArray(raw) ? raw : []);
    } catch {
      return new Set();
    }
  };

  const loadCart = () => {
    try {
      const raw = JSON.parse(localStorage.getItem("sova:cart") || "[]");
      if (!Array.isArray(raw)) return new Map();
      const next = new Map();
      raw.forEach((item) => {
        if (item?.id) next.set(item.id, item.qty || 1);
      });
      return next;
    } catch {
      return new Map();
    }
  };

  const saveFavorites = (next) => {
    localStorage.setItem("sova:favorites", JSON.stringify(Array.from(next)));
    syncCounts();
  };

  const saveCart = (next) => {
    const payload = Array.from(next.entries()).map(([id, qty]) => ({ id, qty }));
    localStorage.setItem("sova:cart", JSON.stringify(payload));
    syncCounts();
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveFavorites(next);
      return next;
    });
  };

  const addToCart = (id) => {
    setCart((prev) => {
      const next = new Map(prev);
      const current = next.get(id) || 0;
      next.set(id, current + 1);
      saveCart(next);
      return next;
    });
  };

  useEffect(() => {
    const read = () => {
      setFavorites(loadFavorites());
      setCart(loadCart());
    };

    read();
    window.addEventListener("storage", read);
    window.addEventListener("sova:counts", read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("sova:counts", read);
    };
  }, []);

  const favoriteItems = PRODUCTS.filter((item) => favorites.has(item.id));

  return (
    <div className="wishlist-page">
      <section className="wishlist-title-wrap">
        <div className="wishlist-title-container">
          <h1 className="wishlist-title">Список бажань</h1>
          <div className="wishlist-divider" />
        </div>
      </section>

      <section className="wishlist-main">
        <div className="wishlist-container">
          {favoriteItems.length === 0 ? (
            <div className="wishlist-empty">
              <p>У списку бажань поки немає товарів.</p>
              <button type="button" className="wishlist-continue bloghome-more" onClick={() => navigate("/shop")}>
                <span className="bloghome-moretext">Продовжити покупки</span>
                <span className="bloghome-morecircle" aria-hidden="true">
                  <span className="bloghome-morearrow">↗</span>
                </span>
              </button>
            </div>
          ) : (
            <>
              <div className="shop-products-grid wishlist-grid">
                {favoriteItems.map((item) => (
                  <article key={item.id} className="shop-product-card">
                    <div className="shop-product-meta">{item.material}</div>
                    <div className={item.id === 7 ? "shop-product-media shop-product-media--plain" : "shop-product-media"}>
                      <img
                        className={item.id === 7 ? "shop-product-image shop-product-image--cup" : "shop-product-image"}
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <h3 className="shop-product-title">
                      {(() => {
                        const [name, subtitle] = item.title.split(" «");
                        return subtitle ? (
                          <>
                            {name}
                            <br />
                            {"«" + subtitle}
                          </>
                        ) : item.title;
                      })()}
                    </h3>
                    <div className="shop-product-footer">
                      <span className="shop-product-price">{item.price}</span>
                      <div className="shop-product-actions">
                        <button
                          type="button"
                          className={`shop-icon-btn${favorites.has(item.id) ? " is-active" : ""}`}
                          aria-label="Улюблене"
                          aria-pressed={favorites.has(item.id)}
                          onClick={() => toggleFavorite(item.id)}
                        >
                          <svg viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M13.6903 0.601782C12.8779 0.59383 12.0767 0.801867 11.3615 1.20652C10.6462 1.61118 10.0401 2.19929 9.59961 2.9161C9.15909 2.19929 8.55299 1.61118 7.83774 1.20652C7.12248 0.801867 6.32133 0.59383 5.5089 0.601782C4.20953 0.604267 2.96389 1.14654 2.04405 2.11017C1.12422 3.07379 0.604929 4.38046 0.599609 5.74477C0.599609 10.8873 9.59961 18.6016 9.59961 18.6016C9.59961 18.6016 18.5996 10.8873 18.5996 5.74477C18.5943 4.38046 18.075 3.07379 17.1552 2.11017C16.2353 1.14654 14.9897 0.604267 13.6903 0.601782Z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className={`shop-icon-btn${(cart.get(item.id) || 0) > 0 ? " is-active" : ""}${item.inStock === false ? " is-disabled" : ""}`}
                          aria-label="Додати в кошик"
                          disabled={item.inStock === false}
                          onClick={() => addToCart(item.id)}
                        >
                          <svg viewBox="0 0 19 19" aria-hidden="true">
                            <path d="M17.5996 7.03337L11.9329 0.601562M17.5996 7.03337H0.599609M17.5996 7.03337L16.3181 14.3061C15.965 16.3104 14.4145 17.753 12.6137 17.753H5.58554C3.78474 17.753 2.23428 16.3104 1.88112 14.3061L0.599609 7.03337M0.599609 7.03337L6.26628 0.601562" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <button type="button" className="wishlist-continue bloghome-more" onClick={() => navigate("/shop")}>
                <span className="bloghome-moretext">Продовжити покупки</span>
                <span className="bloghome-morecircle" aria-hidden="true">
                  <span className="bloghome-morearrow">↗</span>
                </span>
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
