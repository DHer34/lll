"use client"

import { useEffect, useState } from "react"

interface GlowElement {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function BubbleEffects() {
  const [elements, setElements] = useState<GlowElement[]>([])

  useEffect(() => {
    const glows: GlowElement[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 400 + 200,
      duration: Math.random() * 30 + 25,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.03 + 0.01,
    }))
    setElements(glows)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float-gentle"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          <div
            className="w-full h-full rounded-full bg-primary blur-[100px]"
            style={{ opacity: el.opacity }}
          />
        </div>
      ))}
    </div>
  )
}
