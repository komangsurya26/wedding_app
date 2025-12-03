"use server";

import crypto from "crypto";
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function getSignature(invitationId: number) {
    try {
        if (!invitationId) {
            throw new Error()
        }
        const timestamp = Math.floor(Date.now() / 1000);

        const paramsToSign = `folder=invitations/${invitationId}&timestamp=${timestamp}`;
        const signature = crypto
            .createHash("sha1")
            .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
            .digest("hex");

        return {
            signature,
            timestamp,
            api_key: process.env.CLOUDINARY_API_KEY,
        };
    } catch (err) {
        return {
            signature: "",
            timestamp: "",
            api_key: ""
        };
    }
}


export async function deleteImage(publicId: string) {
    try {
        const res = await cloudinary.uploader.destroy(publicId, { resource_type: 'image', invalidate: true })
        return res
    } catch (err) {
        throw err
    }
}
