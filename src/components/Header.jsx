import { useState } from "react";
import { SITE } from "../data/config";

const NAV_ITEMS = [
  { href: "#about", label: "About the Book" },
  { href: "#series", label: "The Series" },
  { href: "#notify", label: "Get Notified" },
  { href: "#testimonials", label: "What People Say" },
  { href: "#resources", label: "Resources" },
  { href: "#collaborate", label: "Collaborate" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleNavClick() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="wrap">
        <div className="header-row">
          {/* <a href="#home" className="brand-mark">{SITE.brand}</a> */}
          <a href="#home" className="brand-mark">
            <img src="/cisanalogy-image2.jpg" alt="CisAnalogy" className="cisanalogy-image" />
          </a>
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        <nav id="primary-nav" className={`nav-links ${open ? "open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
          <a
            className="btn btn-primary"
            href="#about"
            onClick={handleNavClick}
          >
            Buy Domain 1
          </a>
        </nav>
      </div>
    </header>
  );
}
