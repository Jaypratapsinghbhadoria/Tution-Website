"use client"

import { useState, useRef, useEffect } from "react"
import { gsp } from "gsap"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    logo: "https://sjc.microlink.io/-C7Y8kkEA3o8RcffeLzrFP6d6_8EAEL4B3pR1ovDFVIo4FDlbhuiO_RmBsJdzvNDtKDbQgrPHNIUR9pZOEfBpw.jpeg",
    content:
      "Foundation First Academy has transformed our approach to learning. The interactive platform and personalized attention have made a significant difference in student engagement and performance.",
    author: "John Smith",
    role: "Parent & Education Advocate",
  },
  {
    logo: "https://sjc.microlink.io/-C7Y8kkEA3o8RcffeLzrFP6d6_8EAEL4B3pR1ovDFVIo4FDlbhuiO_RmBsJdzvNDtKDbQgrPHNIUR9pZOEfBpw.jpeg",
    content:
      "The quality of education and support provided by Foundation First Academy is exceptional. Students have shown remarkable improvement in their academic performance.",
    author: "Sarah Johnson",
    role: "High School Principal",
  },
  {
    logo: "https://sjc.microlink.io/-C7Y8kkEA3o8RcffeLzrFP6d6_8EAEL4B3pR1ovDFVIo4FDlbhuiO_RmBsJdzvNDtKDbQgrPHNIUR9pZOEfBpw.jpeg",
    content:
      "As a parent, I've seen tremendous growth in my child's confidence and academic abilities since joining Foundation First Academy. The personalized learning approach works wonders.",
    author: "Michael Chen",
    role: "Parent of Grade 8 Student",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="min-h-screen bg-[#001a1a] flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white">
              What our customers
              <br />
              say about us
            </h2>
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-[#1a3333] flex items-center justify-center hover:bg-[#1a3333] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#4d6666]">
                  <path
                    d="M15 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-[#1a3333] flex items-center justify-center hover:bg-[#1a3333] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#4d6666]">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden" ref={containerRef}>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 pr-8">
                  <Card className="p-12">
                    <CardContent>
                      <div className="flex items-center justify-between mb-12">
                        <Image
                          src={testimonial.logo || "/placeholder.svg"}
                          alt="Logo"
                          width={120}
                          height={40}
                          className="opacity-50"
                        />
                      </div>
                      <p className="text-text-secondary text-xl mb-12 leading-relaxed">"{testimonial.content}"</p>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-text-muted">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

