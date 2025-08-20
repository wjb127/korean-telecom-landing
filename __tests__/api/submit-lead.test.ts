/**
 * @jest-environment node
 */

import { POST } from '@/app/api/submit-lead/route'
import { NextRequest } from 'next/server'

// Mock the supabase admin client
jest.mock('@/lib/supabase-admin', () => ({
  supabaseAdmin: null // This will use mock data path
}))

describe('/api/submit-lead', () => {
  it('should validate required fields', async () => {
    const request = new NextRequest('http://localhost/api/submit-lead', {
      method: 'POST',
      body: JSON.stringify({
        name: '',
        phone: '',
        carrier: '',
        service: ''
      })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('필수 항목을 모두 입력해주세요.')
  })

  it('should validate phone format', async () => {
    const request = new NextRequest('http://localhost/api/submit-lead', {
      method: 'POST',
      body: JSON.stringify({
        name: '홍길동',
        phone: '12345678', // Invalid format
        carrier: 'KT',
        service: '인터넷'
      })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('올바른 전화번호 형식이 아닙니다.')
  })

  it('should accept valid lead submission', async () => {
    const request = new NextRequest('http://localhost/api/submit-lead', {
      method: 'POST',
      headers: {
        'user-agent': 'Mozilla/5.0 Test',
        'x-forwarded-for': '192.168.1.1'
      },
      body: JSON.stringify({
        name: '홍길동',
        phone: '1234-5678',
        carrier: 'KT',
        service: '인터넷+TV'
      })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toContain('상담 신청이 완료되었습니다')
    expect(data.data).toMatchObject({
      name: '홍길동',
      phone: '010-1234-5678',
      carrier: 'KT',
      service: '인터넷+TV'
    })
  })

  it('should handle all carrier types', async () => {
    const carriers = ['KT', 'SKT', 'LG U+', '알뜰폰']
    
    for (const carrier of carriers) {
      const request = new NextRequest('http://localhost/api/submit-lead', {
        method: 'POST',
        body: JSON.stringify({
          name: '테스트',
          phone: '1111-2222',
          carrier,
          service: '인터넷'
        })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.carrier).toBe(carrier)
    }
  })

  it('should handle all service types', async () => {
    const services = ['인터넷', '인터넷+TV', '인터넷+TV+전화']
    
    for (const service of services) {
      const request = new NextRequest('http://localhost/api/submit-lead', {
        method: 'POST',
        body: JSON.stringify({
          name: '테스트',
          phone: '3333-4444',
          carrier: 'KT',
          service
        })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.service).toBe(service)
    }
  })

  it('should capture IP address and user agent', async () => {
    const request = new NextRequest('http://localhost/api/submit-lead', {
      method: 'POST',
      headers: {
        'user-agent': 'TestBrowser/1.0',
        'x-forwarded-for': '10.0.0.1, 192.168.1.1',
        'x-real-ip': '172.16.0.1'
      },
      body: JSON.stringify({
        name: '테스트',
        phone: '5555-6666',
        carrier: 'SKT',
        service: '인터넷'
      })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.data.ip_address).toBe('10.0.0.1')
    expect(data.data.user_agent).toBe('TestBrowser/1.0')
  })
})