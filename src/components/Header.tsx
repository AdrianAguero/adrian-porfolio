"use client";

import React from 'react';
import { Terminal, Download } from 'lucide-react';

import { profile } from '@/lib/portfolioData';

export default function Header() {
    return (
        <header className="sticky top-0 z-40 w-full bg-[#0E1117] border-b border-border h-14 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center space-x-2 text-sm font-mono">
                <Terminal className="text-accentGreen w-4 h-4" />
                <span className="text-textSec">~/adrian_portfolio</span>
                <span className="text-textSec">/</span>
                <span className="text-textMain font-bold">main</span>
            </div>

            <button
                className="flex items-center space-x-2 px-3 py-1.5 bg-card border border-border rounded-md text-xs font-medium text-textMain hover:border-textSec hover:bg-border/50 transition-colors"
                onClick={() => window.open(profile.links.cv || '#', '_blank')}
            >
                <Download className="w-3 h-3" />
                <span>Download CV</span>
            </button>
        </header>
    );
}
