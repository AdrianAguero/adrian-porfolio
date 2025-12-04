"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/lib/store';

export default function TheGate() {
    console.log("Rendering TheGate");
    const { login } = usePortfolio();
    const [bootLines, setBootLines] = useState<string[]>([]);
    const [isReady, setIsReady] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isAccessGranted, setIsAccessGranted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const bootSequence = [
        "> Initializing kernel...",
        "> Loading modules...",
        "> System ready.",
        "> Please identify yourself:"
    ];

    useEffect(() => {
        let delay = 0;
        bootSequence.forEach((line, index) => {
            delay += 800;
            setTimeout(() => {
                setBootLines(prev => [...prev, line]);
                if (index === bootSequence.length - 1) {
                    setIsReady(true);
                }
            }, delay);
        });
    }, []);

    useEffect(() => {
        if (isReady && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isReady]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setIsAccessGranted(true);
        setTimeout(() => {
            login(inputValue.trim());
        }, 2000);
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 font-mono text-lg md:text-xl p-4" style={{ backgroundColor: '#0E1117' }}>
            <div className="w-full max-w-2xl">
                <div className="flex flex-col space-y-4">
                    {bootLines.map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-textSec"
                        >
                            {line}
                        </motion.div>
                    ))}
                </div>

                {isReady && !isAccessGranted && (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onSubmit={handleSubmit}
                        className="mt-6 flex items-center"
                    >
                        <span className="text-accentGreen mr-3">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="bg-transparent border-none outline-none text-textMain w-full caret-accentGreen placeholder-gray-700"
                            placeholder="Enter your name..."
                            autoFocus
                        />
                    </motion.form>
                )}

                {isAccessGranted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 text-accentGreen font-bold text-2xl tracking-widest"
                    >
                        {'>'} ACCESS GRANTED.
                    </motion.div>
                )}
            </div>
        </div>
    );
}
