import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import mime from 'mime';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filePath = searchParams.get('path');

  if (!filePath) {
    return new NextResponse('Missing path parameter', { status: 400 });
  }

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return new NextResponse('File not found', { status: 404 });
    }

    const stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      return new NextResponse('Not a file', { status: 400 });
    }

    // Determine content type
    const contentType = mime.getType(filePath) || 'application/octet-stream';

    // Stream the file
    // We use a ReadableStream for Next.js response
    const fileStream = fs.createReadStream(filePath);

    // @ts-expect-error ReadableStream type
    return new NextResponse(fileStream, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': stat.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
