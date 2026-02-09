"use client";

import React from 'react';
import { Database, Cpu, Cloud, HardDrive, Globe, Code, Workflow, ArrowRight } from 'lucide-react';

interface FlowStep {
    name: string;
    icon: string;
}

interface ArchitectureDiagramProps {
    type: 'ETL' | 'STREAMING' | 'WAREHOUSE' | 'MLOPS';
    flow?: FlowStep[];
}

const iconMap: Record<string, React.ElementType> = {
    database: Database,
    cpu: Cpu,
    cloud: Cloud,
    'hard-drive': HardDrive,
    globe: Globe,
    code: Code,
    workflow: Workflow,
};

const getLabel = (type: string) => {
    switch (type) {
        case 'ETL': return 'Batch Pipeline';
        case 'STREAMING': return 'Stream Process';
        case 'WAREHOUSE': return 'Backend Flow';
        case 'MLOPS': return 'ML Pipeline';
        default: return 'Data Flow';
    }
};

export default function ArchitectureDiagram({ type, flow }: ArchitectureDiagramProps) {
    // Fallback to generic flow if no custom flow provided
    const steps: FlowStep[] = flow || [
        { name: "Source", icon: "database" },
        { name: "Process", icon: "cpu" },
        { name: "Store", icon: "cloud" },
    ];

    return (
        <div className="w-full bg-background border border-border border-dashed rounded p-4 relative overflow-hidden group-hover:border-accentGreen/30 transition-colors">
            <div className="absolute top-2 right-2 text-[10px] font-mono text-textSec opacity-50">
                {getLabel(type)}
            </div>

            {/* Architecture Flow with real tool names */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2 flex-wrap">
                {steps.map((step, index) => {
                    const IconComponent = iconMap[step.icon] || Database;
                    return (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <ArrowRight className="text-accentGreen w-3 h-3 sm:w-4 sm:h-4 animate-pulse shrink-0" />
                            )}
                            <div className="flex flex-col items-center gap-1 group/step">
                                <div className="p-2 rounded border border-border/50 bg-card/50 group-hover/step:border-accentGreen/40 transition-colors">
                                    <IconComponent className="text-textSec w-4 h-4 sm:w-5 sm:h-5 group-hover/step:text-accentGreen transition-colors" />
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-mono text-textSec opacity-70">
                                    {step.name}
                                </span>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Grid Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(48,54,61,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(48,54,61,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
        </div>
    );
}
