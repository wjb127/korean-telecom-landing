/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import TelecomLanding from '@/app/page'

// Mock fetch
global.fetch = jest.fn()

describe('TelecomLanding Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the landing page with main heading', () => {
    render(<TelecomLanding />)
    
    // Check header
    expect(screen.getByText('인싸통')).toBeInTheDocument()
    
    // Check main content
    expect(screen.getByText('최대가입지원금 인싸통')).toBeInTheDocument()
    expect(screen.getByText(/최대 140만원 혜택/)).toBeInTheDocument()
    expect(screen.getByText('현금 당일 지급!')).toBeInTheDocument()
  })

  it('renders the form elements', () => {
    render(<TelecomLanding />)
    
    // Check form
    expect(screen.getByText('빠른견적문의')).toBeInTheDocument()
    expect(screen.getByLabelText('이름')).toBeInTheDocument()
    expect(screen.getByText('휴대폰 번호')).toBeInTheDocument()
    expect(screen.getByText('희망 통신사 선택')).toBeInTheDocument()
    expect(screen.getByText('희망 상품 선택')).toBeInTheDocument()
  })
})