import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_OG_IMAGE, pageMeta, SITE_URL } from "../src/lib/seo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const indexHtmlPath = path.join(distDir, "index.html");

const routeEntries = [
  "/",
  "/about",
  "/classes",
  "/gallery",
  "/shop",
  "/contacts",
  "/request",
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function upsertMeta(html, selector, tag) {
  const patterns = {
    description: /<meta\s+name="description"[\s\S]*?\/?>/,
    robots: /<meta\s+name="robots"[\s\S]*?\/?>/,
    canonical: /<link\s+rel="canonical"[\s\S]*?\/?>/,
    ogTitle: /<meta\s+property="og:title"[\s\S]*?\/?>/,
    ogDescription: /<meta\s+property="og:description"[\s\S]*?\/?>/,
    ogType: /<meta\s+property="og:type"[\s\S]*?\/?>/,
    ogUrl: /<meta\s+property="og:url"[\s\S]*?\/?>/,
    ogImage: /<meta\s+property="og:image"[\s\S]*?\/?>/,
    twitterTitle: /<meta\s+name="twitter:title"[\s\S]*?\/?>/,
    twitterDescription: /<meta\s+name="twitter:description"[\s\S]*?\/?>/,
    twitterImage: /<meta\s+name="twitter:image"[\s\S]*?\/?>/,
  };

  const pattern = patterns[selector];
  if (!pattern) return html;
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  return html.replace("</head>", `  ${tag}\n</head>`);
}

function upsertJsonLd(html, payload) {
  const script = `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(payload)}</script>`;
  const pattern = /<script type="application\/ld\+json" id="seo-jsonld">.*?<\/script>/s;
  if (pattern.test(html)) {
    return html.replace(pattern, script);
  }
  return html.replace("</head>", `  ${script}\n</head>`);
}

function buildHtml(baseHtml, routePath) {
  const meta = pageMeta.uk[routePath] || pageMeta.uk["/"];
  const canonicalUrl = `${SITE_URL}${routePath === "/" ? "" : routePath}`;
  const schemaPayload = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "SOVA Petrykivka Art",
      url: SITE_URL,
      inLanguage: "uk-UA",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SOVA Petrykivka Art",
      url: SITE_URL,
      logo: `${SITE_URL}/android-chrome-512x512.png`,
      sameAs: [],
    },
  ];

  let html = baseHtml.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  html = html.replace(/<html lang="[^"]*">/, '<html lang="uk">');
  html = upsertMeta(html, "description", `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  html = upsertMeta(html, "robots", '<meta name="robots" content="index,follow" />');
  html = upsertMeta(html, "canonical", `<link rel="canonical" href="${canonicalUrl}" />`);
  html = upsertMeta(html, "ogTitle", `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  html = upsertMeta(html, "ogDescription", `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  html = upsertMeta(html, "ogType", `<meta property="og:type" content="${meta.type || "website"}" />`);
  html = upsertMeta(html, "ogUrl", `<meta property="og:url" content="${canonicalUrl}" />`);
  html = upsertMeta(html, "ogImage", `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`);
  html = upsertMeta(html, "twitterTitle", `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  html = upsertMeta(html, "twitterDescription", `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
  html = upsertMeta(html, "twitterImage", `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`);
  html = upsertJsonLd(html, schemaPayload);
  return html;
}

if (!fs.existsSync(indexHtmlPath)) {
  throw new Error(`Build output not found: ${indexHtmlPath}`);
}

const baseHtml = fs.readFileSync(indexHtmlPath, "utf8");

for (const routePath of routeEntries) {
  const routeHtml = buildHtml(baseHtml, routePath);
  const outputPath =
    routePath === "/"
      ? indexHtmlPath
      : path.join(distDir, routePath.replace(/^\//, ""), "index.html");

  ensureDir(path.dirname(outputPath));
  fs.writeFileSync(outputPath, routeHtml);
}

console.log(`Generated static HTML entry points for ${routeEntries.length} routes.`);
