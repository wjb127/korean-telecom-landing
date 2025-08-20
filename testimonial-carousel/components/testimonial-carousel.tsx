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
    content:
      "우연히 알게된 인사통에서 상담하고 나니 궁금했던 내용들이 전부 해결됐어요, 너무 좋았어요 감사합니다 번창하세요 !!!",
    author: "@창영* 님 후기",
    date: "2025. 08. 19",
    rating: 5,
  },
  {
    id: 2,
    content: "기사님 방문해주셔서 인터넷 tv 설치완료해주셨어요~~",
    author: "@조정* 님 후기",
    date: "2025. 08. 19",
    rating: 5,
  },
  {
    id: 3,
    content: "사은품 많이 주셔서 감사해요",
    author: "@주승* 님 후기",
    date: "2025. 08. 19",
    rating: 5,
  },
  {
    id: 4,
    content: "친절하게 상담해주시고 빠른 설치 감사합니다!",
    author: "@민수* 님 후기",
    date: "2025. 08. 18",
    rating: 5,
  },
  {
    id: 5,
    content: "가격도 저렴하고 서비스도 만족스러워요",
    author: "@지영* 님 후기",
    date: "2025. 08. 18",
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    }, 4000) // 4초마다 변경

    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 ${index < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
      />
    ))
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <Card className="mx-4 bg-white shadow-lg border-0">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">{renderStars(testimonial.rating)}</div>

                  <div className="text-6xl text-gray-200 mb-4 leading-none">"</div>

                  <p className="text-lg text-gray-800 mb-8 leading-relaxed font-medium">{testimonial.content}</p>

                  <div className="bg-gray-100 rounded-full px-6 py-3 inline-block">
                    <p className="text-sm text-gray-600 mb-1">{testimonial.date}</p>
                    <p className="text-sm font-medium text-gray-800">{testimonial.author}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`후기 ${index + 1}로 이동`}
          />
        ))}
      </div>

      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
        <div
          className="bg-blue-500 h-1 rounded-full transition-all duration-100 ease-linear"
          style={{
            width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
