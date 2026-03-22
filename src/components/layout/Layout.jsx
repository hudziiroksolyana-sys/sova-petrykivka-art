import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";

import Header from "./Header";
import Footer from "../Footer/Footer";
import MobileMenu from "./MobileMenu";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";
import { getPosts } from "../../data/posts";

const SITE_URL = "https://sova-petrykivka-art.vercel.app";
const DEFAULT_OG_IMAGE = `${SITE_URL}/android-chrome-512x512.png`;

const pageMeta = {
  uk: {
    "/": {
      title: "Петриківський розпис SOVA - майстер-класи, галерея, замовлення",
      description:
        "Петриківський розпис від майстерні SOVA: авторські вироби, живі й онлайн майстер-класи, галерея робіт та індивідуальні замовлення.",
      type: "website",
    },
    "/about": {
      title: "Про нас - майстерня Петриківського розпису SOVA",
      description:
        "Історія майстерні SOVA, символи Петриківського розпису, засновниця Наталія Спиридонова та філософія традиції в сучасному дизайні.",
      type: "website",
    },
    "/classes": {
      title: "Майстер-класи з Петриківського розпису - SOVA",
      description:
        "Майстер-класи з Петриківського розпису для початківців і досвідчених: матеріали, програма, формати навчання та запис.",
      type: "website",
    },
    "/gallery": {
      title: "Галерея робіт - Петриківський розпис SOVA",
      description:
        "Галерея авторських робіт у техніці Петриківського розпису: орнаменти, символи, сучасні композиції та приклади виконаних замовлень.",
      type: "website",
    },
    "/shop": {
      title: "Купити вироби з Петриківським розписом - SOVA",
      description:
        "Авторські вироби з Петриківським розписом: декоративні та практичні речі ручної роботи. Доставка по Україні та світу.",
      type: "website",
    },
    "/contacts": {
      title: "Контакти - SOVA Petrykivka Art",
      description: "Зв'язатися з майстернею SOVA: консультація, замовлення розпису, запис на майстер-клас та співпраця.",
      type: "website",
    },
  },
  en: {
    "/": {
      title: "SOVA Petrykivka Painting - workshops, gallery, custom orders",
      description:
        "Petrykivka painting by SOVA: hand-painted artworks, workshops, gallery, and custom-made pieces inspired by Ukrainian tradition.",
      type: "website",
    },
    "/about": {
      title: "About SOVA - Petrykivka Painting Studio",
      description:
        "Discover SOVA studio, its founder, the symbols of Petrykivka painting, and how Ukrainian tradition meets contemporary design.",
      type: "website",
    },
    "/classes": {
      title: "Petrykivka Painting Workshops - SOVA",
      description:
        "Join Petrykivka painting workshops for beginners and advanced learners. Learn techniques, symbols, and composition step by step.",
      type: "website",
    },
    "/gallery": {
      title: "Gallery - SOVA Petrykivka Art",
      description: "Explore SOVA gallery of original Petrykivka artworks, ornaments, floral motifs, and modern painted compositions.",
      type: "website",
    },
    "/shop": {
      title: "Shop Hand-Painted Petrykivka Art - SOVA",
      description: "Buy hand-painted Petrykivka items by SOVA. Unique gifts and decor inspired by Ukrainian folk painting.",
      type: "website",
    },
    "/contacts": {
      title: "Contacts - SOVA Petrykivka Art",
      description: "Contact SOVA for custom painting orders, workshop booking, and collaboration inquiries.",
      type: "website",
    },
  },
};

function ensureMeta(selector, attrName, attrValue) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  return el;
}

