import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        const indexNowKey = process.env.INDEXNOW_API_KEY || '6fd2c38943b34d79b6aa24ded4b08c2f';
        const host = 'ronel-tubio-portfolio.vercel.app';

        // Submit to IndexNow (Bing, Yandex, etc.)
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                host: host,
                key: indexNowKey,
                keyLocation: `https://${host}/${indexNowKey}.txt`,
                urlList: [url],
            }),
        });

        if (response.ok || response.status === 202) {
            return NextResponse.json({
                success: true,
                message: 'URL submitted to IndexNow',
            });
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Failed to submit to IndexNow',
                    status: response.status,
                },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('IndexNow error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Optional: GET endpoint to manually trigger indexing
export async function GET() {
    const indexNowKey = process.env.INDEXNOW_API_KEY || '6fd2c38943b34d79b6aa24ded4b08c2f';
    const host = 'ronel-tubio-portfolio.vercel.app';
    const url = `https://${host}/`;

    try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                host: host,
                key: indexNowKey,
                keyLocation: `https://${host}/${indexNowKey}.txt`,
                urlList: [url],
            }),
        });

        if (response.ok || response.status === 202) {
            return NextResponse.json({
                success: true,
                message: 'Homepage submitted to IndexNow',
            });
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Failed to submit to IndexNow',
                    status: response.status,
                },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('IndexNow error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
