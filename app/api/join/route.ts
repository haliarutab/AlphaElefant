import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = (formData.get('name') as string || '').trim()
    const email = (formData.get('email') as string || '').trim()
    const phone = (formData.get('phone') as string || '').trim()
    const skills = (formData.get('skills') as string || '').trim()
    const coverLetter = (formData.get('coverLetter') as string || '').trim()
    const resumeFile = formData.get('resume') as File | null

    // Received join request

    // Construct the combined message to present skills, cover letter, and resume file metadata
    let combinedMessage = `Skills:\n${skills || 'Not specified'}\n\nCover Letter:\n${coverLetter || 'No cover letter provided.'}`
    if (resumeFile) {
      combinedMessage += `\n\n[Resume Attachment File]: ${resumeFile.name} (${(resumeFile.size / 1024).toFixed(2)} KB)`
    }

    // Retrieve backend API base URL from process.env, with fallback
    const backendBaseUrl = process.env.BACKEND_API_URL || 'http://localhost:5000'
    const backendEndpoint = `${backendBaseUrl}/api/v1/leads`

    // Extract requester metadata
    const ip = request.headers.get('x-forwarded-for') || (request as any).ip || '127.0.0.1'
    const userAgent = request.headers.get('user-agent') || ''
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || ''

    // Construct backend lead payload for careers ('job-apply')
    const backendPayload = {
      name: name || 'Job Applicant',
      email,
      phoneNumber: phone,
      serviceInterested: 'Job Application',
      message: combinedMessage,
      vertical: 'Careers',
      subVertical: 'Join Request',
      inquiryType: 'job-apply',
    }

    // Forwarding join application to backend

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
        message: result.message || 'Unable to submit your application to the backend.',
        errors: result.errors || [],
      }, { status: response.status })
    }

    return NextResponse.json({
      success: true,
      message: result.message || 'Application details successfully logged to backend.',
      data: result.data || null,
    }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to process submission. Internal server error.'
    }, { status: 500 })
  }
}
