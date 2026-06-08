import { NextRequest } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  try {
    const { text, format = 'png' } = await request.json();

    if (!text) {
      return Response.json({ error: 'Text is required' }, { status: 400 });
    }

    if (format === 'svg') {
      const svg = await QRCode.toString(text, { type: 'svg', width: 400 });
      return new Response(svg, {
        headers: { 'Content-Type': 'image/svg+xml' },
      });
    }

    const buffer = await QRCode.toBuffer(text, {
      width: 400,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    });

    return new Response(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename=qrcode.png',
      },
    });
  } catch {
    return Response.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}
