"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, PenTool, TrendingUp, Zap, Users, Award } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const features = featuresRef.current
    if (features) {
      gsap.fromTo(
        features.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: features,
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
      <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
        What We Offer
      </h2>
      <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Book className="w-12 h-12 mb-4" />}
          title="Interactive Learning"
          content="Engage with dynamic lessons and multimedia content for an immersive educational experience."
          gradient="from-purple-400 to-indigo-500"
        />
        <FeatureCard
          icon={<PenTool className="w-12 h-12 mb-4" />}
          title="Adaptive Practice"
          content="Personalized quizzes and exercises that adapt to your learning pace and style."
          gradient="from-green-400 to-cyan-500"
        />
        <FeatureCard
          icon={<TrendingUp className="w-12 h-12 mb-4" />}
          title="Progress Tracking"
          content="Visualize your academic growth with detailed analytics and performance insights."
          gradient="from-pink-400 to-red-500"
        />
        <FeatureCard
          icon={<Zap className="w-12 h-12 mb-4" />}
          title="Instant Feedback"
          content="Receive immediate responses and explanations to enhance your understanding."
          gradient="from-yellow-400 to-orange-500"
        />
        <FeatureCard
          icon={<Users className="w-12 h-12 mb-4" />}
          title="Collaborative Learning"
          content="Connect with peers and tutors for group study sessions and discussions."
          gradient="from-teal-400 to-blue-500"
        />
        <FeatureCard
          icon={<Award className="w-12 h-12 mb-4" />}
          title="Achievements & Rewards"
          content="Earn badges and certificates as you reach milestones in your learning journey."
          gradient="from-fuchsia-400 to-purple-500"
        />
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  content,
  gradient,
}: {
  icon: React.ReactNode
  title: string
  content: string
  gradient: string
}) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
      <CardHeader>
        <CardTitle className="flex flex-col items-center text-center">
          <div className="bg-hover-bg p-4 rounded-full mb-4">{icon}</div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-text-secondary">{content}</p>
      </CardContent>
    </Card>
  )
}

