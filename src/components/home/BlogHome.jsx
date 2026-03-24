import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SmartImage from "../common/SmartImage";
import { getPosts } from "../../data/posts";
import { useLanguage } from "../../context/LanguageContext";

const blogHomeText = {
  uk: {
    title: "Блог / Новини",
    more: "Більше",
    prev: "Попередній допис",
    next: "Наступний допис",
  },
  en: {
    title: "Blog / News",
    more: "More",
    prev: "Previous post",
    next: "Next post",
  },
};

export default function BlogHome() {
  const { language } = useLanguage();
  const posts = getPosts(language);
  const t = blogHomeText[language];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const item = posts[index];
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const suppressClick = useRef(false);

  const prev = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setIndex((i) => (i - 1 + posts.length) % posts.length);
  };

  const next = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setIndex((i) => (i + 1) % posts.length);
  };

  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => setIsAnimating(false), 260);
    return () => clearTimeout(timer);
  }, [isAnimating]);

  useEffect(() => {
    setIndex(0);
    setDirection(0);
    setIsAnimating(false);
  }, [language]);

  return (
    <section className="bloghome">
      <div className="bloghome-container">
        <h2 className="bloghome-title">{t.title}</h2>

        <div className="bloghome-wrap">
          <div
            className={`bloghome-card${isAnimating ? (direction === 1 ? " is-next" : " is-prev") : ""}`}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              touchStartX.current = touch.clientX;
              touchStartY.current = touch.clientY;
            }}
            onTouchEnd={(e) => {
              const touch = e.changedTouches[0];
              const dx = touch.clientX - touchStartX.current;
              const dy = touch.clientY - touchStartY.current;
              if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                suppressClick.current = true;
                if (dx < 0) next();
                else prev();
              }
            }}
          >
            <button
              type="button"
              className="bloghome-arrow left"
              onClick={(e) => {
                e.preventDefault();
                prev();
              }}
              aria-label={t.prev}
            />

            <SmartImage
              className="bloghome-img"
              src={item.cover}
              alt={item.title}
              sizes="(max-width: 600px) 100vw, (max-width: 980px) 520px, 600px"
            />

            <div className="bloghome-overlay">
              <div className="bloghome-cardtitle">{item.title}</div>

              <Link
                className="bloghome-more"
                to={`/blog/${item.slug}`}
                onClick={(e) => {
                  if (suppressClick.current) {
                    e.preventDefault();
                    suppressClick.current = false;
                  }
                }}
              >
                <span className="bloghome-moretext">{t.more}</span>
                <span className="bloghome-morecircle" aria-hidden="true">
                  <span className="bloghome-morearrow">↗</span>
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="bloghome-arrow right"
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
              aria-label={t.next}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
