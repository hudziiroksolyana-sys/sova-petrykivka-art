import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";

import Header from "./Header";
import Footer from "../Footer/Footer";
import MobileMenu from "./MobileMenu";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!menuOpen) return undefined;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (isMobile) {
      const previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousBodyOverflow;
      };
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
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
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
        aria-label="Повернутися нагору"
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
