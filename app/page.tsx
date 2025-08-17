"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"

export default function TelecomLanding() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    carrier: "KT",
    service: "인터넷",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-400 rounded-full opacity-80"></div>
      <div className="absolute top-40 right-32 w-8 h-8 bg-yellow-300 rounded-full opacity-60"></div>
      <div className="absolute bottom-32 left-16 w-12 h-12 bg-yellow-400 rounded-full opacity-70"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-yellow-400 rounded-full opacity-80"></div>

      {/* Star decorations */}
      <div className="absolute top-32 left-1/2 text-white text-2xl opacity-60">✦</div>
      <div className="absolute top-60 right-1/4 text-white text-xl opacity-50">✦</div>
      <div className="absolute bottom-40 left-1/3 text-white text-lg opacity-40">✦</div>
      <div className="absolute bottom-60 right-1/3 text-white text-2xl opacity-60">✦</div>

      {/* Header */}
      <header className="flex justify-between items-center p-6 text-white">
        <div className="text-2xl font-bold">인싸통</div>
        <nav className="flex space-x-8 text-sm">
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
        <div className="flex items-center">
          <User className="w-6 h-6" />
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white space-y-6">
            <div className="inline-block bg-yellow-400 text-purple-800 px-6 py-2 rounded-full font-bold text-lg">
              최대가입지원금 인싸통
            </div>

            <div className="space-y-4">
              <p className="text-lg opacity-90">인터넷 · TV · 유심</p>
              <h1 className="text-5xl font-bold leading-tight">지금 통신사 변경하면?!</h1>
              <div className="text-4xl font-bold text-yellow-400 flex items-center gap-2">
                <span className="text-white">✨</span>
                최대 140만원 혜택
              </div>
              <p className="text-3xl font-bold">현금 당일 지급!</p>
            </div>

            <div className="space-y-2 text-lg">
              <p>인싸통에서 상담받고</p>
              <p>숨은 지원금 받아가세요!</p>
            </div>

            <p className="text-sm opacity-75">※ 지원 혜택은 통신사 및 상품에 따라 상이 합니다.</p>
          </div>

          {/* Right form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="bg-purple-600 text-white px-4 py-2 rounded-t-lg inline-block relative">
                    빠른견적문의
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <div className="flex mt-2 gap-2 items-center">
                      <Input
                        type="text"
                        value="010"
                        readOnly
                        className="h-12 w-20 text-center bg-gray-50 border-gray-200"
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
                        className="h-12 w-20"
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
                        className="h-12 w-20"
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
                          className={`py-3 px-4 rounded border text-center font-medium transition-colors ${
                            formData.carrier === carrier
                              ? "bg-purple-600 text-white border-purple-600"
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
                          className={`w-full py-3 px-4 rounded border text-center font-medium transition-colors ${
                            formData.service === service
                              ? "bg-purple-600 text-white border-purple-600"
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
                    className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-lg"
                  >
                    최대 지원금 확인 →
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
