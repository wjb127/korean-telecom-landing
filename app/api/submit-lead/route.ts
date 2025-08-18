import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, carrier, service } = body

    // Validate required fields
    if (!name || !phone || !carrier || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if Supabase is configured
    if (!supabase) {
      console.log('Supabase not configured, returning success without saving')
      return NextResponse.json(
        { 
          message: 'Form submitted successfully (demo mode)',
          data: [{ name, phone: `010-${phone}`, carrier, service }]
        },
        { status: 200 }
      )
    }

    // Get client info
    const ip_address = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown'
    const user_agent = request.headers.get('user-agent') || 'unknown'

    // Insert into Supabase
    const { data, error } = await supabase
      .from('kmong_10_leads')
      .insert([
        {
          name,
          phone: `010-${phone}`,
          carrier,
          service,
          ip_address,
          user_agent,
          privacy_agreed: true
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Form submitted successfully', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}