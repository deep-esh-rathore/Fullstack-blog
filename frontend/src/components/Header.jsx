import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../store/authSlice";
import { Link } from "react-router-dom";
import { Logo } from "./index";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const message = useSelector((state) => state.auth.message);
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", status: true },
    { name: "About", path: "/about", status: true },
    { name: "Add-Post", path: "/posts/create", status: authStatus },
    { name: "Sign-in", path: "/login", status: !authStatus },
    { name: "Sign-up", path: "/signup", status: !authStatus },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 
        text-white px-4 sm:px-8 py-4 flex items-center justify-between shadow-md relative">

        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>

        {/* Hamburger Button (mobile only) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Nav (hidden on mobile, flex on desktop) */}
        <nav className="hidden md:flex">
          <ul className="flex gap-6 list-none m-0 p-0">
            {navItems.map(
              (item) =>
                item.status && (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-white font-medium px-4 py-2 rounded 
                      transition-colors hover:text-pink-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </nav>

        {/* Logout Button (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {authStatus && <LogoutBtn />}
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-gradient-to-r 
            from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col 
            items-center gap-4 py-6 md:hidden shadow-md z-50">

            {navItems.map(
              (item) =>
                item.status && (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)} // close menu on click
                    className="text-white font-medium px-4 py-2 rounded 
                    transition-colors hover:text-pink-300"
                  >
                    {item.name}
                  </Link>
                )
            )}

            {authStatus && <LogoutBtn />}
          </div>
        )}
      </header>

      {/* Message Banner */}
      {message && (
  <div className="relative bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-800 
    text-white px-6 py-3 text-center text-sm sm:text-base font-medium 
    shadow-lg flex items-center justify-center animate-fade-in rounded-md mx-2 sm:mx-8 mt-2">
    
    <span className="pr-8">{message}</span>
    
    <button
      onClick={() => dispatch(clearMessage())}
      className="absolute right-4 bg-white/20 hover:bg-white/30 
        text-white rounded-full px-2 py-1 text-xs transition-all"
    >
      ✖
    </button>
  </div>
)}

    </>
  );
}

export default Header;
