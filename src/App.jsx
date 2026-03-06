import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import Request from "./pages/Request";
import Checkout from "./pages/Checkout";
import Gallery from "./pages/Gallery";
import Contacts from "./pages/Contacts";
import BlogPost from "./pages/BlogPost";
import Classes from "./pages/Classes";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="request" element={<Request />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="classes" element={<Classes />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>
    </Routes>
  );
}
