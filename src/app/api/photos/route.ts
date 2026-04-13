import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const PHOTOS_DIR = path.join(process.cwd(), 'public', 'aditi-photos')
const PHOTOS_JSON = path.join(PHOTOS_DIR, 'photos.json')

function ensureDir() {
  if (!fs.existsSync(PHOTOS_DIR)) {
    fs.mkdirSync(PHOTOS_DIR, { recursive: true })
  }
  if (!fs.existsSync(PHOTOS_JSON)) {
    fs.writeFileSync(PHOTOS_JSON, '[]')
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

// Increase body size limit for photo uploads
export const runtime = 'nodejs'

// GET - list all photos
export async function GET() {
  const photos = getPhotos()
  return NextResponse.json({ photos })
}

// POST - upload new photos
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
    }

    const formData = await request.formData()
    const files = formData.getAll('photos')

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const photos = getPhotos()

    for (const file of files) {
      if (!(file instanceof File)) continue

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate unique filename
      const ext = path.extname(file.name) || '.jpg'
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8)
      const filename = `aditi_${timestamp}_${randomStr}${ext}`
      const filepath = path.join(PHOTOS_DIR, filename)

      fs.writeFileSync(filepath, buffer)
      photos.push(`/aditi-photos/${filename}`)
    }

    savePhotos(photos)
    return NextResponse.json({ photos, count: photos.length })
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

    // Try to delete the file from disk
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
