"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Phone, MessageCircle, Clock, Gift } from "lucide-react"

export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect to home after 10 seconds
    const timer = setTimeout(() => {
      router.push("/")
    }, 10000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6941c6] via-[#5a37b0] to-[#4e2d9a] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="hidden sm:block absolute top-20 left-20 w-16 h-16 bg-yellow-400 rounded-full opacity-80"></div>
      <div className="hidden sm:block absolute bottom-20 right-20 w-20 h-20 bg-yellow-400 rounded-full opacity-80"></div>

      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8 sm:p-12 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>

            {/* Main Message */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              신청이 완료되었습니다!
            </h1>

            <p className="text-lg text-gray-700 mb-8">
              빠른 시일 내에 전문 상담사가 연락드릴 예정입니다.
            </p>

            {/* Benefits Box */}
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-[#6941c6] mb-4">
                🎉 최대 140만원 혜택 확정!
              </h2>
              <p className="text-gray-700">
                고객님께 최적화된 요금제와 최대 혜택을 안내해드리겠습니다.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <Clock className="w-8 h-8 text-[#6941c6] mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">상담 시간</h3>
                <p className="text-sm text-gray-600">
                  평일 09:00 - 18:00<br />
                  토요일 10:00 - 14:00
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <Phone className="w-8 h-8 text-[#6941c6] mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">연락 예정</h3>
                <p className="text-sm text-gray-600">
                  영업일 기준<br />
                  24시간 이내
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <Gift className="w-8 h-8 text-[#6941c6] mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">추가 혜택</h3>
                <p className="text-sm text-gray-600">
                  사은품 증정<br />
                  현금 즉시 지급
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">
                빠른 상담을 원하신다면?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => window.open('tel:1588-0000')}
                >
                  <Phone className="w-4 h-4" />
                  전화 상담: 1588-0000
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                  onClick={() => window.open('http://pf.kakao.com/_example')}
                >
                  <MessageCircle className="w-4 h-4" />
                  카카오톡 상담
                </Button>
              </div>
            </div>

            {/* Notice */}
            <div className="text-sm text-gray-500 mb-6">
              <p className="mb-2">
                ※ 영업시간 외 신청 건은 다음 영업일에 순차적으로 연락드립니다.
              </p>
              <p>
                ※ 스팸 차단 설정 시 상담 전화를 받지 못하실 수 있으니 확인 부탁드립니다.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/")}
                className="bg-[#6941c6] hover:bg-[#5a37b0] text-white px-8 py-3"
              >
                홈으로 돌아가기
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/admin")}
                className="px-8 py-3"
              >
                신청 내역 확인
              </Button>
            </div>

            {/* Auto-redirect notice */}
            <p className="text-sm text-gray-400 mt-6">
              10초 후 자동으로 홈페이지로 이동합니다...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}