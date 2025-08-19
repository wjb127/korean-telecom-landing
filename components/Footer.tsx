import Link from "next/link"
import { Phone, MessageCircle, Clock, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* 상단 섹션 */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 회사 정보 */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">인싸통</h3>
              <div className="space-y-2 text-sm">
                <p>대표: 홍길동</p>
                <p>사업자등록번호: 123-45-67890</p>
                <p>통신판매업신고: 제2024-서울강남-1234호</p>
              </div>
            </div>

            {/* 고객센터 */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">고객센터</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-xl font-bold text-yellow-400">1555-1648</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>평일 09:00 ~ 18:00</span>
                </div>
                <div className="text-sm">
                  <p>토요일 09:00 ~ 13:00</p>
                  <p className="text-gray-500">일요일/공휴일 휴무</p>
                </div>
              </div>
            </div>

            {/* 빠른 링크 */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">서비스</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/kt" className="hover:text-white transition-colors">
                    KT 인터넷/TV
                  </Link>
                </li>
                <li>
                  <Link href="/lg" className="hover:text-white transition-colors">
                    LG U+ 인터넷/TV
                  </Link>
                </li>
                <li>
                  <Link href="/sk" className="hover:text-white transition-colors">
                    SK브로드밴드
                  </Link>
                </li>
                <li>
                  <Link href="/mobile" className="hover:text-white transition-colors">
                    알뜰폰/유심
                  </Link>
                </li>
              </ul>
            </div>

            {/* 상담 신청 */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">빠른 상담</h3>
              <div className="space-y-3">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  카카오톡 상담
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  온라인 상담신청
                </button>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>서울특별시 강남구 테헤란로 123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 섹션 */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="hover:text-white transition-colors">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors font-bold">
              개인정보처리방침
            </Link>
            <Link href="/marketing" className="hover:text-white transition-colors">
              마케팅정보수신동의
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              사이트맵
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            © 2024 인싸통. All rights reserved.
          </div>
        </div>
        
        {/* 추가 안내사항 */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center md:text-left">
            ※ 본 사이트는 통신사 공식 사이트가 아닌 통신서비스 판매 대리점입니다. 
            서비스 가입 시 현금 지원금은 대리점에서 제공하는 혜택이며, 통신사 약정 조건과는 별개입니다.
            실제 서비스 요금 및 약정 조건은 통신사 정책에 따라 변경될 수 있습니다.
          </p>
        </div>
      </div>
    </footer>
  )
}