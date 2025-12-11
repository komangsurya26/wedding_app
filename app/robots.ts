import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ["/api/", "/dashboard"]
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/api/", "/dashboard"]
            }
        ],
        sitemap: 'https://komangsuryasedana.web.id/sitemap.xml',
    }
}