"use client";

import React from 'react';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import ProjectCard from '@/components/ProjectCard';
import VisitCounter from '@/components/VisitCounter';
import { projects, skills, certifications } from '@/lib/portfolioData';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen md:h-screen text-textMain md:overflow-hidden relative" style={{ backgroundColor: '#F3F4F6' }}>
      <VisitCounter />
      <Header />

      <main className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
        {/* Left Column */}
        <div className="w-full md:w-[45%] lg:w-[40%] p-6 md:p-8 md:pt-12 h-auto md:h-full md:overflow-y-auto flex flex-col border-r border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-normal pt-2">
              Hola, soy <span className="text-accentGreen">Adrián.</span>
            </h1>
            <p className="text-xl text-textSec font-light">
              Bienvenido a mi espacio de datos. Soy <span className="text-textMain font-medium">Data Engineer</span> especializado en construir pipelines confiables.
            </p>
          </motion.div>

          <div className="flex-1 min-h-[400px] flex flex-col">
            <Chatbot startBoot={true} />
          </div>

          <div className="mt-8 hidden md:block">
            <h3 className="text-sm font-mono text-textSec mb-3">## TECNOLOGÍAS</h3>
            <div className="flex flex-wrap gap-2">
              {skills.flatMap(s => s.skills).slice(0, 12).map(skill => (
                <span key={skill} className="px-2 py-1 text-xs font-mono border border-border rounded text-textSec hover:border-accentCyan hover:text-accentCyan transition-colors cursor-default">
                  {skill}
                </span>
              ))}
              <span className="px-2 py-1 text-xs font-mono border border-border rounded text-textSec opacity-50">...</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[55%] lg:w-[60%] h-auto md:h-full md:overflow-y-auto p-6 md:p-8 bg-background/50">
          <div className="max-w-3xl mx-auto space-y-12">
            <section>
              <h2 className="text-sm font-mono text-textSec mb-6 flex items-center">
                <span className="text-accentGreen mr-2">./</span>
                experiencia_laboral
              </h2>
              <div className="grid gap-6">
                {projects.filter(p => p.status !== 'HIDDEN').map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            {certifications.length > 0 && (
              <section>
                <h2 className="text-sm font-mono text-textSec mb-6 flex items-center">
                  <span className="text-accentGreen mr-2">./</span>
                  certificaciones
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="p-4 border border-border rounded bg-card hover:bg-border/30 transition-colors">
                      <h4 className="font-bold text-sm text-textMain">{cert.name}</h4>
                      <p className="text-xs text-textSec mt-1">{cert.issuer} • {cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <footer className="pt-12 pb-6 text-center text-xs text-textSec font-mono border-t border-border mt-12">
              <p>Construido con Next.js + Tailwind + Gemini AI</p>
              <p className="opacity-50 mt-1">© {new Date().getFullYear()} Adrián Agüero. Todos los sistemas operativos.</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
