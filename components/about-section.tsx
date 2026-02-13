"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Flame, Heart, Star, Truck, UtensilsCrossed, Timer } from "lucide-react"

const features = [
  {
    icon: Flame,
    title: "Eldad ",
    description: ".",
  },
]

export function AboutSection() {
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
    <section ref={sectionRef} id="om-oss" className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Om Oss
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 text-balance">
            about
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Vi är Take & Go – en food truck som brinner för god mat och glada kunder i Falkenberg.
   
          </p>
        </div>

        {/* Video showcase */}
        <div className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="relative rounded-3xl overflow-hidden border border-border/30 shadow-2xl shadow-primary/5">
            <div className="aspect-video relative">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source
                  src="https://videos.pexels.com/video-files/4703682/4703682-uhd_2560_1440_25fps.mp4"
                  type="video/mp4"
                />
              </video>
              {/* Overlay with text */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <p className="text-foreground text-xl md:text-2xl lg:text-3xl font-serif font-bold text-balance leading-snug">
                  {"\"Varje pizza bakas med passion och kärlek.\""}
                </p>
                <p className="text-primary font-medium mt-3">Take & Go Falkenberg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative bg-card/50 border border-border/50 rounded-2xl p-8 hover:border-primary/30 hover:bg-card transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-primary/0 group-hover:bg-primary/30 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {[
            { value: "10+", label: "Nöjda kunder" },
            { value: "100%", label: "Färska ingredienser" },
            { value: "4.8", label: "Betyg av 5" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-card/30 rounded-2xl border border-border/30">
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
