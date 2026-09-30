"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { navigation } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { ResumeButton } from "@/components/ui/ResumeButton";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const desktop = window.matchMedia("(min-width: 1100px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
    }, { rootMargin: "-20% 0px -45% 0px" });
    for (const item of navigation.filter((item) => item.available)) {
      const element = document.querySelector(item.href);
      if (element) observer.observe(element);
    }
    return () => { window.removeEventListener("scroll", onScroll); desktop.removeEventListener("change", onResize); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const onPointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [open]);

  const links = navigation.map((item) => item.available ? (
    <a key={item.label} href={item.href} aria-current={active === item.href ? "location" : undefined}
      onClick={() => { setOpen(false); document.querySelector<HTMLElement>(item.href)?.focus({ preventScroll: true }); }}>
      {item.label}
    </a>
  ) : <button key={item.label} type="button" disabled title={`${item.label} — coming soon`}>{item.label}<span className="sr-only"> — coming soon</span></button>);

  return (
    <header ref={header} className="site-header" data-scrolled={scrolled}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <Container className="nav-row">
        <a href="#home" className="wordmark" aria-label={`${profile.name} — home`} onClick={() => setOpen(false)}>{profile.name}<span aria-hidden="true">.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">{links}</nav>
        <div className="desktop-resume"><ResumeButton /></div>
        <button ref={toggle} type="button" className="menu-toggle" aria-controls="mobile-navigation" aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </Container>
      <div id="mobile-navigation" className="mobile-panel" data-open={open} inert={!open} aria-hidden={!open}>
        <div className="mobile-panel-inner">
          <nav aria-label="Mobile navigation">{links}</nav>
          <div className="mobile-resume"><ResumeButton /><p>Resume and dimmed sections are coming soon.</p></div>
        </div>
      </div>
    </header>
  );
}
