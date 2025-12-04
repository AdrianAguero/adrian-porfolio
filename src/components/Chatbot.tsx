"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Send, Terminal, Cpu } from 'lucide-react';
import { usePortfolio } from '@/lib/store';
import { motion } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function Chatbot() {
    const { userName } = usePortfolio();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initial welcome message
    useEffect(() => {
        if (messages.length === 0 && userName) {
            setMessages([
                {
                    id: 'welcome',
                    role: 'assistant',
                    content: `Hola ${userName || 'User'}, soy la IA de Adrián. He analizado sus proyectos y skills. ¿Qué te gustaría saber?`
                }
            ]);
        }
    }, [userName]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
                })
            });

            if (!response.ok) throw new Error('Failed to fetch');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';
            const assistantMessageId = (Date.now() + 1).toString();

            setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }]);

            while (true) {
                const { done, value } = await reader!.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                assistantMessage += chunk;

                setMessages(prev => prev.map(m =>
                    m.id === assistantMessageId ? { ...m, content: assistantMessage } : m
                ));
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: 'Lo siento, hubo un error al procesar tu solicitud. Por favor intenta de nuevo.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[500px] w-full border border-border rounded-lg bg-card overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-border/30 p-2 flex items-center justify-between border-b border-border">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-accentGreen animate-pulse"></div>
                    <span className="text-xs font-mono text-textSec">AI_Assistant.exe</span>
                </div>
                <span className="text-xs font-mono text-textSec">v1.5.0</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm custom-scrollbar">
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
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-background/50">
                <div className="relative flex items-center">
                    <input
                        className="w-full bg-transparent text-textMain font-mono text-sm focus:outline-none placeholder-textSec/50 pr-10"
                        value={input}
                        onChange={handleInputChange}
                        placeholder={`Ask about my projects (e.g. 'Spark', 'Azure')...`}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-0 text-accentGreen hover:text-white transition-colors disabled:opacity-50"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
}
