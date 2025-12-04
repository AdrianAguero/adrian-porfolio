import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a new ratelimiter, that allows 5 requests per 60 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    analytics: true,
    prefix: '@upstash/ratelimit',
});

export async function checkRateLimit(identifier: string) {
    // Fallback for local development if keys are missing
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        console.warn('⚠️  Rate Limiting disabled: Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN');
        return { success: true, limit: 100, remaining: 99, reset: 0 };
    }

    try {
        const { success, limit, remaining, reset } = await ratelimit.limit(identifier);
        return { success, limit, remaining, reset };
    } catch (error) {
        console.error('Rate limit error:', error);
        // Fail open if Redis is down, but log it
        return { success: true, limit: 10, remaining: 10, reset: 0 };
    }
}
