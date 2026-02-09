"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, FileText, Calendar, Briefcase, ChevronRight } from 'lucide-react';
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
                    <div className="flex items-center space-x-3 mt-2 flex-wrap gap-y-1">
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
                        {project.role && (
                            <span className="text-xs text-textSec flex items-center gap-1">
                                <Briefcase size={12} />
                                {project.role}
                            </span>
                        )}
                        {project.period && (
                            <span className="text-xs text-textSec flex items-center gap-1">
                                <Calendar size={12} />
                                {project.period}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex space-x-2">
                    {project.repoUrl && project.repoUrl !== '#' && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md border border-border text-textSec hover:text-white hover:border-accentGreen hover:bg-accentGreen/10 transition-colors"
                            title="View Code"
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

            <p className="text-textSec mb-4 text-sm leading-relaxed">
                {project.description}
            </p>

            {/* Highlights / Key Achievements */}
            {project.highlights && project.highlights.length > 0 && (
                <ul className="mb-5 space-y-1.5">
                    {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-textSec">
                            <ChevronRight size={12} className="text-accentGreen mt-0.5 shrink-0" />
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mb-6">
                <ArchitectureDiagram type={project.diagramType} flow={project.architectureFlow} />
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
