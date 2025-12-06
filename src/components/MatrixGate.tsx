"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/lib/store';

export default function MatrixGate({ onExitComplete }: { onExitComplete?: () => void }) {
    const { login } = usePortfolio();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const bootStarted = useRef(false);

    // States: 'BOOTING' | 'IDLE' | 'ACCEPTED' | 'ENTERING'
    const [phase, setPhase] = useState<'BOOTING' | 'IDLE' | 'ACCEPTED' | 'ENTERING'>('BOOTING');
    const [bootLines, setBootLines] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const bootSequence = [
        "> Inicializando el kernel...",
        "> Cargando interfaces neuronales...",
        "> Desencriptando pasarela segura...",
        "> Conexión establecida.",
        "> Verificación de identidad requerida."
    ];

    // --- 1. MATRIX RAIN EFFECT ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = [];

        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start above screen randomly
        }

        const chars = "01";

        const draw = () => {
            // Semi-transparent black to create trail effect
            // Using the portfolio background color #0E1117
            ctx.fillStyle = 'rgba(14, 17, 23, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00D084'; // Portfolio Accent Green
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));

                // Randomly brighter characters for "glint" effect
                if (Math.random() > 0.98) {
                    ctx.fillStyle = '#80FFC0'; // Brighter green
                } else {
                    ctx.fillStyle = '#00D084';
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly after it crosses screen
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // --- 2. BOOT SEQUENCE ---
    useEffect(() => {
        if (bootStarted.current) return;
        bootStarted.current = true;

        let delay = 0;
        bootSequence.forEach((line, index) => {
            delay += 1200; // 1.2s between lines
            setTimeout(() => {
                setBootLines(prev => [...prev, line]);
                if (index === bootSequence.length - 1) {
                    setTimeout(() => setPhase('IDLE'), 500);
                }
            }, delay);
        });
    }, []);

    // Focus input on IDLE
    useEffect(() => {
        if (phase === 'IDLE' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [phase]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setPhase('ACCEPTED');

        // FASE 3: Wait 3s then start ENTERING
        setTimeout(() => {
            setPhase('ENTERING');

            // FASE 4: Wait 4s for transition then login (which unmounts/hides Gate)
            setTimeout(() => {
                login(inputValue.trim());
                if (onExitComplete) onExitComplete();
            }, 4000);
        }, 3000);
    };

    return (
        <motion.div
            ref={containerRef}
            className="fixed inset-0 z-50 overflow-hidden"
            style={{ backgroundColor: '#0E1117' }}
            animate={
                phase === 'ENTERING'
                    ? { opacity: 0, scale: 1.5, pointerEvents: 'none' }
                    : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 4, ease: "easeInOut" }}
        >
            {/* Canvas Layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-40"
            />

            {/* Content Layer */}
            <AnimatePresence>
                {phase !== 'ACCEPTED' && phase !== 'ENTERING' && (
                    <div className="relative z-10 flex flex-col items-center justify-center h-full font-mono p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
                            className="w-full max-w-lg bg-[#0E1117]/90 border border-[#00D084]/30 rounded-lg p-8 shadow-[0_0_50px_rgba(0,208,132,0.1)] backdrop-blur-sm"
                        >
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-[#00D084] tracking-widest drop-shadow-[0_0_10px_rgba(0,208,132,0.5)]">
                                    ACCESO AL SISTEMA
                                </h1>
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00D084]/50 to-transparent mt-6" />
                            </div>

                            {/* Boot Lines */}
                            {phase === 'BOOTING' && (
                                <div className="flex flex-col space-y-3 min-h-[120px] pl-4 border-l-2 border-[#00D084]/20">
                                    {bootLines.map((line, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-[#00D084] text-sm md:text-base font-light"
                                        >
                                            {line}
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Input Phase */}
                            <AnimatePresence mode="wait">
                                {phase === 'IDLE' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                        className="flex flex-col items-center w-full"
                                    >
                                        <p className="text-[#00D084]/70 text-xs tracking-[0.2em] mb-6 uppercase">
                                            Verificación de identidad requerida
                                        </p>

                                        <form onSubmit={handleSubmit} className="w-full">
                                            <div className="relative group">
                                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00D084]/20 to-[#00D084]/40 rounded opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 blur"></div>
                                                <div className="relative flex items-center bg-[#0E1117] border border-[#00D084]/50 rounded px-4 py-3">
                                                    <span className="text-[#00D084] mr-3 font-bold">{'>_'}</span>
                                                    <input
                                                        ref={inputRef}
                                                        type="text"
                                                        value={inputValue}
                                                        onChange={(e) => setInputValue(e.target.value)}
                                                        className="bg-transparent border-none outline-none text-[#00D084] w-full caret-[#00D084] text-lg placeholder-[#00D084]/30 uppercase tracking-wider"
                                                        placeholder="INGRESAR NOMBRE"
                                                        autoFocus
                                                        spellCheck={false}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
