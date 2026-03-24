import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const Shop = lazy(() => import("./pages/Shop"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Request = lazy(() => import("./pages/Request"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contacts = lazy(() => import("./pages/Contacts"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Classes = lazy(() => import("./pages/Classes"));
const LegalPage = lazy(() => import("./pages/LegalPage"));

function PageFallback() {
  return <div className="page-loader" aria-hidden="true" />;
}


export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="about" element={<About />} />
          <Route path="shop" element={<Shop />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="request" element={<Request />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="classes" element={<Classes />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="legal/:slug" element={<LegalPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
