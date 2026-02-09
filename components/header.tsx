"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#hem", label: "Hem" },
  { href: "#meny", label: "Meny" },
  { href: "#om-oss", label: "Om Oss" },
  { href: "#hitta-oss", label: "Hitta Oss" },
  { href: "#kontakt", label: "Kontakt" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Track active section
      const sections = navLinks.map(l => l.href.replace("#", ""))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-2"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative transition-all duration-500 ${isScrolled ? "w-10 h-10" : "w-12 h-12"}`}>
              <Image
                src="/images/logo.png"
                alt="Take & Go Falkenberg"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-foreground transition-all duration-500 leading-tight ${isScrolled ? "text-base" : "text-lg"}`}>
                Take & Go
              </span>
              <span className={`text-primary text-[10px] tracking-widest uppercase font-medium transition-all duration-500 ${isScrolled ? "opacity-0 h-0" : "opacity-100 h-3"}`}>
                Falkenberg
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "")
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="tel:0722562660">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-full px-6 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
                <Phone className="w-4 h-4" />
                Ring oss
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-card/50 backdrop-blur-sm border border-border/50 text-foreground"
            aria-label="Toggle menu"
          >
            <span className={`absolute transition-all duration-300 ${isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}>
              <Menu className="w-5 h-5" />
            </span>
            <span className={`absolute transition-all duration-300 ${isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}>
              <X className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-400 ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-b border-border/50 mx-4 mt-2 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
          <nav className="p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors font-medium text-lg py-3 px-4 rounded-xl hover:bg-card"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-border/50">
              <Link href="tel:0722562660" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-full py-6 text-base shadow-lg shadow-primary/20">
                  <Phone className="w-4 h-4" />
                  0722-562660
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
