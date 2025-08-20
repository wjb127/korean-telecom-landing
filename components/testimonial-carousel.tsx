"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Testimonial {
  id: number
  content: string
  author: string
  date: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "사은품 많이 주셔서 감사해요",
    author: "@주승* 님 후기",
    date: "2025. 08. 19",
    rating: 5,
  },
  {
    id: 2,
    content: "우연히 알게된 인사통에서 상담하고 나니 궁금했던 내용들이 전부 해결됐어요, 너무 좋았어요 감사합니다 번창하세요 !!!",
    author: "@창영* 님 후기",
    date: "2025. 08. 19",
    rating: 5,
  },
  {
    id: 3,
    content: "기사님 방문해주셔서 인터넷 tv 설치완료해주셨어요~~",
    author: "@조정* 님 후기",
    date: "2025. 08. 19",
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    }, 4000) // 4초마다 자동 스크롤

    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-8 h-8 ${index < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
      />
    ))
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <div className="text-center">
                <div className="flex justify-center mb-6">{renderStars(testimonial.rating)}</div>
                
                <blockquote className="text-3xl font-bold text-gray-900 mb-8">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="text-gray-600">
                  <p className="text-sm mb-1">{testimonial.date}</p>
                  <p className="font-medium">{testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 인디케이터 도트 */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-purple-600 w-8" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`후기 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  )
}