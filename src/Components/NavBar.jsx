import { useState, useRef, useEffect } from "react";
import "../assets/Styles/Navbar.css";
import logo from "../assets/Images/logo.png";

// ─ Dropdown data ─
const NAV_ITEMS = [
  {
    label: "Vehicles",
    dropdown: [
      {
        heading: "By type",
        links: [
          { label: "Sedans", href: "#" },
          { label: "SUVs", href: "#" },
          { label: "Pickups", href: "#" },
          { label: "Crossovers", href: "#" },
          { label: "Vans", href: "#" },
        ],
      },
      {
        heading: "By condition",
        links: [
          { label: "New arrivals", href: "#" },
          { label: "Nearly new", href: "#" },
          { label: "Used", href: "#" },
        ],
      },
      {
        heading: "Popular makes",
        links: [
          { label: "Toyota", href: "#" },
          { label: "Mazda", href: "#" },
          { label: "Nissan", href: "#" },
          { label: "Subaru", href: "#" },
          { label: "Mercedes-Benz", href: "#" },
          { label: "BMW", href: "#" },
          { label: "Audi", href: "#" },
          { label: "Volkswagen", href: "#" },
          { label: "Honda", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Accessories",
    dropdown: [
      {
        heading: "Lighting",
        links: [
          { label: "Projector headlights", href: "#" },
          { label: "LED headlights", href: "#" },
        ],
      },
      {
        heading: "Audio",
        links: [
          { label: "Speakers", href: "#" },
          { label: "Infotainment systems", href: "#" },
        ],
      },
      {
        heading: "Safety & tracking",
        links: [
          { label: "GPS trackers", href: "#" },
          { label: "Dash cameras", href: "#" },
          { label: "Reverse cameras", href: "#" },
        ],
      },
    ],
  },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "FAQ", href: "#" },
];

// ─ dropdown icon ─
function ChevronDown({ open }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className={`navbar__chevron ${open ? "navbar__chevron--open" : ""}`}
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─ Hamburger icon ─
function HamburgerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M2 4h14M2 9h14M2 14h14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─ Dropdown panel ─
function DropdownPanel({ columns }) {
  return (
    <div className="navbar__dropdown">
      {columns.map((col) => (
        <div key={col.heading}>
          <p className="navbar__dropdown-heading">{col.heading}</p>
          <ul className="navbar__dropdown-list">
            {col.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="navbar__dropdown-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─ Main Navbar ─
export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleMouseEnter(label) {
    clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  }

  return (
    <nav
      ref={navRef}
      className="navbar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar__inner">

        {/* Logo */}
        <a href="#" className="navbar__logo" aria-label="My Car Kenya home">
          <img src={logo} alt="My Car Kenya Logo" className="navbar__logo-image" />
        </a>

        {/* Desktop nav */}
        <div className="navbar__menu" role="menubar">
          {NAV_ITEMS.map((item) => {
            const hasDropdown = !!item.dropdown;
            const isOpen = openDropdown === item.label;

            return (
              <div
                key={item.label}
                className="navbar__item"
                onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                onMouseLeave={() => hasDropdown && handleMouseLeave()}
                role="none"
              >
                <a
                  href={item.href || "#"}
                  className={`navbar__link ${isOpen ? "navbar__link--open" : ""}`}
                  role="menuitem"
                  aria-haspopup={hasDropdown ? "true" : undefined}
                  aria-expanded={hasDropdown ? isOpen : undefined}
                  onClick={(e) => {
                    if (hasDropdown) {
                      e.preventDefault();
                      setOpenDropdown(isOpen ? null : item.label);
                    }
                  }}
                >
                  {item.label}
                  {hasDropdown && <ChevronDown open={isOpen} />}
                </a>

                {hasDropdown && isOpen && (
                  <DropdownPanel columns={item.dropdown} />
                )}
              </div>
            );
          })}

          {/* Mobile hamburger */}
          <button
            className="navbar__icon-btn navbar__hamburger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <HamburgerIcon />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="navbar__mobile-drawer">
          {NAV_ITEMS.map((item) => {
            const hasDropdown = !!item.dropdown;
            const isExpanded = mobileExpanded === item.label;

            return (
              <div key={item.label}>
                <button
                  className="navbar__mobile-item-btn"
                  onClick={() =>
                    hasDropdown
                      ? setMobileExpanded(isExpanded ? null : item.label)
                      : setMobileOpen(false)
                  }
                >
                  {item.label}
                  {hasDropdown && <ChevronDown open={isExpanded} />}
                </button>

                {hasDropdown && isExpanded && (
                  <div className="navbar__mobile-links">
                    {item.dropdown.map((col) =>
                      col.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="navbar__mobile-link"
                        >
                          {link.label}
                        </a>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
}