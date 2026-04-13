import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Use /tmp for Render (read-only filesystem on /app)
// In dev, use local public directory
const PHOTOS_DIR = process.env.PHOTOS_DIR || (process.env.NODE_ENV === 'production' ? '/tmp/aditi-photos' : path.join(process.cwd(), 'public', 'aditi-photos'))
const PHOTOS_JSON = path.join(PHOTOS_DIR, 'photos.json')

function ensureDir() {
  try {
    if (!fs.existsSync(PHOTOS_DIR)) {
      fs.mkdirSync(PHOTOS_DIR, { recursive: true })
    }
    if (!fs.existsSync(PHOTOS_JSON)) {
      fs.writeFileSync(PHOTOS_JSON, '[]')
    }
  } catch (err) {
    console.error('ensureDir error:', err)
  }
}

function getPhotos(): string[] {
  ensureDir()
  try {
    const data = fs.readFileSync(PHOTOS_JSON, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function savePhotos(photos: string[]) {
  ensureDir()
  fs.writeFileSync(PHOTOS_JSON, JSON.stringify(photos, null, 2))
}

function getPhotoUrl(filename: string): string {
  // In production (Render), serve via API route since /tmp is not in public dir
  // In dev, serve directly from public directory
  if (process.env.NODE_ENV === 'production') {
    return `/api/photo/${filename}`
  }
  return `/aditi-photos/${filename}`
}

// Increase body size limit for photo uploads
export const runtime = 'nodejs'
export const maxDuration = 60

// GET - list all photos
export async function GET() {
  const photos = getPhotos()
  return NextResponse.json({ photos })
}

// POST - upload new photos
export async function POST(request: NextRequest) {
  try {
    console.log('Upload request received, PHOTOS_DIR:', PHOTOS_DIR)
    
    const contentType = request.headers.get('content-type') || ''
    console.log('Content-Type:', contentType)
    
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type: ' + contentType }, { status: 400 })
    }

    let formData: FormData
    try {
      formData = await request.formData()
    } catch (formErr) {
      console.error('FormData parse error:', formErr)
      return NextResponse.json({ error: 'Failed to parse form data. File might be too large.' }, { status: 400 })
    }

    const files = formData.getAll('photos')
    console.log('Files received:', files.length)

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const photos = getPhotos()
    const uploadedFilenames: string[] = []

    for (const file of files) {
      if (!(file instanceof File)) {
        console.log('Skipping non-File entry:', typeof file)
        continue
      }

      console.log(`Processing file: ${file.name}, size: ${file.size}, type: ${file.type}`)

      if (file.size > 20 * 1024 * 1024) {
        return NextResponse.json({ error: `File ${file.name} is too large (max 20MB)` }, { status: 400 })
      }

      let buffer: Buffer
      try {
        const bytes = await file.arrayBuffer()
        buffer = Buffer.from(bytes)
      } catch (bufErr) {
        console.error('Buffer error:', bufErr)
        return NextResponse.json({ error: `Failed to read file ${file.name}` }, { status: 500 })
      }

      // Generate unique filename
      const ext = path.extname(file.name) || '.jpg'
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8)
      const filename = `aditi_${timestamp}_${randomStr}${ext}`
      const filepath = path.join(PHOTOS_DIR, filename)

      try {
        ensureDir()
        fs.writeFileSync(filepath, buffer)
        console.log(`File saved: ${filepath}`)
        const photoUrl = getPhotoUrl(filename)
        photos.push(photoUrl)
        uploadedFilenames.push(photoUrl)
      } catch (writeErr) {
        console.error('File write error:', writeErr)
        return NextResponse.json({ error: `Failed to save file ${file.name}: ${writeErr instanceof Error ? writeErr.message : 'Unknown error'}` }, { status: 500 })
      }
    }

    savePhotos(photos)
    console.log('Upload complete. Total photos:', photos.length)
    return NextResponse.json({ photos, count: photos.length, uploaded: uploadedFilenames.length })
  } catch (error) {
    console.error('Upload error:', error)
    const message = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE - remove a photo
export async function DELETE(request: NextRequest) {
  try {
    const { photoUrl } = await request.json()

    if (!photoUrl) {
      return NextResponse.json({ error: 'No photo URL provided' }, { status: 400 })
    }

    const photos = getPhotos()
    const updatedPhotos = photos.filter(p => p !== photoUrl)

    // Extract filename from URL (handles both /aditi-photos/ and /api/photo/ formats)
    const filename = path.basename(photoUrl)
    const filepath = path.join(PHOTOS_DIR, filename)
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }

    savePhotos(updatedPhotos)
    return NextResponse.json({ photos: updatedPhotos })
  } catch (error) {
    console.error('Delete error:', error)
    const message = error instanceof Error ? error.message : 'Delete failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
