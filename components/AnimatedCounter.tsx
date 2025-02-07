"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface AnimatedCounterProps {
  end: number
  duration: number
  label: string
}

export default function AnimatedCounter({ end, duration, label }: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const counter = counterRef.current
    if (counter) {
      gsap.fromTo(
        counter,
        { innerText: "0" },
        {
          innerText: end,
          duration: duration,
          ease: "power2.out",
          snap: { innerText: 1 },
          stagger: {
            each: 0.1,
            onUpdate: function () {
              this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerText).toString()
            },
          },
        },
      )
    }
  }, [end, duration])

  return (
    <div className="text-center">
      <span ref={counterRef} className="text-4xl font-bold text-accent"></span>
      <span className="text-4xl font-bold text-accent">+</span>
      <p className="mt-2 text-xl text-gray-300">{label}</p>
    </div>
  )
}

