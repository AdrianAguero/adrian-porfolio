import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Límite: 5 requests cada 60 segundos por IP
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

// ── Rate limiter con Upstash Redis (si está configurado) ──
// Construcción guardada: si las env vars faltan o son inválidas, no
// crashea el módulo; simplemente caemos al limitador en memoria.
let ratelimit: Ratelimit | null = null;
try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        ratelimit = new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(MAX_REQUESTS, '60 s'),
            analytics: true,
            prefix: '@upstash/ratelimit',
        });
    }
} catch (e) {
    console.warn('No se pudo inicializar Upstash Ratelimit, usando memoria:', e);
    ratelimit = null;
}

// ── Fallback en memoria (cuando no hay Redis) ──
// No es perfecto en serverless (el estado es por instancia), pero
// evita que el endpoint quede SIN ningún límite si Redis no está.
const memoryStore = new Map<string, number[]>();

function memoryRateLimit(identifier: string) {
    const now = Date.now();
    const windowStart = now - WINDOW_MS;
    const hits = (memoryStore.get(identifier) || []).filter(t => t > windowStart);
    hits.push(now);
    memoryStore.set(identifier, hits);

    // Limpieza oportunista para no crecer indefinidamente
    if (memoryStore.size > 5000) {
        for (const [key, times] of memoryStore) {
            const recent = times.filter(t => t > windowStart);
            if (recent.length === 0) memoryStore.delete(key);
            else memoryStore.set(key, recent);
        }
    }

    const success = hits.length <= MAX_REQUESTS;
    return {
        success,
        limit: MAX_REQUESTS,
        remaining: Math.max(0, MAX_REQUESTS - hits.length),
        reset: now + WINDOW_MS,
    };
}

export async function checkRateLimit(identifier: string) {
    if (!ratelimit) {
        // Sin Redis: limitar en memoria (antes "fallaba abierto" dejando pasar todo).
        return memoryRateLimit(identifier);
    }

    try {
        const { success, limit, remaining, reset } = await ratelimit.limit(identifier);
        return { success, limit, remaining, reset };
    } catch (error) {
        console.error('Rate limit error (fallback a memoria):', error);
        // Si Redis falla en runtime, usar memoria en lugar de dejar pasar todo.
        return memoryRateLimit(identifier);
    }
}
