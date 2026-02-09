"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function PizzaIntro() {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 200)
    const t2 = setTimeout(() => setStage(2), 700)
    const t3 = setTimeout(() => setStage(3), 1200)
    const t4 = setTimeout(() => setStage(4), 1600)
    const fadeTimer = setTimeout(() => setFadeOut(true), 2800)
    const hideTimer = setTimeout(() => setShow(false), 3600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "#0c0a09" }}
    >
      {/* Animated glow rings */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 transition-all duration-[2000ms] ease-out ${
          stage >= 1 ? "w-[600px] h-[600px] opacity-100" : "w-0 h-0 opacity-0"
        }`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5 transition-all duration-[2500ms] ease-out ${
          stage >= 2 ? "w-[900px] h-[900px] opacity-100" : "w-0 h-0 opacity-0"
        }`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[200px] transition-opacity duration-1000 ${
          stage >= 1 ? "opacity-100" : "opacity-0"
        }`} />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center z-10">
        {/* Logo */}
        <div className={`relative w-48 h-48 md:w-64 md:h-64 transition-all duration-1000 ease-out ${
          stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}>
          <Image
            src="/images/logo.png"
            alt="Take & Go"
            width={256}
            height={256}
            className="object-contain drop-shadow-[0_0_60px_rgba(220,38,38,0.5)]"
            priority
          />
        </div>

        {/* Title */}
        <h1 className={`mt-8 text-4xl md:text-6xl font-serif font-bold text-foreground transition-all duration-700 ease-out ${
          stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          Take & Go
        </h1>

        {/* Subtitle */}
        <p className={`mt-4 text-muted-foreground text-lg md:text-xl tracking-[0.3em] uppercase transition-all duration-700 ease-out ${
          stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          Falkenberg
        </p>

        {/* Tagline */}
        <p className={`mt-3 text-primary/80 text-sm tracking-widest uppercase transition-all duration-700 ease-out ${
          stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          Pizza & Burgare
        </p>

        {/* Red line accent */}
        <div className={`mt-8 h-0.5 bg-primary rounded-full transition-all duration-1000 ease-out ${
          stage >= 3 ? "w-20 opacity-100" : "w-0 opacity-0"
        }`} />
      </div>
    </div>
  )
}
