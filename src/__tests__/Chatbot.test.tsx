import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chatbot from '@/components/Chatbot';
import { PortfolioProvider } from '@/lib/store';
import React from 'react';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
            const { initial, animate, exit, whileInView, whileHover, viewport, transition, ...domProps } = props;
            return <div {...domProps}>{children}</div>;
        },
    },
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// Mock fetch for streaming responses
const mockFetch = vi.fn();
global.fetch = mockFetch;

function createStreamResponse(text: string) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(text));
            controller.close();
        },
    });
    return new Response(stream, { status: 200 });
}

function renderChatbot(startBoot = false) {
    localStorage.setItem('session_user', 'TestUser');
    return render(
        <PortfolioProvider>
            <Chatbot startBoot={startBoot} />
        </PortfolioProvider>
    );
}

describe('Chatbot', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        mockFetch.mockReset();
    });

    it('renders the chatbot container with header', () => {
        renderChatbot();
        expect(screen.getByText('AI_Assistant.exe')).toBeInTheDocument();
        expect(screen.getByText('v2.0.0')).toBeInTheDocument();
        expect(screen.getByText('[RESET]')).toBeInTheDocument();
    });

    it('shows boot animation when startBoot is true', () => {
        renderChatbot(true);
        expect(screen.getByText('SYSTEM_BOOT')).toBeInTheDocument();
    });

    it('shows INITIALIZING placeholder during boot', () => {
        renderChatbot(true);
        const input = screen.getByPlaceholderText('INITIALIZING...');
        expect(input).toBeDisabled();
    });

    it('shows welcome message after boot completes', async () => {
        renderChatbot(true);
        await waitFor(() => {
            expect(screen.getByText(/Sistema cargado correctamente/)).toBeInTheDocument();
        }, { timeout: 7000 });
    }, 10000);

    it('disables submit button when input is empty', () => {
        renderChatbot(false);
        const buttons = screen.getAllByRole('button');
        const submitButton = buttons.find(b => b.getAttribute('type') === 'submit');
        expect(submitButton).toBeDisabled();
    });

    it('sends message and displays streaming response', async () => {
        mockFetch.mockResolvedValueOnce(createStreamResponse('¡Hola! Soy la IA de Adrián.'));

        renderChatbot(true);

        // Wait for boot to complete
        await waitFor(() => {
            expect(screen.queryByText('SYSTEM_BOOT')).not.toBeInTheDocument();
        }, { timeout: 7000 });

        const input = screen.getByPlaceholderText(/Ask about my projects/);
        fireEvent.change(input, { target: { value: 'hola' } });

        const form = input.closest('form')!;
        fireEvent.submit(form);

        // Verify fetch was called
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/chat', expect.objectContaining({
                method: 'POST',
            }));
        });

        // Verify response is displayed
        await waitFor(() => {
            expect(screen.getByText(/Hola! Soy la IA de Adrián/)).toBeInTheDocument();
        });
    }, 15000);

    it('clears input after submit', async () => {
        mockFetch.mockResolvedValueOnce(createStreamResponse('Respuesta'));

        renderChatbot(true);

        await waitFor(() => {
            expect(screen.queryByText('SYSTEM_BOOT')).not.toBeInTheDocument();
        }, { timeout: 7000 });

        const input = screen.getByPlaceholderText(/Ask about my projects/) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Hello' } });

        const form = input.closest('form')!;
        fireEvent.submit(form);

        expect(input.value).toBe('');
    }, 10000);

    it('shows error message on fetch failure', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        renderChatbot(true);

        await waitFor(() => {
            expect(screen.queryByText('SYSTEM_BOOT')).not.toBeInTheDocument();
        }, { timeout: 7000 });

        const input = screen.getByPlaceholderText(/Ask about my projects/);
        fireEvent.change(input, { target: { value: 'test' } });

        const form = input.closest('form')!;
        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText(/Network error/)).toBeInTheDocument();
        });
    }, 10000);
});
