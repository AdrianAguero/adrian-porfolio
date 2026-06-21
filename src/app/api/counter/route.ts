import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

async function notifyDiscord(visits: number, country: string) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
        console.warn('DISCORD_WEBHOOK_URL not set');
        return;
    }

    const now = new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        dateStyle: 'short',
        timeStyle: 'short',
    });

    const body = {
        embeds: [
            {
                title: '👤 Nueva visita al portfolio',
                color: 0x00d084,
                fields: [
                    { name: '🔢 Visita N°', value: `**${visits}**`, inline: true },
                    { name: '🌍 País', value: country || 'Desconocido', inline: true },
                    { name: '🕐 Hora (ARG)', value: now, inline: true },
                ],
                footer: { text: 'adrian-porfolio.vercel.app' },
            },
        ],
    };

    const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        console.error('Discord webhook failed:', res.status, await res.text());
    }
}

export async function POST(req: Request) {
    try {
        if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
            console.warn('Redis credentials missing. Returning mock data.');
            return NextResponse.json({ visits: 0 });
        }

        const redis = Redis.fromEnv();
        const visits = await redis.incr('portfolio_visits');

        // Obtener país desde header de Vercel
        const country = req.headers.get('x-vercel-ip-country') || '';

        // Esperar a que Discord reciba la notificación antes de responder
        await notifyDiscord(visits, country);

        return NextResponse.json({ visits });
    } catch (error) {
        console.error('Error incrementing visit counter:', error);
        return NextResponse.json({ visits: 0 }, { status: 500 });
    }
}
