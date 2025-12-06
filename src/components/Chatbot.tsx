"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Send, Terminal, Cpu } from 'lucide-react';
import { usePortfolio } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';

interface Message {
    id: string;
    role: string;
    content: string;
}

export default function Chatbot({ startBoot = false }: { startBoot?: boolean }) {
    const { userName, logout } = usePortfolio();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Boot Sequence State
    const [isBooting, setIsBooting] = useState(true);
    const [bootProgress, setBootProgress] = useState(0);
    const [bootLog, setBootLog] = useState("Initializing system...");

    // Manual state management
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | undefined>(undefined);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, error]);

    // Boot Sequence Logic
    useEffect(() => {
        if (!startBoot) return;

        const totalDuration = 5000; // 5 seconds
        const intervalTime = 50; // Update every 50ms
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

            // Update logs randomly
            if (Math.random() > 0.7) {
                setBootLog(logs[Math.floor(Math.random() * logs.length)]);
            }

            if (currentStep >= steps) {
                clearInterval(interval);
                setIsBooting(false);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [startBoot]);

    // Initial welcome message (Triggered after boot)
    useEffect(() => {
        if (!isBooting && messages.length === 0 && userName) {
            setMessages([
                {
                    id: 'welcome',
                    role: 'assistant',
                    content: `Sistema cargado correctamente. Hola ${userName}, soy la IA de Adrián. He analizado sus proyectos y skills. ¿Qué te gustaría saber?`
                }
            ]);
        }
    }, [isBooting, userName]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessageContent = input.trim();
        setInput(''); // Clear input immediately
        setError(undefined);

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString() + '-user',
            role: 'user',
            content: userMessageContent
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            if (!response.body) {
                throw new Error('No response body');
            }

            // Create placeholder for assistant message
            const assistantMessageId = Date.now().toString() + '-assistant';
            setMessages(prev => [...prev, {
                id: assistantMessageId,
                role: 'assistant',
                content: ''
            }]);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantContent = '';

            console.log('Stream started');

            let lastUpdateTime = 0;

            while (true) {
                try {
                    const { done, value } = await reader.read();
                    if (done) {
                        console.log('Stream complete. Final content length:', assistantContent.length);
                        // Final update to ensure everything is rendered
                        setMessages(prev => {
                            const newMessages = [...prev];
                            const messageIndex = newMessages.findIndex(m => m.id === assistantMessageId);
                            if (messageIndex !== -1) {
                                newMessages[messageIndex] = {
                                    ...newMessages[messageIndex],
                                    content: assistantContent
                                };
                            }
                            return newMessages;
                        });
                        break;
                    }

                    const chunk = decoder.decode(value, { stream: true });
                    assistantContent += chunk;

                    // Throttle updates to avoid overwhelming React
                    const now = Date.now();
                    if (now - lastUpdateTime > 50) {
                        setMessages(prev => {
                            const newMessages = [...prev];
                            const messageIndex = newMessages.findIndex(m => m.id === assistantMessageId);
                            if (messageIndex !== -1) {
                                newMessages[messageIndex] = {
                                    ...newMessages[messageIndex],
                                    content: assistantContent
                                };
                            }
                            return newMessages;
                        });
                        lastUpdateTime = now;
                    }
                } catch (readError) {
                    console.error('Error reading stream:', readError);
                    break;
                }
            }

        } catch (err) {
            console.error('Chat error:', err);
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[500px] w-full border border-[#00D084] rounded-lg bg-card overflow-hidden shadow-[0_0_20px_rgba(0,208,132,0.2)]">
            {/* Header */}
            <div className="bg-border/30 p-2 flex items-center justify-between border-b border-border">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-accentGreen animate-pulse"></div>
                    <span className="text-xs font-mono text-textSec">AI_Assistant.exe</span>
                </div>
                <div className="flex items-center space-x-3">
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm custom-scrollbar relative">
                <AnimatePresence mode="wait">
                    {isBooting ? (
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
                            {messages.map((m) => (
                                <motion.div
                                    key={m.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-lg ${m.role === 'user'
                                            ? 'bg-[#1F6FEB] text-white'
                                            : 'bg-transparent text-textMain'
                                            }`}
                                    >
                                        {m.role === 'assistant' && (
                                            <span className="text-accentGreen mr-2">{'>'}</span>
                                        )}
                                        {m.content}
                                    </div>
                                </motion.div>
                            ))}
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
                                        Error: {error.message || 'Something went wrong. Please try again.'}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
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
