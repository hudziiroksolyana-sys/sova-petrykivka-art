// import { NavLink, Link } from "react-router-dom";

// import cartIcon from "../../assets/icons/cart.svg";
// import heartIcon from "../../assets/icons/heart.svg";
// import userIcon from "../../assets/icons/user.svg";
// import logo from "../../assets/logo/logo.svg";

// export default function Header() {
//   return (
//     <header className="header">
//       <div className="header-container">
//         <Link to="/" className="logo" aria-label="home">
//           <img src={logo} alt="sova" />
//         </Link>

//         <nav className="nav">
//           <NavLink
//             to="/about"
//             className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
//           >
//             Про нас
//           </NavLink>

//           <NavLink
//             to="/shop"
//             className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
//           >
//             Магазин
//           </NavLink>

//           <NavLink
//             to="/classes"
//             className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
//           >
//             Майстер-класи
//           </NavLink>

//           <NavLink
//             to="/gallery"
//             className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
//           >
//             Галерея
//           </NavLink>

//           <NavLink
//             to="/contacts"
//             className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
//           >
//             Контакти
//           </NavLink>
//         </nav>

//         <div className="actions">
//           <div className="cart">
//             <img src={cartIcon} alt="cart" />
//             <span className="cart-badge">0</span>
//           </div>

//           <img src={heartIcon} alt="favorites" />
//           <img src={userIcon} alt="account" />
//         </div>
//       </div>
//     </header>
//   );
// }
