// src/pages/BlogPost.jsx
import { Link, useParams } from "react-router-dom";
import { posts } from "../data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="post">
        <div className="post-container">
          <p>пост не знайдено</p>
          <Link to="/">на головну</Link>
        </div>
      </section>
    );
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <section className="post">
      <div className="post-container">
        <div className="post-breadcrumbs">
          <Link to="/">головна</Link>
          <span>›</span>
          <Link to="/blog">блог / новини</Link>
        </div>

        <h1 className="post-title">{post.title}</h1>

        <div className="post-hero">
          <div className="post-imagewrap">
            {post.cover && (
              <img
                className="post-image"
                src={post.cover}
                alt={post.title}
              />
            )}
          </div>

          <div>
            {post.introTitle && (
              <h3 className="post-introtitle">{post.introTitle}</h3>
            )}
            {post.introText && (
              <p className="post-introtext">{post.introText}</p>
            )}
          </div>
        </div>

        <h2 className="post-relatedtitle">вас може зацікавити:</h2>

        <div className="post-relatedgrid">
          {related.map((r) => (
            <Link
              key={r.slug}
              className="post-relatedcard"
              to={`/blog/${r.slug}`}
            >
              {r.cover && (
                <img
                  className="post-relatedimg"
                  src={r.cover}
                  alt={r.title}
                />
              )}
              <div className="post-relatedoverlay">{r.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
