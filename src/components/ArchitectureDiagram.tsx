"use client";

import React from 'react';
import { Database, Server, Cloud, Cpu, ArrowRight } from 'lucide-react';

interface ArchitectureDiagramProps {
    type: 'ETL' | 'STREAMING' | 'WAREHOUSE' | 'MLOPS';
}

export default function ArchitectureDiagram({ type }: ArchitectureDiagramProps) {
    const getLabel = () => {
        switch (type) {
            case 'ETL': return 'Batch Pipeline v1.0';
            case 'STREAMING': return 'Stream Process v0.9';
            case 'WAREHOUSE': return 'DWH Schema v2.1';
            case 'MLOPS': return 'Inference Graph v0.1';
        }
    };

    return (
        <div className="w-full h-32 bg-background border border-border border-dashed rounded flex items-center justify-center relative overflow-hidden group-hover:border-accentGreen/30 transition-colors">
            <div className="absolute top-2 right-2 text-[10px] font-mono text-textSec opacity-50">
                {getLabel()}
            </div>

            {/* Abstract Flow Visualization */}
            <div className="flex items-center space-x-4 opacity-60 group-hover:opacity-100 transition-opacity">
                <Database className="text-textSec w-6 h-6" />
                <ArrowRight className="text-accentGreen w-4 h-4 animate-pulse" />
                <Cpu className="text-textSec w-6 h-6" />
                <ArrowRight className="text-accentGreen w-4 h-4 animate-pulse" />
                <Cloud className="text-textSec w-6 h-6" />
            </div>

            {/* Grid Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(48,54,61,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(48,54,61,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
        </div>
    );
}
