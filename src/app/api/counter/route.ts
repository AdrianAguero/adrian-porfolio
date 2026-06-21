export const runtime = 'edge';

export async function POST(req: Request) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        return new Response(JSON.stringify({ ok: false }), { status: 200 });
    }

    const country = req.headers.get('x-vercel-ip-country') || 'Desconocido';
    const city = req.headers.get('x-vercel-ip-city') || '';

    const now = new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        dateStyle: 'short',
        timeStyle: 'short',
    });

    const location = city ? `${city}, ${country}` : country;

    const body = {
        embeds: [
            {
                title: '👤 Nueva visita al portfolio',
                color: 0x00d084,
                fields: [
                    { name: '🌍 Ubicación', value: location, inline: true },
                    { name: '🕐 Hora (ARG)', value: now, inline: true },
                ],
                footer: { text: 'adrian-porfolio.vercel.app' },
            },
        ],
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    } catch (err) {
        console.error('Discord notify error:', err);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
