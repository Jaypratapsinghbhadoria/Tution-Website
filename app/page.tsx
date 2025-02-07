"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/HeroSection"
import FeaturesSection from "@/components/FeaturesSection"
import AboutSection from "@/components/AboutSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import ContactAndFeedbackSection from "@/components/ContactAndFeedbackSection"
import AnimatedCounter from "@/components/AnimatedCounter"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const sections = sectionRefs.current

    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    // Animate the hero section
    gsap.fromTo("#hero-content", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" })

    gsap.fromTo("#hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" })

    // Animate the 3D book
    gsap.fromTo(
      "#hero-book",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 0.2, ease: "elastic.out(1, 0.5)" },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-site-bg text-text-primary overflow-hidden">
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 md:py-32 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2" id="hero-content">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
              Welcome to Foundation First Academy
            </h1>
            <p className="text-xl mb-8 text-text-secondary">Empowering Learning with Technology</p>
            <div id="hero-cta" className="space-x-4">
              <Button asChild className="bg-card-bg text-text-primary hover:bg-hover-bg">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="text-text-primary border-border-color hover:bg-hover-bg">
                <Link href="#about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0" id="hero-book">
            <HeroSection />
          </div>
        </section>

        {/* Stats Section */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <AnimatedCounter end={5000} duration={2.5} label="Students Enrolled" />
          <AnimatedCounter end={100} duration={2.5} label="Expert Tutors" />
          <AnimatedCounter end={500} duration={2.5} label="Interactive Courses" />
        </section>

        {/* Features Section */}
        <section ref={(el) => (sectionRefs.current[1] = el)} className="py-20">
          <FeaturesSection />
        </section>

        {/* About Section */}
        <section ref={(el) => (sectionRefs.current[2] = el)} className="py-20">
          <AboutSection />
        </section>

        {/* How It Works Section */}
        <section ref={(el) => (sectionRefs.current[3] = el)} className="py-20">
          <HowItWorksSection />
        </section>

        {/* Testimonials Section */}
        <section ref={(el) => (sectionRefs.current[4] = el)} className="py-20">
          <TestimonialsSection />
        </section>

        {/* Contact and Feedback Section */}
        <section ref={(el) => (sectionRefs.current[5] = el)} className="py-20">
          <ContactAndFeedbackSection />
        </section>

        {/* CTA Section */}
        <section ref={(el) => (sectionRefs.current[6] = el)} className="py-20 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Start Your Learning Journey?</h2>
          <Button asChild size="lg" className="bg-card-bg text-text-primary hover:bg-hover-bg">
            <Link href="/signup">Sign Up Now</Link>
          </Button>
        </section>
      </main>
    </div>
  )
}

