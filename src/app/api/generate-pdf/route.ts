import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { latexCode } = await req.json();

    if (!latexCode) {
      return new NextResponse('Bad Request: latexCode is required', { status: 400 });
    }

    const response = await fetch('https://texlive.net/cgi-bin/latexcgi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `formula=${encodeURIComponent(latexCode)}&return=pdf`,
    });

    if (!response.ok || !response.body) {
      const errorBody = await response.text();
      console.error('PDF generation service failed:', errorBody);
      return new NextResponse(`PDF generation failed: ${response.statusText}`, {
        status: response.status,
      });
    }

    // Stream the PDF back to the client
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', 'attachment; filename="mohan-kilari-resume.pdf"');

    return new Response(response.body, {
      status: 200,
      headers,
    });
    
  } catch (error) {
    console.error('Error in PDF generation proxy:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
