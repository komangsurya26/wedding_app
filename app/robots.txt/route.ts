export async function GET() {
    return new Response(
        `User-agent: *
Allow: /
Sitemap: https://komangsuryasedana.web.id/sitemap.xml
`,
        {
            headers: {
                'Content-Type': 'text/plain',
            },
        }
    );
}
