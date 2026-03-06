import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "../../data/posts";

export default function BlogHome() {
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
    const t = setTimeout(() => setIsAnimating(false), 260);
    return () => clearTimeout(t);
  }, [isAnimating]);

  return (
    <section className="bloghome">
      <div className="bloghome-container">
        <h2 className="bloghome-title">Блог / Новини</h2>

        <div className="bloghome-wrap">
          <div
            className={`bloghome-card${isAnimating ? (direction === 1 ? " is-next" : " is-prev") : ""}`}
            onTouchStart={(e) => {
              const t = e.touches[0];
              touchStartX.current = t.clientX;
              touchStartY.current = t.clientY;
            }}
            onTouchEnd={(e) => {
              const t = e.changedTouches[0];
              const dx = t.clientX - touchStartX.current;
              const dy = t.clientY - touchStartY.current;
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
              aria-label="prev"
            />

            <img className="bloghome-img" src={item.cover} alt={item.title} />

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
                <span className="bloghome-moretext">Більше</span>
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
              aria-label="next"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
