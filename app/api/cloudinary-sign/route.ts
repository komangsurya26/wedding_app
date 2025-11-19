import crypto from 'crypto'
import { NextResponse } from 'next/server'


export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const invitationId = url.searchParams.get('invitationId') || 'general'
        const timestamp = Math.floor(Date.now() / 1000)


        // params that will be used in upload. Keep deterministic order for signature
        const paramsToSign = `folder=invitations/${invitationId}&timestamp=${timestamp}`
        const signature = crypto.createHash('sha1')
            .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
            .digest('hex')


        return NextResponse.json({ signature, timestamp, api_key: process.env.CLOUDINARY_API_KEY })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Sign failed' }, { status: 500 })
    }
}