"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Navigation, ExternalLink, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const hours = [
  { days: "Mandag - Torsdag", time: "16:30 - 21:00" },
  { days: "Fredag", time: "11:00 - 22:00" },
  { days: "Lordag", time: "11:00 - 22:00" },
  { days: "Sondag", time: "12:00 - 21:00" },
]

export function LocationSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="hitta-oss" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Var finns vi?
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 text-balance">
            Hitta Oss
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Mitt i hjärtat av Falkenberg, på Stortorget. Kom förbi och prova våra smaker!
          </p>
        </div>

        <div className={`grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Map */}
          <div className="lg:col-span-3 relative bg-card rounded-2xl overflow-hidden border border-border/50 aspect-square lg:aspect-auto lg:min-h-[480px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2143.8!2d12.4912!3d56.9055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDU0JzE5LjgiTiAxMsKwMjknMjguMyJF!5e0!3m2!1ssv!2sse!4v1706900000000!5m2!1ssv!2sse"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Take & Go Falkenberg Location"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <Link
                href="https://maps.app.goo.gl/1JbHMGXfWTj8PKkg9"
                target="_blank"
                className="block"
              >
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl shadow-xl">
                  <Navigation className="w-4 h-4" />
                  Öppna i Google Maps
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Info side */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Address */}
            <div className="bg-card/50 border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-foreground font-bold">Adress</h3>
              </div>
              <p className="text-foreground font-medium text-lg">Stortorget</p>
              <p className="text-muted-foreground">311 31 Falkenberg</p>
              <p className="text-muted-foreground">Sverige</p>
            </div>

            {/* Opening hours */}
            <div className="bg-card/50 border border-border/50 rounded-2xl p-6 flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-foreground font-bold">Öppettider</h3>
              </div>
              <div className="space-y-3">
                {hours.map(h => (
                  <div key={h.days} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                    <span className="text-muted-foreground text-sm">{h.days}</span>
                    <span className="text-foreground font-medium text-sm">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
