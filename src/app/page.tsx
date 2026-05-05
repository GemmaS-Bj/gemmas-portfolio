"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Fingerprint3D from "./Fingerprint3D";

const SURFACE_OPACITY = 0.7;

const PILL_H = 40;
const TAB_H = 56;
const MAIN_TOP = 44;
const RADIUS = 12;
const NOTCH = 24;
const NOTCH_OFFSET = 12;

const ICON_SIZE = 40;
const ICON_GAP = 12;
const NAV_OFFSET = 20;
const PILL_LEFT = ICON_SIZE + ICON_GAP + NAV_OFFSET;

const LOGO_H = 32;
const LOGO_INSET = (PILL_H - LOGO_H) / 2;

const TOP_SECTION_VH = 130;
const SECTION_GAP = 96;
const FOOTER_H = 280;
const FOOTER_RADIUS = 10;
const FOOTER_LOGO_SIZE = 280;

const D_ICON = "0s";
const D_PILL = "0.15s";
const D_TAB = "0.25s";
const D_MAIN = "0.35s";
const D_NOTCH = "0.45s";
const D_LOGO = "0.55s";
const D_LINKS = "0.7s";
const D_FOOTER = "0.75s";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("gemmas-theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("gemmas-theme", next);
      return next;
    });
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const fill = theme === "dark" ? "var(--surface-fill)" : "#BBDEFB";
  const fillRaw = theme === "dark" ? "#1a2744" : "#BBDEFB";

  // Avoid hydration mismatch by rendering a neutral version until mounted
  if (!mounted) {
    return (
      <main className="min-h-screen w-full p-3 sm:p-4" style={{ background: "var(--background)" }}>
        <section className="relative w-full" style={{ height: `${TOP_SECTION_VH}vh` }} />
      </main>
    );
  }

  return (
    <main
      className="min-h-screen w-full p-3 sm:p-4"
      style={{ background: "var(--background)", transition: "background 0.5s ease" }}
    >
      <section
        className="relative w-full"
        style={{ height: `${TOP_SECTION_VH}vh` }}
      >
        {/* LAYER 1 — Blue surface shapes with opacity wrapper */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: SURFACE_OPACITY,
            pointerEvents: "none",
          }}
        >
          {/* Pilule */}
          <div
            className="nav-pill surface-shape"
            style={{
              position: "absolute",
              background: fillRaw,
              left: PILL_LEFT,
              top: 0,
              width: "56.8475%",
              height: PILL_H,
              borderRadius: 9999,
              animation: "drop-in 0.6s ease-out backwards",
              animationDelay: D_PILL,
            }}
          />

          {/* Tab — desktop only */}
          <div
            className="tab-shape surface-shape"
            style={{
              position: "absolute",
              background: fillRaw,
              right: 0,
              top: 0,
              width: "29.2010%",
              height: TAB_H,
              borderTopLeftRadius: RADIUS,
              borderTopRightRadius: RADIUS,
              animation: "drop-in 0.6s ease-out backwards",
              animationDelay: D_TAB,
            }}
          />

          {/* Notch concave — desktop only */}
          <svg
            className="notch-shape"
            style={{
              position: "absolute",
              right: `calc(29.2010% - ${NOTCH_OFFSET}px)`,
              top: TAB_H - NOTCH,
              width: NOTCH,
              height: NOTCH,
              display: "block",
              animation: "fade-in 0.5s ease-out backwards",
              animationDelay: D_NOTCH,
            }}
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M0.0135803 8.97556C0.00454712 9.14516 0 9.31594 0 9.48779C0 14.7352 4.25259 18.9878 9.5 18.9878C14.7474 18.9878 19 14.7352 19 9.48779C19 4.40351 15.0077 0.253172 9.98642 0C9.7204 5.00919 5.57556 8.98779 0.5 8.98779C0.336853 8.98779 0.174683 8.98368 0.0135803 8.97556Z"
              fill={fillRaw}
            />
          </svg>

          {/* Main surface */}
          <div
            className="surface-shape"
            style={{
              position: "absolute",
              background: fillRaw,
              left: 0,
              right: 0,
              top: MAIN_TOP,
              bottom: 0,
              borderRadius: RADIUS,
              animation: "rise-in 0.7s ease-out backwards",
              animationDelay: D_MAIN,
            }}
          />
        </div>

        {/* LAYER 2 — Interactive elements (full opacity) */}

        {/* Interactive 3D Fingerprint */}
        <Fingerprint3D
          size={ICON_SIZE}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            animationDelay: D_ICON,
          }}
          className="fingerprint-icon"
        />

        {/* Nav container: 3-column grid to center links despite the logo position */}
        <div
          className="nav-pill-container"
          style={{
            position: "absolute",
            left: PILL_LEFT,
            top: 0,
            width: "56.8475%",
            height: PILL_H,
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            paddingLeft: LOGO_INSET,
            paddingRight: LOGO_INSET,
          }}
        >
          {/* Logo — col 1 */}
          <Image
            src={theme === "dark" ? "/GemmasGDark.svg" : "/GemmasGLight.svg"}
            alt="GemmaS"
            width={LOGO_H}
            height={LOGO_H}
            priority
            style={{
              width: LOGO_H,
              height: LOGO_H,
              transformOrigin: "center",
              animation: "logo-3d-intro 1.4s cubic-bezier(0.22, 1, 0.36, 1) backwards",
              animationDelay: D_LOGO,
            }}
          />

          {/* Desktop nav links — col 2, centered, liquid glass hover */}
          <nav
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              animation: "fade-in 0.6s ease-out backwards",
              animationDelay: D_LINKS,
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="liquid-link text-sm"
              >
                <span className="liquid-shadow" aria-hidden="true" />
                <span className="liquid-backdrop" aria-hidden="true" />
                <span className="liquid-label">{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Hamburger button — mobile only (col 2 right-aligned) */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className={`hamburger-btn ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>

          {/* Spacer col 3 — same width as logo for true centering on desktop */}
          <div className="hidden md:block" style={{ width: LOGO_H }} aria-hidden="true" />
        </div>

        {/* THEME TOGGLE — positioned in the white space to the right of the navbar pill */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Activer le thème sombre" : "Activer le thème clair"}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            animation: "pop-in 0.6s ease-out backwards",
            animationDelay: D_TAB,
          }}
        >
          <span className="liquid-shadow" aria-hidden="true" />
          <span className="liquid-backdrop" aria-hidden="true" />
          {theme === "light" ? (
            <MoonIcon className="theme-toggle-icon" />
          ) : (
            <SunIcon className="theme-toggle-icon" />
          )}
        </button>
      </section>

      {/* Spacer before footer */}
      <div style={{ height: SECTION_GAP }} aria-hidden="true" />

      {/* Footer — pas d'overlap avec d'autres formes, donc rgba direct est OK */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: `rgba(${theme === "dark" ? "26, 39, 68" : "187, 222, 251"}, ${SURFACE_OPACITY})`,
          height: FOOTER_H,
          borderTopLeftRadius: FOOTER_RADIUS,
          borderTopRightRadius: FOOTER_RADIUS,
          animation: "rise-in 0.7s ease-out backwards",
          animationDelay: D_FOOTER,
          transition: "background 0.5s ease",
        }}
      >
        <Image
          src={theme === "dark" ? "/GemmasGDark.svg" : "/GemmasGLight.svg"}
          alt=""
          aria-hidden="true"
          width={FOOTER_LOGO_SIZE}
          height={FOOTER_LOGO_SIZE}
          style={{
            position: "absolute",
            right: -FOOTER_LOGO_SIZE * 0.32,
            bottom: -FOOTER_LOGO_SIZE * 0.32,
            width: FOOTER_LOGO_SIZE,
            height: FOOTER_LOGO_SIZE,
            opacity: 0.95,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        {/* Close button positioned at same place as hamburger */}
        <button
          className={`hamburger-btn open`}
          onClick={closeMenu}
          aria-label="Fermer le menu"
          style={{
            display: menuOpen ? "flex" : "none",
            position: "absolute",
            top: 12,
            right: 12,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1002,
          }}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <nav style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={closeMenu}
              style={{
                animationDelay: menuOpen ? `${0.1 + i * 0.07}s` : "0s",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Global SVG filter for liquid distortion */}
      <GlassFilter />
    </main>
  );
}

function GlassFilter() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves={1}
            seed={1}
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
