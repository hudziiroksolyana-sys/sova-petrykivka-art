import { Link, Navigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { legalPages, legalPageOrder } from "../lib/legalPages";

const legalUiText = {
  uk: {
    aria: "Навігація сторінки",
    home: "Головна",
    legal: "Інформація",
    updated: "Актуальна інформація для користувачів сайту SOVA.",
  },
  en: {
    aria: "Page navigation",
    home: "Home",
    legal: "Information",
    updated: "Current information for SOVA website users.",
  },
};

export default function LegalPage() {
  const { slug } = useParams();
  const { language } = useLanguage();

  if (!slug || !legalPageOrder.includes(slug)) {
    return <Navigate to="/" replace />;
  }

  const page = legalPages[slug]?.[language];
  const ui = legalUiText[language];

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="legal-page">
      <div className="legal-shell">
        <nav className="legal-breadcrumbs" aria-label={ui.aria}>
          <Link to="/">{ui.home}</Link>
          <span aria-hidden="true">›</span>
          <span>{page.title}</span>
        </nav>

        <header className="legal-header">
          <span className="legal-kicker">{ui.legal}</span>
          <h1 className="legal-title">{page.title}</h1>
          <p className="legal-intro">{page.intro}</p>
          <p className="legal-note">{ui.updated}</p>
        </header>

        <div className="legal-sections">
          {page.sections.map((section) => (
            <section key={section.title} className="legal-section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
