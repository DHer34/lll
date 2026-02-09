"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Instagram, Send, MessageCircle } from "lucide-react"
import Link from "next/link"

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  )
}

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/take_and_go1?igsh=MTZqazY2bnVxYjkyaw==", label: "Instagram", handle: "@take_and_go1" },
  { icon: FacebookIcon, href: "https://www.facebook.com/share/14T1WkU2zjw/", label: "Facebook", handle: "Take & Go Falkenberg" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@take.and.go3?_r=1&_t=ZS-93eMlJIQObF", label: "TikTok", handle: "@take.and.go3" },
]

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <section ref={sectionRef} id="kontakt" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Kontakt
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 text-balance">
            Hör av dig
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
           Har du frågor, vill boka oss för ett event eller bara säga hej? Vi älskar att höra från dig!
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Contact Form */}
          {submitted ? (
            <div className="bg-card/50 rounded-2xl p-8 border border-border/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Tack for ditt meddelande!</h3>
                <p className="text-muted-foreground mb-6">Vi aterkommer sa snart vi kan.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full bg-transparent">
                  Skicka nytt meddelande
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card/50 rounded-2xl p-8 border border-border/50">
              <h3 className="text-foreground font-bold text-lg mb-6">Skicka ett meddelande</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-muted-foreground text-sm mb-2 block">Namn</label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ditt namn"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-muted-foreground text-sm mb-2 block">Telefon</label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="070-123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-muted-foreground text-sm mb-2 block">E-post</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="din@email.se"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-muted-foreground text-sm mb-2 block">Meddelande</label>
                  <Textarea
                    id="message"
                    placeholder="Skriv ditt meddelande har..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-5 gap-2 shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? "Skickar..." : (
                    <>
                      <Send className="w-4 h-4" />
                      Skicka Meddelande
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Direct contact */}
            <div className="bg-card/50 rounded-2xl p-6 border border-border/50">
              <h3 className="text-foreground font-bold mb-5">Kontakta oss direkt</h3>
              <div className="space-y-3">
                <Link
                  href="tel:0722562660"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Ring oss</div>
                    <div className="text-foreground font-medium">0722-562660</div>
                  </div>
                </Link>
                <Link
                  href="https://wa.me/46722562660"
                  target="_blank"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">WhatsApp</div>
                    <div className="text-foreground font-medium">0722-562660</div>
                  </div>
                </Link>
                <Link
                  href="mailto:take.and.go.f@gmail.com"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">E-post</div>
                    <div className="text-foreground font-medium">take.and.go.f@gmail.com</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Social */}
            <div className="bg-card/50 rounded-2xl p-6 border border-border/50">
              <h3 className="text-foreground font-bold mb-5">Folj oss</h3>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <social.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">{social.label}</div>
                      <div className="text-foreground font-medium">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Catering CTA */}
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
              <h3 className="text-foreground font-bold text-lg mb-2">Catering & Event?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Planerar du bröllop, företag eller fest? Vi kommer gärna till dig!
              </p>
              <Link href="tel:0722562660">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-lg shadow-primary/20">
                  Ring for offert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
