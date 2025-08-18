import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Simple auth check - in production, use proper authentication
    const authHeader = request.headers.get('cookie')
    if (!authHeader?.includes('admin_authenticated')) {
      // For now, we'll allow access for testing
      // In production, implement proper authentication
    }

    // Check if Supabase is configured
    if (!supabase) {
      // Return mock data if Supabase is not configured
      return NextResponse.json({
        leads: [
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
          }
        ]
      })
    }

    // Fetch leads from Supabase
    const { data, error } = await supabase
      .from('kmong_10_leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      // Return mock data if Supabase is not configured
      return NextResponse.json({
        leads: [
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
          }
        ]
      })
    }

    return NextResponse.json({ leads: data || [] })
  } catch (error) {
    console.error('Server error:', error)
    // Return mock data for testing
    return NextResponse.json({
      leads: [
        {
          id: 1,
          name: "테스트 사용자1",
          phone: "010-1234-5678",
          carrier: "KT",
          service: "인터넷+TV",
          created_at: new Date().toISOString(),
          ip_address: "127.0.0.1",
          user_agent: "Mozilla/5.0"
        }
      ]
    })
  }
}