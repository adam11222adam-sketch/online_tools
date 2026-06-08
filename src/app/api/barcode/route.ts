import { NextRequest, NextResponse } from 'next/server';
import bwipjs from 'bwip-js';

export async function POST(request: NextRequest) {
  try {
    const { text, type = 'code128' } = await request.json();

    if (!text) {
      return Response.json({ error: 'Text is required' }, { status: 400 });
    }

    const png = await bwipjs.toBuffer({
      bcid: type,
      text: text,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: 'center',
    });

    return new NextResponse(new Uint8Array(png) as unknown as BodyInit, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename=barcode.png',
      },
    });
  } catch {
    return Response.json({ error: 'Failed to generate barcode' }, { status: 500 });
  }
}
