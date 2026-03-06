export default function Hero() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-title">
            «Живий Петриківський
            <br />
            розпис у сучасному житті»
          </h1>

          <p className="hero-subtitle">
            Авторські роботи та навчання від Nataliia Spyrydonova
          </p>

          <div className="hero-images">
            <div className="hero-card">
              <img src="/images/hero-shop.jpg" alt="магазин" />
              <span className="hero-chip">Магазин</span>
            </div>

            <div className="hero-card">
              <img src="/images/hero-classes.jpg" alt="майстер-класи" />
              <span className="hero-chip hero-chip--long">Майстер-класи</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== can-section ===== */}
      <section className="can-section">
        <div className="can-container">
          <h2 className="can-title">Тут ви можете:</h2>

          

          <div className="can-grid">
            <div className="can-card can-card--overlay">
              <img src={can1} alt="Замовити унікальні речі з ручним розписом" />
              <div className="can-overlay">
                <p className="can-overlay-text">
                  Замовити унікальні речі з ручним розписом
                </p>
              </div>
            </div>

            <div className="can-card can-card--overlay">
              <img src={can2} alt="Придбати авторські картини" />
              <div className="can-overlay">
                <p className="can-overlay-text">Придбати авторські картини</p>
              </div>
            </div>

            <div className="can-card can-card--overlay">
              <img src={can3} alt="Навчитися творити з нуля до шедевру" />
              <div className="can-overlay">
                <p className="can-overlay-text">
                  Навчитися творити з нуля до шедевру
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
