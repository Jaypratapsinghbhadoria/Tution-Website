"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Compass, GraduationCap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorksSection() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.children
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  return (
    <section className="my-16">
      <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Simple Steps to Get Started
      </h2>
      <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
        <StepCard
          icon={<UserPlus className="w-12 h-12 mb-4" />}
          title="1. Sign Up"
          content="Create your account and choose your role (student or teacher)."
          gradient="from-blue-400 to-teal-400"
        />
        <StepCard
          icon={<Compass className="w-12 h-12 mb-4" />}
          title="2. Explore"
          content="Browse through available courses, quizzes, and study materials."
          gradient="from-purple-400 to-pink-400"
        />
        <StepCard
          icon={<GraduationCap className="w-12 h-12 mb-4" />}
          title="3. Learn"
          content="Engage with the content, take quizzes, and track your progress."
          gradient="from-orange-400 to-red-400"
        />
      </div>
    </section>
  )
}

interface StepCardProps {
  icon: React.ReactNode
  title: string
  content: string
  gradient: string
}

function StepCard({ icon, title, content, gradient }: StepCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <CardHeader>
        <CardTitle className="flex flex-col items-center text-center">
          <div className="transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <h3 className="text-2xl font-bold mt-4">{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-text-secondary">{content}</p>
      </CardContent>
    </Card>
  )
}

