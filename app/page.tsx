"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { User, Menu, X } from "lucide-react"

export default function TelecomLanding() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    carrier: "KT",
    service: "인터넷",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to thank you page on success
        router.push("/thank-you")
      } else {
        setSubmitMessage("제출 중 오류가 발생했습니다. 다시 시도해주세요.")
      }
    } catch (error) {
      console.error("Submit error:", error)
      setSubmitMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6941c6] via-[#5a37b0] to-[#4e2d9a] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="hidden sm:block absolute top-20 left-20 w-16 h-16 bg-yellow-400 rounded-full opacity-80"></div>
      <div className="hidden sm:block absolute top-40 right-32 w-8 h-8 bg-yellow-300 rounded-full opacity-60"></div>
      <div className="hidden sm:block absolute bottom-32 left-16 w-12 h-12 bg-yellow-400 rounded-full opacity-70"></div>
      <div className="hidden sm:block absolute bottom-20 right-20 w-20 h-20 bg-yellow-400 rounded-full opacity-80"></div>

      {/* Star decorations */}
      <div className="hidden sm:block absolute top-32 left-1/2 text-white text-2xl opacity-60">✦</div>
      <div className="hidden sm:block absolute top-60 right-1/4 text-white text-xl opacity-50">✦</div>
      <div className="hidden sm:block absolute bottom-40 left-1/3 text-white text-lg opacity-40">✦</div>
      <div className="hidden sm:block absolute bottom-60 right-1/3 text-white text-2xl opacity-60">✦</div>

      {/* Header */}
      <header className="relative">
        <div className="flex justify-between items-center p-4 md:p-6 text-white">
          <div className="text-xl md:text-2xl font-bold">인싸통</div>
          <nav className="hidden lg:flex space-x-6 xl:space-x-8 text-sm">
            <a href="#" className="hover:text-yellow-300 transition-colors">
              KT
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              LG
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              SK
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              스카이라이프
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              LG헬로비전
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              SK브로드
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              설치후기
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              이벤트
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 md:w-6 md:h-6 hidden lg:block" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden absolute top-full left-0 right-0 bg-[#6941c6]/95 backdrop-blur-sm border-t border-white/20">
            <div className="flex flex-col p-4 space-y-3">
              <a href="#" className="text-white hover:text-yellow-300 transition-colors py-2">
                KT
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors py-2">
                LG
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors py-2">
                SK
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors py-2">
                스카이라이프
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors py-2">
                LG헬로비전
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors py-2">
                SK브로드
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors py-2">
                설치후기
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors py-2">
                이벤트
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="text-white space-y-6 text-center lg:text-left">
            <div className="inline-block bg-yellow-400 text-[#6941c6] px-4 sm:px-6 py-2 rounded-full font-bold text-base sm:text-lg">
              최대가입지원금 인싸통
            </div>

            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg opacity-90">인터넷 · TV · 유심</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block">지금 통신사</span>
                <span className="block">변경하면?!</span>
                <span className="block text-yellow-400 text-2xl sm:text-3xl lg:text-4xl mt-2">최대</span>
                <span className="block text-yellow-400 text-3xl sm:text-4xl lg:text-5xl">140만원 혜택</span>
                <span className="block text-white text-xl sm:text-2xl lg:text-3xl mt-2">현금</span>
                <span className="block text-white text-xl sm:text-2xl lg:text-3xl">당일 지급!</span>
              </h1>
            </div>

            <div className="space-y-2 text-base sm:text-lg">
              <p>인싸통에서 상담받고</p>
              <p>숨은 지원금 받아가세요!</p>
            </div>

            <p className="text-xs sm:text-sm opacity-75">※ 지원 혜택은 통신사 및 상품에 따라 상이 합니다.</p>
          </div>

          {/* Right form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 text-center lg:text-left">
                  <div className="bg-[#6941c6] text-white px-4 py-2 rounded-full inline-block relative">
                    빠른견적문의
                  </div>
                </div>

                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      이름
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      휴대폰 번호
                    </Label>
                    <div className="flex mt-2 gap-1 sm:gap-2 items-center">
                      <Input
                        type="text"
                        value="010"
                        readOnly
                        className="h-10 sm:h-12 w-16 sm:w-20 text-center bg-gray-50 border-gray-200 text-sm sm:text-base"
                      />
                      <span className="text-gray-400">-</span>
                      <Input
                        type="tel"
                        value={formData.phone.split("-")[0] || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                          const secondPart = formData.phone.split("-")[1] || ""
                          setFormData({ ...formData, phone: `${value}-${secondPart}` })
                        }}
                        className="h-10 sm:h-12 w-16 sm:w-20 text-sm sm:text-base"
                        placeholder="1234"
                        maxLength={4}
                        required
                      />
                      <span className="text-gray-400">-</span>
                      <Input
                        type="tel"
                        value={formData.phone.split("-")[1] || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                          const firstPart = formData.phone.split("-")[0] || ""
                          setFormData({ ...formData, phone: `${firstPart}-${value}` })
                        }}
                        className="h-10 sm:h-12 w-16 sm:w-20 text-sm sm:text-base"
                        placeholder="5678"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium">희망 통신사 선택</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {["KT", "LG", "SKT"].map((carrier) => (
                        <button
                          key={carrier}
                          type="button"
                          onClick={() => setFormData({ ...formData, carrier })}
                          className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded border text-center font-medium transition-colors text-sm sm:text-base ${
                            formData.carrier === carrier
                              ? "bg-[#6941c6] text-white border-[#6941c6]"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {carrier}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium">희망 상품 선택</Label>
                    <div className="space-y-2 mt-2">
                      {["인터넷", "인터넷+TV", "인터넷+TV+전화"].map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => setFormData({ ...formData, service })}
                          className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded border text-center font-medium transition-colors text-sm sm:text-base ${
                            formData.service === service
                              ? "bg-[#6941c6] text-white border-[#6941c6]"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" id="privacy" className="rounded" required />
                    <label htmlFor="privacy">개인정보 수집 및 이용에 동의합니다.</label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-14 bg-[#6941c6] hover:bg-[#5a37b0] text-white font-bold text-base sm:text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "제출 중..." : "최대 지원금 확인 →"}
                  </Button>

                  {submitMessage && (
                    <div className={`mt-4 p-2.5 sm:p-3 rounded text-center text-sm sm:text-base ${
                      submitMessage.includes("성공") 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
