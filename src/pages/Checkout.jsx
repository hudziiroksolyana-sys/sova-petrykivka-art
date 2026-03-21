import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../data/products";
import { createWayForPayInvoice } from "../lib/paymentApi";
import { useLanguage } from "../context/LanguageContext";

const checkoutText = {
  uk: {
    paymentError: "Не вдалося перейти до оплати. Спробуйте ще раз.",
    breadcrumbs: "Навігація сторінки",
    shop: "Магазин",
    checkout: "Оформлення",
    title: "Оформлення замовлення",
    close: "Закрити",
    empty: "Кошик порожній.",
    backToShop: "Повернутися до магазину",
    remove: "Видалити",
    decrease: "Зменшити",
    increase: "Збільшити",
    summary: "Підсумок",
    total: "Загальна сума:",
    items: "Товарів:",
    paying: "Переходимо...",
    pay: "Оплатити",
  },
  en: {
    paymentError: "Could not proceed to payment. Please try again.",
    breadcrumbs: "Page navigation",
    shop: "Shop",
    checkout: "Checkout",
    title: "Checkout",
    close: "Close",
    empty: "Your cart is empty.",
    backToShop: "Back to shop",
    remove: "Remove",
    decrease: "Decrease",
    increase: "Increase",
    summary: "Summary",
    total: "Total:",
    items: "Items:",
    paying: "Redirecting...",
    pay: "Pay now",
  },
};

export default function Checkout() {
  const { language } = useLanguage();
  const products = useMemo(() => getProducts(language), [language]);
  const t = checkoutText[language];
  const navigate = useNavigate();
  const [cart, setCart] = useState(new Map());
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/shop");
  };

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
    setPaymentError("");
    setCart((prev) => {
      const next = new Map(prev);
      next.delete(id);
      saveCart(next);
      return next;
    });
  };

  const changeCartQty = (id, delta) => {
    setPaymentError("");
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
  const formatPrice = (value) => `${new Intl.NumberFormat(language === "en" ? "en-GB" : "uk-UA").format(value)} ₴`;

  const cartItems = useMemo(
    () => Array.from(cart.entries())
      .map(([id, qty]) => {
        const product = products.find((item) => item.id === id);
        if (!product) return null;
        return { ...product, qty };
      })
      .filter(Boolean),
    [cart, products],
  );

  const cartTotal = cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckoutPayment = async () => {
    if (!cartItems.length || isSubmittingPayment) return;

    setIsSubmittingPayment(true);
    setPaymentError("");

    try {
      const invoice = await createWayForPayInvoice({
        language: language === "en" ? "EN" : "UA",
        items: cartItems.map((item) => ({
          title: item.title,
          qty: item.qty,
          unitPrice: parsePrice(item.price),
        })),
      });

      window.location.href = invoice.invoiceUrl;
    } catch (error) {
      setPaymentError(error instanceof Error && error.message ? error.message : t.paymentError);
      setIsSubmittingPayment(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-shell">
        <nav className="checkout-breadcrumbs" aria-label={t.breadcrumbs}>
          <Link
            to="/shop"
            onClick={(event) => {
              event.preventDefault();
              goBack();
            }}
          >
            {t.shop}
          </Link>
          <span aria-hidden="true">›</span>
          <span>{t.checkout}</span>
        </nav>

        <div className="checkout-header">
          <h1 className="checkout-title">{t.title}</h1>
          <button type="button" className="checkout-close" aria-label={t.close} onClick={goBack}>
            <span className="shop-modal-close-line shop-modal-close-line--a" />
            <span className="shop-modal-close-line shop-modal-close-line--b" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="checkout-empty">
            <p>{t.empty}</p>
            <button type="button" className="checkout-pay" onClick={() => navigate("/shop")}>
              {t.backToShop}
            </button>
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
                      <button type="button" className="checkout-item-remove" onClick={() => removeFromCart(item.id)}>
                        {t.remove}
                      </button>
                      <div className="checkout-item-controls">
                        <button type="button" onClick={() => changeCartQty(item.id, -1)} aria-label={t.decrease}>-</button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => changeCartQty(item.id, 1)} aria-label={t.increase}>+</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="checkout-summary">
              <h2 className="checkout-summary-title">{t.summary}</h2>
              <p className="checkout-total">{t.total} <span>{formatPrice(cartTotal)}</span></p>
              <p className="checkout-count">{t.items} {cartCount}</p>
              {paymentError ? <p className="checkout-payment-error">{paymentError}</p> : null}
              <button type="button" className="checkout-pay" onClick={handleCheckoutPayment} disabled={isSubmittingPayment}>
                {isSubmittingPayment ? t.paying : t.pay}
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
