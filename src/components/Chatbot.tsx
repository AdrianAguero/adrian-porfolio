"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Send, Cpu, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CHAT_STORAGE_KEY = 'chat_messages';
const MAX_STORED_MESSAGES = 50;

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function Chatbot({ startBoot = false }: { startBoot?: boolean }) {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const streamingRef = useRef<HTMLSpanElement>(null);
    const accumulatedRef = useRef('');

    // Load saved messages from localStorage
    const savedMessages = useRef<ChatMessage[]>([]);
    const initDone = useRef(false);
    if (!initDone.current) {
        try {
            const stored = typeof window !== 'undefined' ? localStorage.getItem(CHAT_STORAGE_KEY) : null;
            if (stored) savedMessages.current = JSON.parse(stored);
        } catch { /* ignore */ }
        initDone.current = true;
    }

    const [messages, setMessages] = useState<ChatMessage[]>(savedMessages.current);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Persist messages
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
        }
    }, [messages]);

    const scrollToBottom = useCallback(() => {
        const container = chatContainerRef.current;
        if (container) container.scrollTop = container.scrollHeight;
    }, []);

    useEffect(() => { scrollToBottom(); }, [messages, error, isStreaming, scrollToBottom]);

    const clearChat = useCallback(() => {
        setMessages([]);
        localStorage.removeItem(CHAT_STORAGE_KEY);
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || isStreaming) return;

        const userText = input.trim();
        setInput('');
        setError(null);

        const userMessage: ChatMessage = {
            id: Date.now().toString() + '-user',
            role: 'user',
            content: userText,
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setIsLoading(true);
        setIsStreaming(false);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!response.ok) {
                throw new Error(response.status === 429
                    ? 'Demasiadas solicitudes, esperá un momento.'
                    : 'Error del servidor');
            }

            if (!response.body) throw new Error('Sin respuesta del servidor');

            accumulatedRef.current = '';
            setIsStreaming(true);
            setIsLoading(false);

            await new Promise(resolve => requestAnimationFrame(resolve));

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                accumulatedRef.current += decoder.decode(value, { stream: true });
                if (streamingRef.current) streamingRef.current.textContent = accumulatedRef.current;
                scrollToBottom();
            }

            const remaining = decoder.decode();
            if (remaining) accumulatedRef.current += remaining;

            const finalText = accumulatedRef.current;
            setIsStreaming(false);
            setMessages(prev => [...prev, {
                id: Date.now().toString() + '-assistant',
                role: 'assistant',
                content: finalText,
            }]);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            setIsStreaming(false);
        } finally {
            setIsLoading(false);
        }
    };

    const welcomeMessage = messages.length === 0
        ? 'Hola, soy la IA de Adrián. Analizé sus proyectos y experiencia. ¿Qué te gustaría saber?'
        : null;

    return (
        <div className="flex flex-col h-[500px] w-full border border-border rounded-xl bg-card overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-background p-3 flex items-center justify-between border-b border-border">
                <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-accentGreen animate-pulse"></div>
                    <span className="text-xs font-mono text-textSec font-medium">AI Assistant · Adrián Agüero</span>
                </div>
                <div className="flex items-center space-x-3">
                    {messages.length > 0 && (
                        <button
                            onClick={clearChat}
                            className="text-xs font-mono text-textSec hover:text-red-500 transition-colors flex items-center gap-1"
                            title="Limpiar chat"
                        >
                            <Trash2 size={10} />
                            limpiar
                        </button>
                    )}
                </div>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                >
                    {welcomeMessage && (
                        <div className="flex justify-start">
                            <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm bg-background border border-border text-textMain text-sm leading-relaxed">
                                {welcomeMessage}
                            </div>
                        </div>
                    )}

                    {messages.map((m) => (
                        <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                                m.role === 'user'
                                    ? 'bg-accentGreen text-white rounded-tr-sm'
                                    : 'bg-background border border-border text-textMain rounded-tl-sm'
                            }`}>
                                {m.content}
                            </div>
                        </div>
                    ))}

                    {isStreaming && (
                        <div className="flex justify-start">
                            <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm bg-background border border-border text-textMain text-sm leading-relaxed">
                                <span ref={streamingRef}></span>
                            </div>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-background border border-border">
                                <Cpu className="w-4 h-4 animate-spin text-accentGreen" />
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">
                            {error}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Input */}
            <form onSubmit={handleFormSubmit} className="p-3 border-t border-border bg-background">
                <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 focus-within:border-accentGreen transition-colors">
                    <input
                        className="flex-1 bg-transparent text-textMain text-sm focus:outline-none placeholder-textSec/60"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Preguntá sobre mi experiencia o tecnologías..."
                        disabled={isLoading || isStreaming}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || isStreaming || !input.trim()}
                        className="text-accentGreen hover:text-accentGreen/70 transition-colors disabled:opacity-30"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
}
