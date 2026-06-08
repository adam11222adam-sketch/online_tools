import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> }
) {
  try {
    const { action } = await params;
    const formData = await request.formData();
    const files = formData.getAll('file') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Handle images-to-pdf special case
    if (action === 'images-to-pdf') {
      const pdfDoc = await PDFDocument.create();
      for (const file of files) {
        if (file.size > MAX_FILE_SIZE) continue;
        const arrayBuffer = await file.arrayBuffer();
        let image;
        try {
          if (file.type === 'image/png') {
            image = await pdfDoc.embedPng(arrayBuffer);
          } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            image = await pdfDoc.embedJpg(arrayBuffer);
          } else {
            // Convert other formats to JPG using sharp first
            const jpgBuffer = await sharp(Buffer.from(arrayBuffer)).jpeg().toBuffer();
            image = await pdfDoc.embedJpg(jpgBuffer);
          }
          const page = pdfDoc.addPage([image.width, image.height]);
          page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        } catch (err) {
          console.error('Error embedding image', err);
        }
      }
      const pdfBytes = await pdfDoc.save();
      return new NextResponse(pdfBytes as unknown as BodyInit, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=images.pdf',
          'Cache-Control': 'no-store',
        },
      });
    }

    // Handle extract-from-pdf special case
    if (action === 'extract-from-pdf') {
      return NextResponse.json({ error: 'This tool requires Poppler to be installed on the server.' }, { status: 501 });
    }

    // Single file processing for the rest
    const file = files[0];
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 20MB limit' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let sharpInstance = sharp(buffer);
    let outputFormat = 'jpeg';
    let outputMime = 'image/jpeg';
    let filename = 'converted.jpg';

    switch (action) {
      case 'png-to-jpg':
        sharpInstance = sharpInstance.jpeg({ quality: 90 });
        break;
      case 'jpg-to-png':
        sharpInstance = sharpInstance.png();
        outputFormat = 'png';
        outputMime = 'image/png';
        filename = 'converted.png';
        break;
      case 'to-webp':
      case 'image-to-webp': {
        const q = parseInt((formData.get('quality') as string) || '85', 10);
        sharpInstance = sharpInstance.webp({ quality: q });
        outputFormat = 'webp';
        outputMime = 'image/webp';
        filename = 'converted.webp';
        break;
      }
      case 'webp-to-image': {
        const out = (formData.get('output') as string) || 'jpg';
        if (out === 'png') {
          sharpInstance = sharpInstance.png();
          outputFormat = 'png';
          outputMime = 'image/png';
          filename = 'converted.png';
        } else {
          sharpInstance = sharpInstance.jpeg({ quality: 90 });
        }
        break;
      }
      case 'compress':
      case 'compress-image': {
        const quality = parseInt((formData.get('quality') as string) || '80', 10);
        // keep original format if possible, otherwise jpg
        const metadata = await sharpInstance.metadata();
        outputFormat = metadata.format || 'jpeg';
        if (outputFormat === 'png') {
          sharpInstance = sharpInstance.png({ quality });
          outputMime = 'image/png';
          filename = 'compressed.png';
        } else if (outputFormat === 'webp') {
          sharpInstance = sharpInstance.webp({ quality });
          outputMime = 'image/webp';
          filename = 'compressed.webp';
        } else {
          sharpInstance = sharpInstance.jpeg({ quality });
          outputFormat = 'jpeg';
          outputMime = 'image/jpeg';
          filename = 'compressed.jpg';
        }
        break;
      }
      case 'resize':
      case 'resize-image': {
        const widthStr = formData.get('width') as string;
        const heightStr = formData.get('height') as string;
        const width = widthStr ? parseInt(widthStr, 10) : undefined;
        const height = heightStr ? parseInt(heightStr, 10) : undefined;
        const preserveAspectRatio = formData.get('preserveAspectRatio') === 'true';
        
        if (!width && !height) {
          return NextResponse.json({ error: 'At least one of width or height is required' }, { status: 400 });
        }
        
        sharpInstance = sharpInstance.resize({
          width,
          height,
          fit: preserveAspectRatio ? 'inside' : 'fill',
        });
        const meta = await sharpInstance.metadata();
        outputFormat = meta.format || 'jpeg';
        outputMime = `image/${outputFormat}`;
        filename = `resized.${outputFormat === 'jpeg' ? 'jpg' : outputFormat}`;
        break;
      }
      case 'crop':
      case 'crop-image': {
        const left = parseInt(formData.get('left') as string, 10);
        const top = parseInt(formData.get('top') as string, 10);
        const width = parseInt(formData.get('width') as string, 10);
        const height = parseInt(formData.get('height') as string, 10);
        
        if ([left, top, width, height].some(isNaN)) {
          return NextResponse.json({ error: 'Valid left, top, width, and height required' }, { status: 400 });
        }
        
        sharpInstance = sharpInstance.extract({ left, top, width, height });
        const meta = await sharpInstance.metadata();
        outputFormat = meta.format || 'jpeg';
        outputMime = `image/${outputFormat}`;
        filename = `cropped.${outputFormat === 'jpeg' ? 'jpg' : outputFormat}`;
        break;
      }
      case 'rotate':
      case 'rotate-image': {
        const angle = parseInt((formData.get('angle') as string) || '90', 10);
        sharpInstance = sharpInstance.rotate(angle);
        const meta = await sharpInstance.metadata();
        outputFormat = meta.format || 'jpeg';
        outputMime = `image/${outputFormat}`;
        filename = `rotated.${outputFormat === 'jpeg' ? 'jpg' : outputFormat}`;
        break;
      }
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const outputBuffer = await sharpInstance.toBuffer();

    return new NextResponse(new Uint8Array(outputBuffer) as unknown as BodyInit, {
      headers: {
        'Content-Type': outputMime,
        'Content-Disposition': `attachment; filename=${filename}`,
        'Cache-Control': 'no-store',
      },
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
