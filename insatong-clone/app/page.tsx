import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Phone, MapPin, CreditCard, Star, User, Instagram, MessageCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">인싸통</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">
                KT
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">
                LG
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">
                SK
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">
                스카이라이프
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">
                LG헬로비전
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">
                SK브로드
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">
                설치후기
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">
                이벤트
              </a>
            </nav>
            <div className="flex items-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  국내 최고의 혜택으로
                  <br />
                  안내해 드리겠습니다.
                </h2>
                <div className="space-y-2">
                  <p className="text-lg text-gray-300">오전 10:00 - 오후 06:00</p>
                  <p className="text-5xl font-bold">1555-1648</p>
                </div>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full">
                문의하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img src="/purple-smartphone-insatong.png" alt="인싸통 앱 스마트폰" className="w-80 h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-purple-600">인싸통</span>만의 특별 혜택
              <br />각 통신사 대표 상품
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* KT Plan */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <img src="/generic-letter-logo.png" alt="KT" className="h-10" />
                  <span className="text-sm text-purple-600 font-medium">최대지원금 확인하기 →</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  인터넷 베이직 500MB + TV
                  <br />
                  베이직
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 line-through">45,100원</p>
                  <p className="text-3xl font-bold text-purple-600">39,600원/월</p>
                </div>
              </CardContent>
            </Card>

            {/* SK Plan */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <img src="/sk-telecom-logo.png" alt="SK" className="h-10" />
                  <span className="text-sm text-purple-600 font-medium">최대지원금 확인하기 →</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  기가라이트 인터넷 500MB + BTV
                  <br />
                  스탠다드
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 line-through">46,200원</p>
                  <p className="text-3xl font-bold text-purple-600">39,600원/월</p>
                </div>
              </CardContent>
            </Card>

            {/* LG U+ Plan */}
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <img src="/lgu-logo.png" alt="LG U+" className="h-10" />
                  <span className="text-sm text-purple-600 font-medium">최대지원금 확인하기 →</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  와이파이 기본 500MB + TV
                  <br />
                  베이직
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 line-through">44,000원</p>
                  <p className="text-3xl font-bold text-purple-600">34,100원/월</p>
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
              <span className="text-purple-600">인싸통</span>에서는
              <br />
              모든 혜택을 받을 수 있어요
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <Card className="bg-purple-50 border-0 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  현금 지원 140만원 업계 1등
                  <br />
                  <span className="text-sm font-normal">(인터넷 48만원 + 인싸통 비밀지원금 +α)</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  요금은 본사 그대로, 현금은 업계 최고로
                  <br />
                  타업체보다 혜택이 적다면 차액의 120% 보상해드려요
                </p>
                <div className="mt-6">
                  <img src="/money-gifts-rainbow.png" alt="현금 지원 혜택" className="w-full max-w-sm" />
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <Card className="bg-blue-50 border-0 p-8">
                <div className="flex items-start justify-between">
                  <div>
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
                  <img src="/laptop-with-coins-3d.png" alt="맞춤 추천" className="w-24 h-24 ml-4" />
                </div>
              </Card>

              <Card className="bg-orange-50 border-0 p-8">
                <div className="flex items-start justify-between">
                  <div>
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
                  <img src="/3d-rocket-coins.png" alt="빠른 설치" className="w-24 h-24 ml-4" />
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
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-12 h-12 text-white" />
                </div>
                <ArrowRight className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-600 hidden md:block" />
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
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-12 h-12 text-white" />
                </div>
                <ArrowRight className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-600 hidden md:block" />
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
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="w-12 h-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">현금 입금</h3>
              <p className="text-gray-600">
                인싸통은 편한 기준 설치 당일 입금을
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
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">국내 최고의 혜택으로</h2>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img src="/purple-smartphone-insatong.png" alt="인싸통 앱" className="w-64 h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">인싸통</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <p>상호 컨우네트웍스 사이트명 인싸통 대표자명 엄승준 사업자등록번호 648-09-02569 대표번호 1555-1648</p>
                <p>주소 서울 구로구 디지털로34길 55 코오롱싸이언스밸리2차 904호</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <a href="#" className="hover:text-purple-200">
                    서비스이용약관
                  </a>
                  <a href="#" className="hover:text-purple-200">
                    개인정보처리방침
                  </a>
                  <span>Copyright 2025 © 인싸통.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Instagram className="w-5 h-5 text-purple-600" />
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">6</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Buttons */}
        <div className="fixed bottom-6 right-6 space-y-3">
          <Button className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg">
            <MessageCircle className="w-6 h-6" />
          </Button>
          <Button className="w-14 h-14 rounded-full bg-white hover:bg-gray-100 text-black shadow-lg">
            <ArrowRight className="w-6 h-6 rotate-[-90deg]" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
