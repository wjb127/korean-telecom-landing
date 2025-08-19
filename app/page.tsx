"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { User, Menu, X, ArrowRight, Phone, MapPin, CreditCard, Star, Instagram, MessageCircle } from "lucide-react"
import Image from "next/image"

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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <>
      {/* Fixed Header for Desktop */}
      <header className={`fixed top-0 left-0 right-0 z-50 hidden lg:block transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16 px-6">
            <div className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-[#6941c6]' : 'text-white'
            }`}>인싸통</div>
            <nav className="flex items-center space-x-8">
              <a href="/kt" className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#6941c6]' 
                  : 'text-white hover:text-yellow-300'
              }`}>
                KT
              </a>
              <a href="/lg" className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#6941c6]' 
                  : 'text-white hover:text-yellow-300'
              }`}>
                LG
              </a>
              <a href="/sk" className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#6941c6]' 
                  : 'text-white hover:text-yellow-300'
              }`}>
                SK
              </a>
              <a href="/skylife" className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#6941c6]' 
                  : 'text-white hover:text-yellow-300'
              }`}>
                스카이라이프
              </a>
              <a href="/lghellovision" className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#6941c6]' 
                  : 'text-white hover:text-yellow-300'
              }`}>
                LG헬로비전
              </a>
              <a href="/skbroad" className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#6941c6]' 
                  : 'text-white hover:text-yellow-300'
              }`}>
                SK브로드
              </a>
              <a href="/review" className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#6941c6]' 
                  : 'text-white hover:text-yellow-300'
              }`}>
                설치후기
              </a>
              <a href="/events" className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#6941c6]' 
                  : 'text-white hover:text-yellow-300'
              }`}>
                이벤트
              </a>
            </nav>
            <div className="flex items-center">
              <User className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-gray-600' : 'text-white'
              }`} />
            </div>
          </div>
        </div>
      </header>

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

        {/* Desktop padding for transparent header */}
        <div className="hidden lg:block h-16"></div>
        
        {/* Mobile Header */}
        <header className="relative lg:hidden">
          <div className="flex justify-between items-center p-4 md:p-6 text-white">
            <div className="text-xl md:text-2xl font-bold">인싸통</div>
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
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden absolute top-full left-0 right-0 bg-[#6941c6]/95 backdrop-blur-sm border-t border-white/20 z-50">
              <div className="flex flex-col p-4 space-y-3">
                <a href="/kt" className="text-white hover:text-yellow-300 transition-colors py-2">
                  KT
                </a>
                <a href="/lg" className="text-white hover:text-yellow-300 transition-colors py-2">
                  LG
                </a>
                <a href="/sk" className="text-white hover:text-yellow-300 transition-colors py-2">
                  SK
                </a>
                <a href="/skylife" className="text-white hover:text-yellow-300 transition-colors py-2">
                  스카이라이프
                </a>
                <a href="/lghellovision" className="text-white hover:text-yellow-300 transition-colors py-2">
                  LG헬로비전
                </a>
                <a href="/skbroad" className="text-white hover:text-yellow-300 transition-colors py-2">
                  SK브로드
                </a>
                <a href="/review" className="text-white hover:text-yellow-300 transition-colors py-2">
                  설치후기
                </a>
                <a href="/events" className="text-white hover:text-yellow-300 transition-colors py-2">
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

      {/* Plans Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-[#6941c6]">인싸통</span>만의 특별 혜택
              <br />각 통신사 대표 상품
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* KT Plan */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-blue-600">KT</span>
                  <span className="text-sm text-[#6941c6] font-medium cursor-pointer hover:underline">
                    최대지원금 확인하기 →
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  인터넷 베이직 500MB + TV
                  <br />
                  베이직
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 line-through">45,100원</p>
                  <p className="text-3xl font-bold text-[#6941c6]">39,600원/월</p>
                </div>
              </CardContent>
            </Card>

            {/* SK Plan */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-red-600">SK</span>
                  <span className="text-sm text-[#6941c6] font-medium cursor-pointer hover:underline">
                    최대지원금 확인하기 →
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  기가라이트 인터넷 500MB + BTV
                  <br />
                  스탠다드
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 line-through">46,200원</p>
                  <p className="text-3xl font-bold text-[#6941c6]">39,600원/월</p>
                </div>
              </CardContent>
            </Card>

            {/* LG U+ Plan */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-pink-600">LG U+</span>
                  <span className="text-sm text-[#6941c6] font-medium cursor-pointer hover:underline">
                    최대지원금 확인하기 →
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  와이파이 기본 500MB + TV
                  <br />
                  베이직
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 line-through">44,000원</p>
                  <p className="text-3xl font-bold text-[#6941c6]">34,100원/월</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-[#6941c6]">인싸통</span>에서는
              <br />
              모든 혜택을 받을 수 있어요
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <Card className="bg-purple-50 border-0 p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  현금 지원 140만원 업계 1등
                  <br />
                  <span className="text-lg font-bold text-gray-800">(인터넷 48만원 + 인싸통 비밀지원금 +α)</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  요금은 본사 그대로, 현금은 업계 최고로
                  <br />
                  타업체보다 혜택이 적다면 차액의 120% 보상해드려요
                </p>
                <div className="mt-6 flex justify-center">
                  <Image 
                    src="/art1.png" 
                    alt="현금 지원 혜택" 
                    width={300} 
                    height={200}
                    className="object-contain"
                  />
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <Card className="bg-blue-50 border-0 p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      고민할 필요 없이
                      <br />
                      맞춤으로 추천해드려요
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      불필요한 부가서비스를 강요하지 않아요
                      <br />
                      전문 매니저가 1:1 맞춤으로 서비스를 찾아드려요
                      <br />
                      쉽고 빠르게 대표 통신사 3사 전부 비교 가능
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Image 
                      src="/art2.png" 
                      alt="맞춤 추천 서비스" 
                      width={180} 
                      height={180}
                      className="object-contain"
                    />
                  </div>
                </div>
              </Card>

              <Card className="bg-orange-50 border-0 p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      더는 기다리지 마세요
                      <br />
                      빠르게 설치해드릴게요
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      고객님이 원하는 일정,
                      <br />
                      가장 빠른 날짜로 설치해드려요
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Image 
                      src="/art3.png" 
                      alt="빠른 설치 서비스" 
                      width={180} 
                      height={180}
                      className="object-contain"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              어려운 가입 과정을
              <br />
              쉽고 간편하게 가입하세요
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto flex items-center justify-center mb-4">
                  <Image 
                    src="/call-icon.png" 
                    alt="가입상담" 
                    width={96} 
                    height={96}
                    className="object-contain"
                  />
                </div>
                <ArrowRight className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#6941c6] hidden md:block" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">가입상담</h3>
              <p className="text-gray-600">
                친절한 무료상담으로 다양한 통신사 혜택
                <br />
                전부 비교 가능해요.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto flex items-center justify-center mb-4">
                  <Image 
                    src="/map-pin-icon.png" 
                    alt="설치" 
                    width={96} 
                    height={96}
                    className="object-contain"
                  />
                </div>
                <ArrowRight className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#6941c6] hidden md:block" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">설치</h3>
              <p className="text-gray-600">
                고객님이 원하시는 날짜를 조율하여
                <br />
                설치가 가능합니다.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto flex items-center justify-center mb-4">
                  <Image 
                    src="/money-icon.png" 
                    alt="현금 입금" 
                    width={96} 
                    height={96}
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">현금 입금</h3>
              <p className="text-gray-600">
                인싸통은 평일 기준 설치 당일 입금을
                <br />
                원칙으로 하고 있어요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-3xl font-bold text-gray-900 mb-8">"사은품 많이 주셔서 감사해요"</blockquote>
          <div className="text-gray-600">
            <p>2025. 08. 19 @주승* 님 후기</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white py-32 md:py-40 lg:py-48" style={{
        backgroundImage: 'url("/spi.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '500px'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left flex flex-col justify-center" style={{ minHeight: '400px' }}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
            국내 최고의 혜택으로
            <br />
            안내해 드리겠습니다.
          </h2>
          <div className="space-y-2 mb-8">
            <p className="text-lg text-white/90">오전 10:00 ~ 오후 06:00</p>
            <p className="text-5xl font-bold text-white">1555-1648</p>
          </div>
          <div className="flex justify-start">
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#6941c6] hover:bg-[#5a37b0] text-white px-8 py-4 text-lg font-bold rounded-full"
            >
              문의하기
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#6941c6] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">인싸통</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <p>상호: 건우네트웍스 | 사이트명: 인싸통 | 대표자명: 엄승준</p>
                <p>사업자등록번호: 648-09-02569 | 대표번호: 1555-1648</p>
                <p>주소: 서울 구로구 디지털로34길 55 코오롱싸이언스밸리2차 904호</p>
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="hover:text-purple-200">서비스이용약관</a>
                  <a href="#" className="hover:text-purple-200 font-bold">개인정보처리방침</a>
                  <a href="#" className="hover:text-purple-200">마케팅정보수신동의</a>
                </div>
                <p className="text-xs text-purple-200">
                  ※ 본 사이트는 통신사 공식 사이트가 아닌 통신서비스 판매 대리점입니다.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#5a37b0] pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">Copyright 2025 © 인싸통. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Floating Buttons */}
        <div className="fixed bottom-6 right-6 space-y-3 z-50">
          <Button 
            onClick={() => window.open('http://pf.kakao.com/_xomaXn', '_blank')}
            className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <Button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 rounded-full bg-white hover:bg-gray-100 text-black shadow-lg"
          >
            <ArrowRight className="w-6 h-6 rotate-[-90deg]" />
          </Button>
        </div>
      </footer>
    </>
  )
}