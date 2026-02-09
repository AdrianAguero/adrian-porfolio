"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Send, Cpu, Trash2 } from 'lucide-react';
import { usePortfolio } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

const CHAT_STORAGE_KEY = 'chat_messages';
const MAX_STORED_MESSAGES = 50;

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function Chatbot({ startBoot = false }: { startBoot?: boolean }) {
    const { userName, logout } = usePortfolio();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const streamingRef = useRef<HTMLSpanElement>(null);
    const accumulatedRef = useRef('');

    // Load saved messages from localStorage
    const savedMessages = useRef<ChatMessage[]>([]);
    const initDone = useRef(false);
    if (!initDone.current) {
        try {
            const stored = typeof window !== 'undefined' ? localStorage.getItem(CHAT_STORAGE_KEY) : null;
            if (stored) {
                savedMessages.current = JSON.parse(stored);
            }
        } catch { /* ignore parse errors */ }
        initDone.current = true;
    }

    const hasSavedMessages = savedMessages.current.length > 0;

    // Boot Sequence State — skip boot if returning user with chat history
    const [isBooting, setIsBooting] = useState(!hasSavedMessages);
    const [bootStarted, setBootStarted] = useState(false);
    const [bootProgress, setBootProgress] = useState(0);
    const [bootLog, setBootLog] = useState("Initializing system...");
    const [showWelcome, setShowWelcome] = useState(hasSavedMessages);

    // Chat state
    const [messages, setMessages] = useState<ChatMessage[]>(savedMessages.current);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Persist messages to localStorage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            const toStore = messages.slice(-MAX_STORED_MESSAGES);
            localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(toStore));
        }
    }, [messages]);

    const scrollToBottom = useCallback(() => {
        const container = chatContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, error, showWelcome, isStreaming, scrollToBottom]);

    // Boot Sequence Logic — only runs if no saved messages
    useEffect(() => {
        if (!startBoot || hasSavedMessages) return;

        setBootStarted(true);
        const totalDuration = 5000;
        const intervalTime = 50;
        const steps = totalDuration / intervalTime;
        let currentStep = 0;

        const logs = [
            "Mounting file system...",
            "Parsing neural modules...",
            "Allocating memory blocks...",
            "Establishing secure connection...",
            "Loading language models...",
            "Verifying user credentials...",
            "System optimization...",
            "Booting AI core..."
        ];

        const interval = setInterval(() => {
            currentStep++;
            const progress = Math.min((currentStep / steps) * 100, 100);
            setBootProgress(progress);

            if (Math.random() > 0.7) {
                setBootLog(logs[Math.floor(Math.random() * logs.length)]);
            }

            if (currentStep >= steps) {
                clearInterval(interval);
                setIsBooting(false);
                setShowWelcome(true);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [startBoot, hasSavedMessages]);

    const clearChat = useCallback(() => {
        setMessages([]);
        localStorage.removeItem(CHAT_STORAGE_KEY);
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

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
                    messages: updatedMessages.map(m => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(response.status === 429 ? 'Demasiadas solicitudes, esperá un momento.' : errorText || 'Error del servidor');
            }

            if (!response.body) {
                throw new Error('Sin respuesta del servidor');
            }

            // Start streaming mode — render via DOM ref, not React state
            accumulatedRef.current = '';
            setIsStreaming(true);
            setIsLoading(false);

            // Wait for React to render the streaming span before reading
            await new Promise(resolve => requestAnimationFrame(resolve));

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedRef.current += chunk;

                // Write directly to DOM — bypasses React batching entirely
                if (streamingRef.current) {
                    streamingRef.current.textContent = accumulatedRef.current;
                }
                scrollToBottom();
            }

            // Flush remaining bytes
            const remaining = decoder.decode();
            if (remaining) {
                accumulatedRef.current += remaining;
            }

            // Stream done — commit final text to React state
            const finalText = accumulatedRef.current;
            const assistantId = Date.now().toString() + '-assistant';
            setIsStreaming(false);
            setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: finalText }]);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            setIsStreaming(false);
        } finally {
            setIsLoading(false);
        }
    };

    const welcomeMessage = showWelcome && messages.length === 0
        ? `Sistema cargado correctamente. Hola ${userName}, soy la IA de Adrián. He analizado sus proyectos y skills. ¿Qué te gustaría saber?`
        : null;

    return (
        <div className="flex flex-col h-[500px] w-full border border-[#00D084] rounded-lg bg-card overflow-hidden shadow-[0_0_20px_rgba(0,208,132,0.2)]">
            {/* Header */}
            <div className="bg-border/30 p-2 flex items-center justify-between border-b border-border">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-accentGreen animate-pulse"></div>
                    <span className="text-xs font-mono text-textSec">AI_Assistant.exe</span>
                </div>
                <div className="flex items-center space-x-3">
                    {messages.length > 0 && (
                        <button
                            onClick={clearChat}
                            className="text-xs font-mono text-textSec hover:text-yellow-400 transition-colors flex items-center gap-1"
                            title="Clear Chat History"
                        >
                            <Trash2 size={10} />
                            [CLEAR]
                        </button>
                    )}
                    <button
                        onClick={logout}
                        className="text-xs font-mono text-textSec hover:text-red-400 transition-colors"
                        title="Reset Session"
                    >
                        [RESET]
                    </button>
                    <span className="text-xs font-mono text-textSec">v2.0.0</span>
                </div>
            </div>

            {/* Content Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm custom-scrollbar relative">
                <AnimatePresence mode="wait">
                    {isBooting && bootStarted ? (
                        <motion.div
                            key="booting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-[#0E1117] z-20"
                        >
                            <div className="w-3/4 max-w-xs">
                                <div className="flex justify-between text-[#00D084] text-xs mb-2 font-mono">
                                    <span>SYSTEM_BOOT</span>
                                    <span>{Math.round(bootProgress)}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#00D084]/20 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#00D084] shadow-[0_0_10px_#00D084]"
                                        style={{ width: `${bootProgress}%` }}
                                    />
                                </div>
                                <div className="mt-4 text-[#00D084]/70 text-xs font-mono h-4 text-center">
                                    {`> ${bootLog}`}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            {welcomeMessage && (
                                <div className="flex justify-start">
                                    <div className="max-w-[85%] p-3 rounded-lg whitespace-pre-wrap break-words bg-transparent text-textMain">
                                        <span className="text-accentGreen mr-2">{'>'}</span>
                                        {welcomeMessage}
                                    </div>
                                </div>
                            )}
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-lg whitespace-pre-wrap break-words ${m.role === 'user'
                                            ? 'bg-[#1F6FEB] text-white'
                                            : 'bg-transparent text-textMain'
                                            }`}
                                    >
                                        {m.role === 'assistant' && (
                                            <span className="text-accentGreen mr-2">{'>'}</span>
                                        )}
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isStreaming && (
                                <div className="flex justify-start">
                                    <div className="max-w-[85%] p-3 rounded-lg whitespace-pre-wrap break-words bg-transparent text-textMain">
                                        <span className="text-accentGreen mr-2">{'>'}</span>
                                        <span ref={streamingRef}></span>
                                    </div>
                                </div>
                            )}
                            {isLoading && (
                                <div className="flex items-center space-x-2 text-textSec text-xs ml-2">
                                    <Cpu className="w-3 h-3 animate-spin" />
                                    <span>Processing...</span>
                                </div>
                            )}
                            {error && (
                                <div className="flex justify-start">
                                    <div className="max-w-[85%] p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/50">
                                        <span className="text-red-500 mr-2">!</span>
                                        Error: {error}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input */}
            <form onSubmit={handleFormSubmit} className="p-3 border-t border-border bg-background/50">
                <div className="relative flex items-center">
                    <input
                        className="w-full bg-transparent text-textMain font-mono text-sm focus:outline-none placeholder-textSec/50 pr-10 disabled:opacity-50"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isBooting ? "INITIALIZING..." : `Ask about my projects (e.g. 'Spark', 'Azure')...`}
                        disabled={isBooting || isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isBooting || isLoading || !input.trim()}
                        className="absolute right-0 text-accentGreen hover:text-white transition-colors disabled:opacity-50"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
}
