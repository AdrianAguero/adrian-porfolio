import { LucideIcon, Database, Server, Cloud, Code, Terminal, Cpu, Layers, GitBranch } from 'lucide-react';

export type ProjectStatus = 'COMPLETED' | 'IN_PROGRESS' | 'HIDDEN';

export interface Link {
  url: string;
  label: string;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  yearsExperience: string; // Changed to string to match "+1 año"
  location: string;
  email: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
    cv?: string;
  };
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  status: ProjectStatus;
  repoUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  diagramType: 'ETL' | 'STREAMING' | 'WAREHOUSE' | 'MLOPS';
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

// --- NEW KNOWLEDGE BASE ---
export const knowledge = {
  profile: {
    name: "Adrián Agüero",
    age: 29,
    location: "Buenos Aires (AMBA)",
    englishLevel: "B1",
    workMode: "Remoto o Híbrido",
    relocation: "No",
    role: "Data Engineer",
    experience: "+1 año en banca",
    cv: "https://drive.google.com/file/d/1WOkUvivKh84Ry-0YwkbrqOz2zcAvAczk/view",
    summary:
      "Data Engineer con experiencia en procesos ETL y Big Data. Especializado en SQL, Hive, NiFi y Spark. Trabajé con datos financieros críticos (ATM, Contabilidad, Homebanking) y participé en la integración y estandarización multi-banco. Busco roles orientados a cloud."
  },

  workExperience: {
    helios: {
      role: "Data Engineer",
      period: "2024 - Actualidad",
      responsibilities: [
        "Desarrollo y mantenimiento de pipelines ETL sobre Hadoop.",
        "Integración de datos ATM, Contabilidad y Homebanking.",
        "Unificación multi-banco (BER, BSJ, BSC, BSF).",
        "Optimización de consultas SQL en tablas de gran volumen.",
        "Automatización de procesos usando Apache NiFi.",
        "Validación de calidad de datos y conciliaciones.",
        "Soporte y documentación de procesos financieros."
      ],
      tech: [
        "Hive SQL", "Spark", "PySpark", "HDFS",
        "Apache NiFi", "Impala", "Kudu", "Apache Atlas"
      ],
      achievements: [
        "Unificación de modelos ATM/Contabilidad/Homebanking.",
        "Mejoras en performance SQL.",
        "Reducción de tareas manuales mediante automatización en NiFi."
      ],
      dataTypes: [
        "Transacciones ATM", "Reversas", "Saldos contables",
        "Movimientos bancarios", "Datos de Homebanking"
      ]
    },

    neoris: {
      role: "Trainee .NET Developer",
      period: "2023",
      responsibilities: [
        "Soporte en desarrollo backend .NET.",
        "Mantenimiento de APIs REST.",
        "Optimización de consultas SQL.",
        "Resolución de bugs y tareas operativas."
      ],
      tech: ["C#", ".NET", "SQL Server"]
    }
  },

  skills: {
    primary: ["SQL", "Hive", "Hadoop", "NiFi"],
    secondary: ["Spark", "Impala", "Kudu", "Python"],
    cloud: ["Azure (ADF, Synapse)"],
    soft: ["Trabajo en banca", "Estandarización de datos", "Data Quality"]
  },

  goals: {
    roles: [
      "Data Engineer Jr/Ssr",
      "Big Data Engineer",
      "Cloud Data Engineer",
      "ETL Developer"
    ],
    direction: "Migrar a tecnologías cloud"
  }
};

// --- MAPPING FOR UI COMPATIBILITY ---

export const profile: Profile = {
  name: knowledge.profile.name,
  role: knowledge.profile.role,
  bio: knowledge.profile.summary,
  yearsExperience: knowledge.profile.experience,
  location: knowledge.profile.location,
  email: "contact@adrianaguero.dev", // Placeholder as it wasn't in knowledge base
  links: {
    github: "https://github.com/adrianaguero",
    linkedin: "https://linkedin.com/in/adrianaguero",
    email: "mailto:contact@adrianaguero.dev",
    cv: knowledge.profile.cv
  }
};

export const skills: SkillCategory[] = [
  {
    name: "Core & Big Data",
    skills: [...knowledge.skills.primary, ...knowledge.skills.secondary]
  },
  {
    name: "Cloud & Goals",
    skills: knowledge.skills.cloud
  },
  {
    name: "Soft Skills",
    skills: knowledge.skills.soft
  }
];

export const projects: Project[] = [
  {
    id: "exp_helios",
    title: "Helios System (Banca)",
    description: "Desarrollo de pipelines ETL sobre Hadoop, integración multi-banco (ATM, Contabilidad) y automatización con NiFi. Optimización de SQL en tablas de alto volumen.",
    techStack: knowledge.workExperience.helios.tech,
    status: "IN_PROGRESS", // "Actualidad"
    diagramType: "ETL",
    repoUrl: "#"
  },
  {
    id: "exp_neoris",
    title: "Neoris (Backend)",
    description: "Desarrollo backend con .NET/C#, mantenimiento de APIs REST y optimización de consultas SQL Server.",
    techStack: knowledge.workExperience.neoris.tech,
    status: "COMPLETED",
    diagramType: "WAREHOUSE",
    repoUrl: "#"
  }
];

export const certifications: Certification[] = []; // Empty as per new knowledge base

