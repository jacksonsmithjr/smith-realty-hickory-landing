import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      moveTimeline,
      budgetRange,
      source,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !moveTimeline || !budgetRange) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get webhook URL from environment variable
    const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('GHL webhook URL not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Prepare payload for GHL
    const payload = {
      firstName,
      lastName,
      email,
      phone,
      moveTimeline,
      budgetRange,
      source: source || 'Google Ads - Hickory Relocation',
    };

    // Forward to GHL webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('GHL webhook error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to submit lead' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Lead submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
