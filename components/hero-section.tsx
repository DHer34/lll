"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Phone, Clock, MapPin, Play } from "lucide-react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.4
  const opacityFade = Math.max(0, 1 - scrollY / 700)

  return (
    <section
      ref={sectionRef}
      id="hem"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div
        className="absolute inset-0 scale-110"
        style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
      >
        {/* Fallback background image */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Take & Go Food Truck"
          fill
          className={`object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
          priority
        />
        {/* Pizza-making video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <source
            src="https://videos.pexels.com/video-files/5529530/5529530-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Cinematic overlays - darker and richer */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
      <div className="absolute inset-0 bg-background/20" />

      {/* Animated accent light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] animate-pulse-slow" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-24 pb-12" style={{ opacity: opacityFade }}>
        <div className="max-w-5xl mx-auto">
          {/* Logo - larger and more prominent */}
          <div
            className={`mb-10 flex justify-center transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] scale-150" />
              <div className="relative w-44 h-44 md:w-64 md:h-64 lg:w-72 lg:h-72">
                <Image
                  src="/images/logo.png"
                  alt="Take & Go Falkenberg"
                  fill
                  className="object-contain drop-shadow-[0_0_60px_rgba(220,38,38,0.4)]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Tagline badge */}
          <div
            className={`inline-flex items-center gap-3 bg-card/50 backdrop-blur-md border border-border/50 rounded-full px-6 py-3 mb-8 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-foreground/90 text-sm font-medium tracking-widest uppercase">
              Pizza & Burgare i Falkenberg
            </span>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>

          {/* Main heading - bigger and bolder */}
          <h1
            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-foreground mb-8 leading-[0.9] tracking-tight transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block text-balance">Smaken av</span>
            <span className="block text-primary italic">Italien</span>
          </h1>

          {/* Subtitle - more compelling */}
          <p
            className={`text-muted-foreground text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed text-pretty transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
           Handgjord deg och ingredienser med kärlek. Beställ, hämta och njut.
          </p>

          {/* Info pills - better spacing */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-2.5 bg-card/40 backdrop-blur-md rounded-full px-5 py-2.5 border border-border/30">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-foreground/80 text-sm font-medium">Mån-Tor 16:30-21</span>
            </div>
            <div className="flex items-center gap-2.5 bg-card/40 backdrop-blur-md rounded-full px-5 py-2.5 border border-border/30">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-foreground/80 text-sm font-medium">Fre-Lor 11-22</span>
            </div>
            <div className="flex items-center gap-2.5 bg-card/40 backdrop-blur-md rounded-full px-5 py-2.5 border border-border/30">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-foreground/80 text-sm font-medium">Stortorget, Falkenberg</span>
            </div>
          </div>

          {/* CTA Buttons - bigger and more prominent */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="#meny">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-12 py-8 rounded-full shadow-2xl shadow-primary/30 transition-all duration-300 hover:shadow-[0_20px_60px_-12px_rgba(220,38,38,0.5)] hover:-translate-y-1.5 font-semibold"
              >
                Se Menyn
              </Button>
            </Link>
            <Link href="tel:0722562660">
              <Button
                size="lg"
                variant="outline"
                className="border-border/60 text-foreground hover:bg-card/60 text-lg px-12 py-8 rounded-full backdrop-blur-md bg-card/20 transition-all duration-300 hover:-translate-y-1.5 font-semibold"
              >
                <Phone className="w-5 h-5 mr-2.5" />
                0722-562660
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <Link href="#meny" className="flex flex-col items-center gap-3 group">
            <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase group-hover:text-foreground transition-colors">
              Utforska
            </span>
            <div className="w-8 h-12 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2 group-hover:border-primary/50 transition-colors">
              <div className="w-1 h-3 bg-primary rounded-full animate-bounce" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
