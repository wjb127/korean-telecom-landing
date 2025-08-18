/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import AdminDashboard from '@/app/admin/page'

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  })
}))

// Mock fetch
global.fetch = jest.fn()

// Mock sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
}
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true
})

describe('AdminDashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSessionStorage.getItem.mockReturnValue(null)
  })

  it('shows login form when not authenticated', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('관리자 로그인')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('비밀번호를 입력하세요')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument()
  })
})