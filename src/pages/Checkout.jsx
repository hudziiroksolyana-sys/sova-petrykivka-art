import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(new Map());

  const syncCounts = () => {
    window.dispatchEvent(new Event("sova:counts"));
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

  const saveCart = (next) => {
    const payload = Array.from(next.entries()).map(([id, qty]) => ({ id, qty }));
    localStorage.setItem("sova:cart", JSON.stringify(payload));
    syncCounts();
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
      if (updated <= 0) next.delete(id);
      else next.set(id, updated);
      saveCart(next);
      return next;
    });
  };

  useEffect(() => {
    const read = () => setCart(loadCart());
    read();
    window.addEventListener("storage", read);
    window.addEventListener("sova:counts", read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("sova:counts", read);
    };
  }, []);

  const parsePrice = (price) => Number(String(price).replace(/[^\d]/g, "")) || 0;
  const formatPrice = (value) => `${new Intl.NumberFormat("uk-UA").format(value)} ₴`;

  const cartItems = useMemo(
    () => Array.from(cart.entries())
      .map(([id, qty]) => {
        const product = PRODUCTS.find((item) => item.id === id);
        if (!product) return null;
        return { ...product, qty };
      })
      .filter(Boolean),
    [cart],
  );

  const cartTotal = cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="checkout-page">
      <div className="checkout-shell">
        <div className="checkout-header">
          <button type="button" className="checkout-back" onClick={() => navigate("/shop")}>← Магазин</button>
          <h1 className="checkout-title">Оформлення замовлення</h1>
          <button
            type="button"
            className="checkout-close"
            aria-label="Закрити"
            onClick={() => navigate("/shop")}
          >
            <span className="shop-modal-close-line shop-modal-close-line--a" />
            <span className="shop-modal-close-line shop-modal-close-line--b" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="checkout-empty">
            <p>Кошик порожній.</p>
            <button type="button" className="checkout-pay" onClick={() => navigate("/shop")}>Повернутися до магазину</button>
          </div>
        ) : (
          <div className="checkout-layout">
            <ul className="checkout-list">
              {cartItems.map((item) => (
                <li key={item.id} className="checkout-item">
                  <img src={item.image} alt={item.title} className="checkout-item-image" />
                  <div className="checkout-item-main">
                    <p className="checkout-item-material">{item.material}</p>
                    <h2 className="checkout-item-title">{item.title}</h2>
                    <p className="checkout-item-meta">{item.details?.[0] || ""}</p>
                    <p className="checkout-item-price">{formatPrice(parsePrice(item.price) * item.qty)}</p>
                    <div className="checkout-item-actions">
                      <button type="button" className="checkout-item-remove" onClick={() => removeFromCart(item.id)}>Видалити</button>
                      <div className="checkout-item-controls">
                        <button type="button" onClick={() => changeCartQty(item.id, -1)} aria-label="Зменшити">-</button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => changeCartQty(item.id, 1)} aria-label="Збільшити">+</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="checkout-summary">
              <h2 className="checkout-summary-title">Підсумок</h2>
              <p className="checkout-total">Загальна сума: <span>{formatPrice(cartTotal)}</span></p>
              <p className="checkout-count">Товарів: {cartCount}</p>
              <button type="button" className="checkout-pay">Оплатити</button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
