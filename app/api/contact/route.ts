import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    
    // Received contact payload

    // Retrieve backend API base URL from process.env, with fallback
    const backendBaseUrl = process.env.BACKEND_API_URL
    const backendEndpoint = `${backendBaseUrl}/api/v1/leads`

    // Extract requester metadata
    const ip = request.headers.get('x-forwarded-for') || (request as any).ip || '127.0.0.1'
    const userAgent = request.headers.get('user-agent') || ''
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || ''

    // Map raw frontend inquiry types to backend-allowed enum:
    // 'general', 'course', 'partnership', 'c all', 'job-apply', 'other'
    let backendInquiryType = 'general'
    const rawInquiryType = (payload.inquiryType || '').toLowerCase()

    if (rawInquiryType === 'course') {
      backendInquiryType = 'course'
    } else if (rawInquiryType === 'partnership') {
      backendInquiryType = 'partnership'
    } else if (rawInquiryType === 'call') {
      backendInquiryType = 'call'
    } else if (rawInquiryType === 'job-apply') {
      backendInquiryType = 'job-apply'
    } else if (rawInquiryType === 'other') {
      backendInquiryType = 'other'
    } else if (rawInquiryType === 'inquiry') {
      backendInquiryType = 'general'
    }

    // Map and sanitize required fields
    const name = (payload.name || '').trim()
    const email = (payload.email || '').trim()
    const phoneNumber = (payload.phone || payload.phoneNumber || '').trim()

    // Determine the service of interest (required, 2-100 characters)
    let serviceInterested = (
      payload.offering ||
      payload.selectedInterest ||
      payload.subcategoryName ||
      payload.verticalName ||
      (backendInquiryType === 'course' ? 'Course Inquiry' : 'General Inquiry')
    ).trim()

    if (serviceInterested.length < 2) {
      serviceInterested = 'General Inquiry'
    } else if (serviceInterested.length > 100) {
      serviceInterested = serviceInterested.substring(0, 100)
    }

    // Determine vertical and sub-vertical categories (required, 2-100 characters)
    let vertical = (payload.verticalName || payload.vertical || 'General').trim()
    if (vertical.length < 2) vertical = 'General'
    if (vertical.length > 100) vertical = vertical.substring(0, 100)

    let subVertical = (payload.subcategoryName || payload.subVertical || 'General').trim()
    if (subVertical.length < 2) subVertical = 'General'
    if (subVertical.length > 100) subVertical = subVertical.substring(0, 100)

    // Construct backend lead payload
    const backendPayload: Record<string, any> = {
      name,
      email,
      phoneNumber,
      serviceInterested,
      vertical,
      subVertical,
      inquiryType: backendInquiryType,
    }

    // Conditional field logic:
    // 1. message: required when inquiryType is not 'course'
    if (backendInquiryType !== 'course') {
      backendPayload.message = (payload.message || payload.description || 'No message provided').trim()
    } else {
      if (payload.message || payload.description) {
        backendPayload.message = (payload.message || payload.description).trim()
      }
    }

    // 2. selectedCourse: required when inquiryType is 'course', must NOT be provided otherwise
    if (backendInquiryType === 'course') {
      backendPayload.selectedCourse = (payload.offering || 'General Course').trim()
    }

    // 3. companyName: required when inquiryType is 'partnership'
    if (backendInquiryType === 'partnership') {
      backendPayload.companyName = (payload.company || payload.companyName || 'Not Specified').trim()
    } else if (payload.company || payload.companyName) {
      backendPayload.companyName = (payload.company || payload.companyName).trim()
    }

    // Forwarding contact lead to backend

    // Forward the POST request to the backend service
    const response = await fetch(backendEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': ip,
        'User-Agent': userAgent,
        'Referer': referrer,
      },
      body: JSON.stringify(backendPayload),
    })

    const result = await response.json()
    // Backend response received

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: result.message || 'Unable to submit your request to the backend.',
        errors: result.errors || [],
      }, { status: response.status })
    }

    return NextResponse.json({
      success: true,
      message: result.message || 'Inquiry received successfully.',
      data: result.data || null,
    }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to process submission. Internal server error.',
    }, { status: 500 })
  }
}