function ensureCanonical() {
  let link = document.head.querySelector("link[rel='canonical']");
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  return link;
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();
  const layoutText = translations[language].layout;

  useEffect(() => {
    if (!menuOpen) return undefined;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (isMobile) {
      return undefined;
    }

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
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    setMenuOpen(false);

    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    bodyStyle.overflow = "";
    bodyStyle.position = "";
    bodyStyle.top = "";
    bodyStyle.left = "";
    bodyStyle.right = "";
    bodyStyle.width = "";
    bodyStyle.paddingRight = "";
    htmlStyle.overflow = "";
    htmlStyle.position = "";
    htmlStyle.height = "";

    const headerEl = document.querySelector(".header");
    if (headerEl) {
      headerEl.style.paddingRight = "";
    }

    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = previous;
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    const path = location.pathname || "/";
    const canonicalUrl = `${SITE_URL}${path}`;
    const posts = getPosts(language);
    const blogSlug = path.startsWith("/blog/") ? path.replace("/blog/", "") : "";
    const blogPost = blogSlug ? posts.find((item) => item.slug === blogSlug) : null;
    const metaByLang = pageMeta[language] || pageMeta.uk;
    const fallbackMeta = metaByLang["/"];

    const computedMeta = blogPost
      ? {
          title: `${blogPost.title} - SOVA Petrykivka Art`,
          description: blogPost.introText,
          type: "article",
          image: blogPost.cover,
        }
      : metaByLang[path] || fallbackMeta;

    const robotsValue = path === "/checkout" || path === "/wishlist" ? "noindex,nofollow" : "index,follow";

    document.title = computedMeta.title;
    document.documentElement.lang = language === "uk" ? "uk" : "en";

    ensureMeta("meta[name='description']", "name", "description").setAttribute("content", computedMeta.description);
    ensureMeta("meta[name='robots']", "name", "robots").setAttribute("content", robotsValue);
    ensureMeta("meta[property='og:title']", "property", "og:title").setAttribute("content", computedMeta.title);
    ensureMeta("meta[property='og:description']", "property", "og:description").setAttribute("content", computedMeta.description);
    ensureMeta("meta[property='og:type']", "property", "og:type").setAttribute("content", computedMeta.type || "website");
    ensureMeta("meta[property='og:url']", "property", "og:url").setAttribute("content", canonicalUrl);
    ensureMeta("meta[property='og:locale']", "property", "og:locale").setAttribute(
      "content",
      language === "uk" ? "uk_UA" : "en_US",
    );
    ensureMeta("meta[property='og:site_name']", "property", "og:site_name").setAttribute("content", "Sova | Petrykivka Art");
    ensureMeta("meta[property='og:image']", "property", "og:image").setAttribute("content", DEFAULT_OG_IMAGE);
    ensureMeta("meta[name='twitter:card']", "name", "twitter:card").setAttribute("content", "summary_large_image");
    ensureMeta("meta[name='twitter:title']", "name", "twitter:title").setAttribute("content", computedMeta.title);
    ensureMeta("meta[name='twitter:description']", "name", "twitter:description").setAttribute("content", computedMeta.description);
    ensureMeta("meta[name='twitter:image']", "name", "twitter:image").setAttribute("content", DEFAULT_OG_IMAGE);
    ensureCanonical().setAttribute("href", canonicalUrl);

    const jsonLdScriptId = "seo-jsonld";
    let jsonLd = document.getElementById(jsonLdScriptId);
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.setAttribute("type", "application/ld+json");
      jsonLd.setAttribute("id", jsonLdScriptId);
      document.head.appendChild(jsonLd);
    }

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SOVA Petrykivka Art",
      url: SITE_URL,
      logo: `${SITE_URL}/android-chrome-512x512.png`,
      sameAs: [],
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "SOVA Petrykivka Art",
      url: SITE_URL,
      inLanguage: language === "uk" ? "uk-UA" : "en-US",
    };

    const articleSchema = blogPost
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: blogPost.title,
          description: blogPost.introText,
          inLanguage: language === "uk" ? "uk-UA" : "en-US",
          mainEntityOfPage: canonicalUrl,
          image: [DEFAULT_OG_IMAGE],
          author: {
            "@type": "Person",
            name: "Nataliia Spyrydonova",
          },
          publisher: {
            "@type": "Organization",
            name: "SOVA Petrykivka Art",
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/android-chrome-512x512.png`,
            },
          },
        }
      : null;

    const schemaPayload = articleSchema ? [websiteSchema, organizationSchema, articleSchema] : [websiteSchema, organizationSchema];
    jsonLd.textContent = JSON.stringify(schemaPayload);
  }, [language, location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} />

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main>
        <Outlet />
      </main>

      <button
        type="button"
        className={`scroll-top ${showScrollTop ? "is-visible" : ""}`}
        onClick={scrollToTop}
        aria-label={layoutText.scrollTop}
      >
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M24 12L24 36M24 12L14 22M24 12L34 22"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>

      <Footer />
    </>
  );
}
