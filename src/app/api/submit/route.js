import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.json();

        const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

        if (!GOOGLE_SCRIPT_URL) {
            throw new Error('Google Script URL not configured');
        }

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit to Google Sheets');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error submitting form:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}