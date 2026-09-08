import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Bookmark,
  Search,
  Menu,
  X,
} from "lucide-react";

interface NavbarProps {
  onSearchToggle?: () => void;
}

function Navbar({ onSearchToggle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    // { name: 'Home', path: '/' },
    { name: "Research Publications", path: "/research", icon: Bookmark },
    { name: "Patents", path: "/patents", icon: FileText },
    { name: "Books & Chapters", path: "/books", icon: BookOpen },
    // { name: "Departments", path: "/departments", icon: Building2 },
    { name: "About", path: "/about" },
  ];

  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div className="logo-mark ">
            <img src="Images\IMG-20210904-WA0042.jpg" alt="SRMU Research and Consultancy" />
          </div>
          <div>
            <div className="logo-type">
              SRMU Research <br />& Consultancy.
            </div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="desktop-nav">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${active ? "active" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="desktop-actions">
          {onSearchToggle && (
            <button onClick={onSearchToggle} className="nav-search">
              <Search size={14} color="var(--color-sage)" />
              <span>Search…</span>
            </button>
          )}
          <Link to="/research" className="btn-primary nav-cta">
            Explore research
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`mobile-link ${active ? "active" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
