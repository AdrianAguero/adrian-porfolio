import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST() {
    try {
        // Check if Redis env vars are present
        if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
            console.warn('Redis credentials missing. Returning mock data.');
            return NextResponse.json({ visits: 0 });
        }

        const redis = Redis.fromEnv();
        const visits = await redis.incr('portfolio_visits');

        return NextResponse.json({ visits });
    } catch (error) {
        console.error('Error incrementing visit counter:', error);
        return NextResponse.json({ visits: 0 }, { status: 500 });
    }
}
