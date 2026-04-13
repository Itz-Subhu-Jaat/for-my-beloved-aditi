import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const PHOTOS_DIR = process.env.PHOTOS_DIR || '/tmp/aditi-photos'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params

    // Prevent directory traversal attacks
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
    }

    const filepath = path.join(PHOTOS_DIR, filename)

    if (!fs.existsSync(filepath)) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filepath)

    // Determine content type from extension
    const ext = path.extname(filename).toLowerCase()
    const contentTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.bmp': 'image/bmp',
    }
    const contentType = contentTypes[ext] || 'image/jpeg'

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Serve photo error:', error)
    return NextResponse.json({ error: 'Failed to serve photo' }, { status: 500 })
  }
}
