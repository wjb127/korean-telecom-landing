import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, carrier, service } = body

    // Validate required fields
    if (!name || !phone || !carrier || !service) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      )
    }

    // Validate phone format
    const phoneRegex = /^\d{4}-\d{4}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: '올바른 전화번호 형식이 아닙니다.' },
        { status: 400 }
      )
    }

    // Get client info
    const ip_address = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                      request.headers.get('x-real-ip') || 
                      request.headers.get('cf-connecting-ip') ||
                      'unknown'
    const user_agent = request.headers.get('user-agent') || 'unknown'

    // Format phone number
    const fullPhone = `010-${phone}`

    // If Supabase is not configured, use mock data
    if (!supabaseAdmin) {
      console.log('Supabase not configured, using mock data')
      return NextResponse.json(
        { 
          success: true,
          message: '상담 신청이 완료되었습니다. (데모 모드)',
          data: { 
            id: Date.now(),
            name, 
            phone: fullPhone, 
            carrier, 
            service,
            created_at: new Date().toISOString(),
            ip_address,
            user_agent
          }
        },
        { status: 200 }
      )
    }

    // Insert into Supabase using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('kmong_10_leads')
      .insert([
        {
          name,
          phone: fullPhone,
          carrier,
          service,
          ip_address,
          user_agent,
          privacy_agreed: true,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      
      // If it's still an RLS error, try without created_at
      if (error.code === '42501') {
        const { data: retryData, error: retryError } = await supabaseAdmin
          .from('kmong_10_leads')
          .insert([
            {
              name,
              phone: fullPhone,
              carrier,
              service,
              ip_address,
              user_agent,
              privacy_agreed: true
            }
          ])
          .select()
          .single()
        
        if (retryError) {
          console.error('Retry failed:', retryError)
          return NextResponse.json(
            { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
            { status: 500 }
          )
        }
        
        return NextResponse.json(
          { 
            success: true,
            message: '상담 신청이 완료되었습니다!',
            data: retryData 
          },
          { status: 200 }
        )
      }
      
      return NextResponse.json(
        { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        message: '상담 신청이 완료되었습니다!',
        data 
      },
      { status: 200 }
    )
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}