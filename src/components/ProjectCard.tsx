"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, FileText } from 'lucide-react';
import { Project } from '@/lib/portfolioData';
import ArchitectureDiagram from './ArchitectureDiagram';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, borderColor: '#00D084' }}
            className="bg-card border border-border rounded-lg p-6 transition-colors duration-300 group"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-textMain group-hover:text-accentGreen transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                        {project.status === 'IN_PROGRESS' && (
                            <span className="text-xs font-mono bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">
                                WIP
                            </span>
                        )}
                        {project.status === 'COMPLETED' && (
                            <span className="text-xs font-mono bg-accentGreen/10 text-accentGreen px-2 py-1 rounded border border-accentGreen/20">
                                v1.0
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex space-x-2">
                    {project.repoUrl && (
                        <a
                            href={project.status === 'IN_PROGRESS' ? '#' : project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-md border border-border transition-colors ${project.status === 'IN_PROGRESS'
                                    ? 'text-textSec cursor-not-allowed opacity-50'
                                    : 'text-textSec hover:text-white hover:border-accentGreen hover:bg-accentGreen/10'
                                }`}
                            title={project.status === 'IN_PROGRESS' ? 'Private Repo (WIP)' : 'View Code'}
                        >
                            <Github size={18} />
                        </a>
                    )}
                    {project.caseStudyUrl && (
                        <a
                            href={project.caseStudyUrl}
                            className="p-2 rounded-md border border-border text-textSec hover:text-white hover:border-accentCyan hover:bg-accentCyan/10 transition-colors"
                            title="Read Case Study"
                        >
                            <FileText size={18} />
                        </a>
                    )}
                </div>
            </div>

            <p className="text-textSec mb-6 text-sm leading-relaxed">
                {project.description}
            </p>

            <div className="mb-6">
                <ArchitectureDiagram type={project.diagramType} />
            </div>

            <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                    <span
                        key={tech}
                        className="text-xs font-mono text-textSec bg-background border border-border px-2 py-1 rounded hover:border-accentCyan hover:text-accentCyan transition-colors cursor-default"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
