import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { public_id } = body
        if (!public_id) return NextResponse.json({ error: 'public_id required' }, { status: 400 })


        const res = await cloudinary.uploader.destroy(public_id, { resource_type: 'image' })
        return NextResponse.json({ result: res })
    } catch (err) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    }
}