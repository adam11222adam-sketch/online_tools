import { NextRequest } from 'next/server';
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execFileAsync = promisify(execFile);

export async function POST(request: NextRequest) {
  let tempDir = '';
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const password = formData.get('password') as string | null;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Create a temporary directory in the workspace
    const workspaceTmp = path.join(process.cwd(), 'tmp');
    await fs.mkdir(workspaceTmp, { recursive: true });
    
    const uniqueSubdir = `pdf-unlock-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    tempDir = path.join(workspaceTmp, uniqueSubdir);
    await fs.mkdir(tempDir, { recursive: true });

    const inputPath = path.join(tempDir, 'input.pdf');
    const outputPath = path.join(tempDir, 'output.pdf');

    const bytes = await file.arrayBuffer();
    await fs.writeFile(inputPath, Buffer.from(bytes));

    const qpdfPath = process.env.QPDF_PATH || 'qpdf';
    
    // Call qpdf securely with args in an array
    const args = [
      `--password=${password || ''}`,
      '--decrypt',
      inputPath,
      outputPath,
    ];

    try {
      await execFileAsync(qpdfPath, args);
    } catch (err: any) {
      console.error('QPDF process error:', err);
      // Check if qpdf command was not found
      if (err.code === 'ENOENT') {
        return Response.json({ error: 'qpdfNotInstalled' }, { status: 501 });
      }
      return Response.json({ error: 'unlockError' }, { status: 400 });
    }

    // Read the decrypted file bytes
    const decryptedBytes = await fs.readFile(outputPath);

    return new Response(decryptedBytes as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=unlocked_${file.name}`,
      },
    });
  } catch (err: any) {
    console.error('General route error in pdf unlock:', err);
    return Response.json({ error: 'genericError' }, { status: 500 });
  } finally {
    // Thoroughly clean up temp directories & files to avoid disk leaks
    if (tempDir) {
      try {
        await fs.rm(tempDir, { recursive: true, force: true });
      } catch (rmErr) {
        console.error(`Failed to clean up temp dir: ${tempDir}`, rmErr);
      }
    }
  }
}
