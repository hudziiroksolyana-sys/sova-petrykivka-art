import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";

export default function Shop() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeProduct, setActiveProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeCategory, setActiveCategory] = useState("Всі");
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Map());
  const productsGridRef = useRef(null);

  const filteredProducts = activeCategory === "Всі"
    ? PRODUCTS
    : PRODUCTS.filter((item) => item.category === activeCategory);

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
        if (item?.id) {
          next.set(item.id, item.qty || 1);
        }
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
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = new Map(prev);
      next.delete(id);
      saveCart(next);
      return next;
    });
  };

  const changeCartQty = (id, delta) => {
    setCart((prev) => {
      const next = new Map(prev);
      const current = next.get(id) || 0;
      const updated = current + delta;
      if (updated <= 0) {
        next.delete(id);
      } else {
        next.set(id, updated);
      }
      saveCart(next);
      return next;
    });
  };

  const cartItems = Array.from(cart.entries())
    .map(([id, qty]) => {
      const product = PRODUCTS.find((item) => item.id === id);
      if (!product) return null;
      return { ...product, qty };
    })
    .filter(Boolean);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const parsePrice = (price) => Number(String(price).replace(/[^\d]/g, "")) || 0;
  const cartTotal = cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
  const formatPrice = (value) => `${new Intl.NumberFormat("uk-UA").format(value)} ₴`;

  const handleAddToCart = (id) => {
    addToCart(id);
    setActiveProduct(null);
  };

  const handleOpenRequest = () => {
    setActiveProduct(null);
    setIsCartOpen(false);
    navigate("/request");
  };

  useEffect(() => {
    const favs = loadFavorites();
    const cartData = loadCart();
    setFavorites(favs);
    setCart(cartData);
    syncCounts();
  }, []);

  useEffect(() => {
    const openCart = () => setIsCartOpen(true);
    window.addEventListener("sova:open-cart", openCart);
    return () => {
      window.removeEventListener("sova:open-cart", openCart);
    };
  }, []);

  useEffect(() => {
    if (!location.state?.openCart) return;
    setIsCartOpen(true);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!activeProduct && !isCartOpen) return undefined;

    const scrollY = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const headerEl = document.querySelector(".header");
    const previousHeaderPaddingRight = headerEl ? headerEl.style.paddingRight : "";
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      const gap = `${scrollbarWidth}px`;
      document.body.style.paddingRight = gap;
      if (headerEl) headerEl.style.paddingRight = gap;
    }

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;
      document.body.style.paddingRight = previousBodyPaddingRight;
      if (headerEl) headerEl.style.paddingRight = previousHeaderPaddingRight;
      if (window.location.pathname === "/shop") {
        window.scrollTo(0, scrollY);
      }
    };
  }, [activeProduct, isCartOpen]);

  useEffect(() => {
    const grid = productsGridRef.current;
    if (!grid) return undefined;

    const cards = Array.from(grid.querySelectorAll(".shop-card-reveal"));
    if (!cards.length) return undefined;

    cards.forEach((card, index) => {
      card.classList.remove("is-visible");
      card.style.setProperty("--shop-card-delay", `${Math.min(index * 70, 420)}ms`);
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
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    cards.forEach((card) => revealObserver.observe(card));

    return () => revealObserver.disconnect();
  }, [activeCategory, visibleCount]);

  return (
    <div className="shop-page">
      <section className="shop-title">
        <div className="shop-title-container">
          <h1 className="shop-title-text">Магазин «Sova»</h1>
          <p className="shop-title-subtitle">
            Авторський Петриківський розпис для дому,
            <br />
            подарунків і особливих подій
          </p>
          <div className="shop-title-divider" />
        </div>
      </section>

      <section className="shop-main">
        <div className="shop-main-container">
          <div className="shop-filters-row">
            <h2 className="shop-filter-title">Категорії товарів:</h2>
            <div className="shop-categories">
              {[
                "Всі",
                "Предмети побуту",
                "Картини",
                "Чашки",
                "Тарілки",
                "Скриньки",
                "Декор",
                "Панно",
              ].map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`shop-chip${activeCategory === label ? " is-active" : ""}`}
                  onClick={() => {
                    setActiveCategory(label);
                    setVisibleCount(12);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="shop-products-grid" ref={productsGridRef}>
            {filteredProducts.slice(0, visibleCount).map((item) => (
              <article key={item.id} className="shop-product-card shop-card-reveal">
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
                      onClick={() => handleAddToCart(item.id)}
                    >
                      <svg viewBox="0 0 19 19" aria-hidden="true">
                        <path d="M17.5996 7.03337L11.9329 0.601562M17.5996 7.03337H0.599609M17.5996 7.03337L16.3181 14.3061C15.965 16.3104 14.4145 17.753 12.6137 17.753H5.58554C3.78474 17.753 2.23428 16.3104 1.88112 14.3061L0.599609 7.03337M0.599609 7.03337L6.26628 0.601562" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="shop-product-more"
                  onClick={() => setActiveProduct(item)}
                >
                  Детальніше
                </button>
              </article>
            ))}
          </div>

          <div className="shop-loadmore">
            {filteredProducts.length === 0 && (
              <p className="shop-loadmore-note">Поки що немає товарів у цій категорії.</p>
            )}
            {visibleCount < filteredProducts.length && (
              <button
                type="button"
                className="shop-loadmore-btn bloghome-more"
                onClick={() => setVisibleCount((count) => Math.min(count + 3, filteredProducts.length))}
              >
                <span className="bloghome-moretext">Більше</span>
                <span className="bloghome-morecircle" aria-hidden="true">
                  <span className="bloghome-morearrow">↗</span>
                </span>
              </button>
            )}
            {filteredProducts.length > 0 && (
              <p className="shop-loadmore-note">
                {Math.min(visibleCount, filteredProducts.length)} із {filteredProducts.length}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="shop-section shop-section--cta">
        <div className="shop-section-container">
          <div className="shop-cta">
            <div>
              <h2 className="shop-cta-title">Хочете особливий розпис?</h2>
              <p className="shop-cta-text">
                Опишіть ідею, формат і кольори — ми запропонуємо ескіз і підберемо матеріали
              </p>
            </div>
            <button type="button" className="shop-cta-btn" onClick={handleOpenRequest}>Залишити заявку</button>
          </div>
        </div>
      </section>

      {activeProduct && (
        <div className="shop-modal" role="dialog" aria-modal="true">
          <div className="shop-modal-backdrop" onClick={() => setActiveProduct(null)} />
          <div className="shop-modal-card">
            <button
              type="button"
              className="shop-modal-close"
              onClick={() => setActiveProduct(null)}
              aria-label="Закрити"
            >
              <span className="shop-modal-close-line shop-modal-close-line--a" />
              <span className="shop-modal-close-line shop-modal-close-line--b" />
            </button>
            <div className="shop-modal-content">
              <div className="shop-modal-media">
                <img src={activeProduct.image} alt={activeProduct.title} />
              </div>
              <div className="shop-modal-info">
                <p className="shop-modal-kicker">{activeProduct.material}</p>
                <h2 className="shop-modal-title">{activeProduct.title}</h2>
                <p className={`shop-modal-stock${activeProduct.inStock === false ? " is-out" : ""}`}>
                  {activeProduct.inStock === false ? "Немає в наявності" : "В наявності"}
                </p>
                <p className="shop-modal-description">{activeProduct.description}</p>
                <ul className="shop-modal-list">
                  {activeProduct.details.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="shop-modal-footer">
                  <span className="shop-modal-price">{activeProduct.price}</span>
                  <div className="shop-modal-buttons">
                    {activeProduct.inStock === false ? (
                      <button type="button" className="shop-product-more shop-modal-request-btn" onClick={handleOpenRequest}>Залишити заявку</button>
                    ) : (
                      <button
                        type="button"
                        className="shop-btn shop-btn--primary shop-modal-cart-btn"
                        onClick={() => handleAddToCart(activeProduct.id)}
                      >
                        Додати до кошика
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isCartOpen && (
        <div className="shop-cart-modal" role="dialog" aria-modal="true" aria-label="Ваш кошик">
          <div className="shop-cart-backdrop" onClick={() => setIsCartOpen(false)} />
          <aside className="shop-cart-drawer">
            <button
              type="button"
              className="shop-modal-close shop-cart-close"
              onClick={() => setIsCartOpen(false)}
              aria-label="Закрити кошик"
            >
              <span className="shop-modal-close-line shop-modal-close-line--a" />
              <span className="shop-modal-close-line shop-modal-close-line--b" />
            </button>
            <h2 className="shop-cart-title">Ваш кошик</h2>
            {cartItems.length === 0 ? (
              <p className="shop-cart-empty">Кошик порожній.</p>
            ) : (
              <>
                <ul className="shop-cart-list">
                  {cartItems.map((item) => (
                    <li key={item.id} className="shop-cart-item">
                      <img src={item.image} alt={item.title} className="shop-cart-item-image" />
                      <div className="shop-cart-item-main">
                        <p className="shop-cart-item-material">{item.material}</p>
                        <p className="shop-cart-item-title">{item.title}</p>
                        <p className="shop-cart-item-meta">{item.details?.[0] || ""}</p>
                        <p className="shop-cart-item-price">{formatPrice(parsePrice(item.price) * item.qty)}</p>
                        <div className="shop-cart-item-actions">
                          <button
                            type="button"
                            className="shop-cart-item-remove"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Видалити
                          </button>
                          <div className="shop-cart-item-controls">
                            <button type="button" onClick={() => changeCartQty(item.id, -1)} aria-label="Зменшити">-</button>
                            <span>{item.qty}</span>
                            <button type="button" onClick={() => changeCartQty(item.id, 1)} aria-label="Збільшити">+</button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="shop-cart-footer">
                  <p className="shop-cart-total">
                    Загальна сума: <span className="shop-cart-total-value">{formatPrice(cartTotal)}</span>
                  </p>
                  <p className="shop-cart-count">Товарів: {cartCount}</p>
                </div>
                <button type="button" className="shop-cart-pay-btn" onClick={() => navigate("/checkout")}>
                  Оплатити
                </button>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
