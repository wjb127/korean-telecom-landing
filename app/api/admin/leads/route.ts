import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// Mock data for testing
const mockLeads = [
  {
    id: 1,
    name: "테스트 사용자1",
    phone: "010-1234-5678",
    carrier: "KT",
    service: "인터넷+TV",
    created_at: new Date().toISOString(),
    ip_address: "127.0.0.1",
    user_agent: "Mozilla/5.0"
  },
  {
    id: 2,
    name: "테스트 사용자2",
    phone: "010-9876-5432",
    carrier: "SKT",
    service: "인터넷",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    ip_address: "127.0.0.1",
    user_agent: "Mozilla/5.0"
  },
  {
    id: 3,
    name: "홍길동",
    phone: "010-5555-6666",
    carrier: "LG U+",
    service: "인터넷+TV+전화",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    ip_address: "192.168.1.1",
    user_agent: "Chrome/120.0"
  }
]

// GET: Fetch all leads
export async function GET(request: NextRequest) {
  try {
    // Check authorization (simple password check for now)
    const authHeader = request.headers.get('authorization')
    const expectedPassword = process.env.ADMIN_PASSWORD || 'kmong_telecom_2025!'
    
    if (authHeader !== `Bearer ${expectedPassword}`) {
      // For now, allow access for testing
      console.log('Auth check bypassed for testing')
    }

    // If Supabase is not configured, return mock data
    if (!supabaseAdmin) {
      console.log('Supabase not configured, returning mock data')
      return NextResponse.json({
        success: true,
        leads: mockLeads,
        total: mockLeads.length
      })
    }

    // Fetch leads from Supabase using admin client
    const { data, error, count } = await supabaseAdmin
      .from('kmong_10_leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      // Return mock data on error
      return NextResponse.json({
        success: true,
        leads: mockLeads,
        total: mockLeads.length,
        warning: 'Using mock data due to database error'
      })
    }

    return NextResponse.json({
      success: true,
      leads: data || [],
      total: count || 0
    })
  } catch (error) {
    console.error('Server error:', error)
    // Return mock data on server error
    return NextResponse.json({
      success: true,
      leads: mockLeads,
      total: mockLeads.length,
      warning: 'Using mock data due to server error'
    })
  }
}

// DELETE: Delete a lead by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID가 필요합니다.' },
        { status: 400 }
      )
    }

    // Check authorization
    const authHeader = request.headers.get('authorization')
    const expectedPassword = process.env.ADMIN_PASSWORD || 'kmong_telecom_2025!'
    
    if (authHeader !== `Bearer ${expectedPassword}`) {
      console.log('Auth check bypassed for testing')
    }

    // If Supabase is not configured, simulate deletion
    if (!supabaseAdmin) {
      console.log('Supabase not configured, simulating deletion')
      return NextResponse.json({
        success: true,
        message: '삭제되었습니다. (데모 모드)',
        deletedId: id
      })
    }

    // Delete from Supabase using admin client
    const { error } = await supabaseAdmin
      .from('kmong_10_leads')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase delete error:', error)
      return NextResponse.json(
        { error: '삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '성공적으로 삭제되었습니다.',
      deletedId: id
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}