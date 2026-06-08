import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const targetFormat = (formData.get('format') as string) || 'jpeg';
    const quality = parseInt((formData.get('quality') as string) || '80', 10);

    if (!file) {
      return Response.json({ error: 'File is required' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let output: Buffer;

    switch (targetFormat) {
      case 'jpeg':
      case 'jpg':
        output = await sharp(buffer).jpeg({ quality }).toBuffer();
        break;
      case 'png':
        output = await sharp(buffer).png().toBuffer();
        break;
      case 'webp':
        output = await sharp(buffer).webp({ quality }).toBuffer();
        break;
      default:
        output = await sharp(buffer).jpeg({ quality }).toBuffer();
    }

    const mimeTypes: Record<string, string> = {
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
    };

    return new NextResponse(output as unknown as BodyInit, {
      headers: {
        'Content-Type': mimeTypes[targetFormat] || 'image/jpeg',
        'Content-Disposition': `attachment; filename=converted.${targetFormat}`,
      },
    });
  } catch {
    return Response.json({ error: 'Failed to convert image' }, { status: 500 });
  }
}
