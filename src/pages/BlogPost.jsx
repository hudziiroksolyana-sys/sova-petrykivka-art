import { Link, useParams } from "react-router-dom";
import { getPosts } from "../data/posts";
import { useLanguage } from "../context/LanguageContext";

const blogPostText = {
  uk: {
    notFound: "Публікацію не знайдено.",
    backHome: "Повернутись на головну",
    breadcrumbs: "Breadcrumb",
    home: "Головна",
    blog: "Блог / Новини",
    classes: "Переглянути майстер-класи",
    related: "Вас може зацікавити:",
  },
  en: {
    notFound: "Post not found.",
    backHome: "Back to home",
    breadcrumbs: "Breadcrumb",
    home: "Home",
    blog: "Blog / News",
    classes: "View workshops",
    related: "You may also like:",
  },
};

export default function BlogPost() {
  const { language } = useLanguage();
  const posts = getPosts(language);
  const t = blogPostText[language];
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <section className="post">
        <div className="post-container">
          <p className="post-empty">{t.notFound}</p>
          <Link className="post-back" to="/">
            {t.backHome}
          </Link>
        </div>
      </section>
    );
  }

  const isBeginnersPost = slug === "petrykivka-for-beginners";
  const serifTitleSlugs = new Set([
    "master-class-for-beginners",
    "petrykivka-in-modern-interior",
    "painting-as-a-gift",
  ]);
  const isSerifPostTitle = serifTitleSlugs.has(slug);
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const sideFacts = (post.facts || []).slice(0, 3).map((fact) => {
    const [label, value] = fact.split(":");
    return value ? value.trim() : label.trim();
  });
  const formatRelatedTitle = (title) =>
    language === "uk" && title === "Петриківський розпис: що треба знати початківцю"
      ? "Петриківський розпис:\nщо треба знати початківцю"
      : title;

  return (
    <section className="post">
      <div className="post-container">
        <div className="post-breadcrumbs" aria-label={t.breadcrumbs}>
          <Link to="/">{t.home}</Link>
          <span>›</span>
          <span>{t.blog}</span>
        </div>

        <h1
          className={`post-title${isBeginnersPost ? " post-title--shopfont" : ""}${isSerifPostTitle ? " post-title--aboutfont" : ""}`}
        >
          {post.title}
        </h1>

        <div className="post-hero">
          <div className="post-imagewrap">
            <img className="post-image" src={post.cover} alt={post.title} />
            <div className="post-image-cta-wrap">
              <Link className="post-image-cta bloghome-more" to="/classes">
                <span className="bloghome-moretext">{t.classes}</span>
                <span className="bloghome-morecircle" aria-hidden="true">
                  <span className="bloghome-morearrow">↗</span>
                </span>
              </Link>
            </div>
          </div>

          <div className="post-side post-side--text">
            <h2 className="post-side-title">{post.introTitle}</h2>
            <div className="post-side-copy">
              <p className="post-side-paragraph">{post.introText}</p>
              {post.details?.slice(0, 1).map((paragraph, index) => (
                <p key={`${post.slug}-side-${index}`} className="post-side-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="post-side-footer">
              <div className="post-side-chips">
                {sideFacts.map((fact, index) => (
                  <span key={`${post.slug}-chip-${index}`} className="post-side-chip">
                    {fact}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h2 className="post-relatedtitle">{t.related}</h2>

        <div className="post-relatedgrid">
          {related.map((item) => (
            <Link key={item.slug} className="post-relatedcard" to={`/blog/${item.slug}`}>
              <img className="post-relatedimg" src={item.cover} alt={item.title} />
              <div className="post-relatedoverlay">{formatRelatedTitle(item.title)}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
