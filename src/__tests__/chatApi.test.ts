import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies before importing the route
vi.mock('@/lib/ratelimit', () => ({
  checkRateLimit: vi.fn(),
}));

vi.mock('next/headers', () => ({
  headers: vi.fn(),
}));

vi.mock('@ai-sdk/google', () => ({
  google: vi.fn(),
  createGoogleGenerativeAI: vi.fn(),
}));

vi.mock('ai', () => ({
  streamText: vi.fn(),
}));

describe('/api/chat route', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('returns 429 when rate limited', async () => {
    const { checkRateLimit } = await import('@/lib/ratelimit');
    const { headers } = await import('next/headers');

    (headers as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => '127.0.0.1',
    });

    (checkRateLimit as ReturnType<typeof vi.fn>).mockResolvedValue({
      success: false,
      limit: 5,
      remaining: 0,
      reset: Date.now() + 60000,
    });

    const { POST } = await import('@/app/api/chat/route');

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }] }),
    });

    const response = await POST(request);

    expect(response.status).toBe(429);
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('0');
  });

  it('returns 500 when API key is missing', async () => {
    const { checkRateLimit } = await import('@/lib/ratelimit');
    const { headers } = await import('next/headers');

    (headers as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => '127.0.0.1',
    });

    (checkRateLimit as ReturnType<typeof vi.fn>).mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: 0,
    });

    // Ensure no API key in env
    delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    delete process.env.GOOGLE_API_KEY;

    const { POST } = await import('@/app/api/chat/route');

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }] }),
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.error).toBe('Error generating response');
  });

  it('calls streamText with correct model and system prompt when API key exists', async () => {
    const { checkRateLimit } = await import('@/lib/ratelimit');
    const { headers } = await import('next/headers');
    const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
    const { streamText } = await import('ai');

    (headers as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => '127.0.0.1',
    });

    (checkRateLimit as ReturnType<typeof vi.fn>).mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: 0,
    });

    process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'test-key-123';

    const mockModel = { id: 'gemini-2.0-flash' };
    const mockGoogleInstance = vi.fn().mockReturnValue(mockModel);
    (createGoogleGenerativeAI as ReturnType<typeof vi.fn>).mockReturnValue(mockGoogleInstance);

    const mockResponse = new Response('ok');
    (streamText as ReturnType<typeof vi.fn>).mockReturnValue({
      toTextStreamResponse: () => mockResponse,
    });

    const { POST } = await import('@/app/api/chat/route');

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Tell me about Spark' }],
      }),
    });

    const response = await POST(request);

    expect(createGoogleGenerativeAI).toHaveBeenCalledWith({ apiKey: 'test-key-123' });
    expect(mockGoogleInstance).toHaveBeenCalledWith('gemini-2.0-flash');
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({
        model: mockModel,
        system: expect.stringContaining('Adrián Agüero'),
        messages: expect.any(Array),
      })
    );
    expect(response).toBe(mockResponse);

    delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  });

  it('system prompt contains security rules', async () => {
    const { checkRateLimit } = await import('@/lib/ratelimit');
    const { headers } = await import('next/headers');
    const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
    const { streamText } = await import('ai');

    (headers as ReturnType<typeof vi.fn>).mockResolvedValue({ get: () => '127.0.0.1' });
    (checkRateLimit as ReturnType<typeof vi.fn>).mockResolvedValue({ success: true, limit: 5, remaining: 4, reset: 0 });

    process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'test-key';

    const mockGoogleInstance = vi.fn().mockReturnValue({});
    (createGoogleGenerativeAI as ReturnType<typeof vi.fn>).mockReturnValue(mockGoogleInstance);
    (streamText as ReturnType<typeof vi.fn>).mockReturnValue({
      toTextStreamResponse: () => new Response('ok'),
    });

    const { POST } = await import('@/app/api/chat/route');

    await POST(new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
    }));

    const systemPrompt = (streamText as ReturnType<typeof vi.fn>).mock.calls[0][0].system;
    expect(systemPrompt).toContain('<security>');
    expect(systemPrompt).toContain('<knowledge_base>');
    expect(systemPrompt).toContain('Data Engineer');

    delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  });
});
