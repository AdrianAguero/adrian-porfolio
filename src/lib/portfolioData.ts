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
  yearsExperience: string;
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
  highlights?: string[];
  period?: string;
  role?: string;
  badge?: string;
  architectureFlow?: { name: string; icon: string }[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

// --- KNOWLEDGE BASE ---
export const knowledge = {
  profile: {
    name: "Adrián Agüero",
    age: 29,
    location: "Buenos Aires (AMBA)",
    englishLevel: "A2 (en formación)",
    workMode: "Remoto o Híbrido",
    relocation: "No",
    role: "Semi Senior Data Engineer",
    experience: "+2 años en banca",
    cv: "https://drive.google.com/file/d/1QViXff7nz_KPYf1wg45tnNiktXzLytGG/view?usp=sharing",
    summary:
      "Semi Senior Data Engineer con más de 2 años de experiencia construyendo y manteniendo pipelines ETL end-to-end en ecosistemas Hadoop/Cloudera para el sector bancario. Especializado en Apache NiFi, Hive, Impala, SQL avanzado y gobierno de datos con Apache Atlas, trabajando sobre arquitecturas Data Lake tipo Medallion de 5 capas. Experiencia comprobada resolviendo incidencias críticas en pipelines productivos para 4 bancos del Grupo Petersen, con foco en calidad de datos, trazabilidad y eficiencia operativa. En formación activa en Python, PySpark y Azure Data Engineering."
  },

  workExperience: {
    helios: {
      role: "Semi Senior Data Engineer",
      period: "Febrero 2024 - Mayo 2026",
      responsibilities: [
        "Desarrollo y mantenimiento de pipelines ETL end-to-end sobre arquitectura Data Lake Medallion de 5 capas en Cloudera.",
        "Ingesta y transformación de datos con Apache NiFi: flujos dinámicos configurados vía Atlas Terms en params_ingestas.",
        "Transformaciones SQL complejas (CTEs, window functions) en Hive e Impala sobre grandes volúmenes de datos.",
        "Gobierno y trazabilidad de datos con Apache Atlas: metadata, linaje y configuración centralizada de ingestas.",
        "Resolución de incidencias críticas de calidad de datos en producción: análisis de causa raíz y reprocesamientos end-to-end.",
        "Diseño e implementación de tablas y métricas nuevas según Diseño Técnico con manejo de late-arriving data.",
        "Orquestación event-driven entre capas usando Kafka como mecanismo de señalización.",
        "Relevamiento funcional con stakeholders bancarios y validación de resultados pre-producción.",
        "Monitoreo de pipelines productivos con Elastic Stack (Kibana).",
        "Coordinación de pases a producción y soporte post-implantación."
      ],
      tech: [
        "Apache NiFi", "Apache Hive", "Apache Impala",
        "Apache Atlas", "Apache Kudu", "HDFS",
        "HiveQL", "SQL avanzado", "Kafka",
        "Cloudera", "Elastic Stack", "WinSCP / PuTTY"
      ],
      achievements: [
        "Resolución de bug crítico en pipeline de pagos digitales MODO: recuperación de datos históricos perdidos en los 4 bancos mediante CTE deduplicado con ROW_NUMBER() OVER (PARTITION BY payment_id).",
        "Diseño e implementación de tabla de métricas mensuales HBI con manejo de late-arriving data y ventana de lookback de 2 meses.",
        "Coordinación de reprocesamiento contable end-to-end multicapa para cierre de saldos bancarios sin impacto en producción.",
        "Implementación de patrón de configuración dinámica NiFi + Atlas que permite gestionar cientos de tablas sin modificar el código del pipeline."
      ],
      dataTypes: [
        "Transacciones ATM", "Pagos digitales (MODO)",
        "Saldos contables", "Movimientos bancarios",
        "Métricas de canales digitales (HBI)", "Tarjetas de crédito/débito"
      ]
    },

    neoris: {
      role: "Desarrollador .NET Back-End",
      period: "Febrero 2023 - Agosto 2023",
      responsibilities: [
        "Desarrollo de servicios backend con C#/.NET y SQL Server para integración y manipulación de datos empresariales.",
        "Optimización de consultas SQL para mejorar rendimiento y escalabilidad.",
        "Implementación de procesos de automatización de datos.",
        "Colaboración con equipos de datos y desarrollo."
      ],
      tech: ["C#", ".NET", "SQL Server", "APIs REST"]
    }
  },

  skills: {
    primary: ["SQL avanzado", "Apache Hive", "Apache Impala", "Apache NiFi"],
    secondary: ["Apache Atlas", "Apache Kudu", "HDFS", "Kafka", "Cloudera"],
    inProgress: ["Azure Data Engineering", "Databricks"],
    soft: ["Gobierno de datos", "Relevamiento funcional", "Resolución de incidencias productivas", "Comunicación con stakeholders"]
  },

  architecture: {
    layers: [
      { name: "Raw (1raw)", storage: "HDFS", description: "Datos crudos en STRING, tablas externas, formato Parquet, particionado por fecha_proceso" },
      { name: "Curado (2cur)", storage: "HDFS", description: "Casteo de tipos, limpieza y normalización, tablas externas" },
      { name: "Refinado (3ref)", storage: "HDFS", description: "Reglas de negocio aplicadas, tablas externas" },
      { name: "Consumo (4con)", storage: "Kudu", description: "Datos actualizables, baja latencia, tablas internas" },
      { name: "Datamart", storage: "Kudu", description: "Producto final para reporting y BI, tablas internas" }
    ],
    pattern: "NiFi detecta archivo → consulta Atlas Term → ejecuta flujo dinámico → Hive transforma → Kafka señaliza capa completa → siguiente capa procesa"
  },

  goals: {
    roles: [
      "Semi Senior Data Engineer",
      "Data Engineer SSR/SR",
      "Cloud Data Engineer",
      "Analytics Engineer"
    ],
    direction: "Consolidar stack moderno: Python + PySpark + Azure + dbt"
  }
};

// --- MAPPING FOR UI COMPATIBILITY ---

export const profile: Profile = {
  name: knowledge.profile.name,
  role: knowledge.profile.role,
  bio: knowledge.profile.summary,
  yearsExperience: knowledge.profile.experience,
  location: knowledge.profile.location,
  email: "aguero.adrian.data@gmail.com",
  links: {
    github: "https://github.com/AdrianAguero",
    linkedin: "https://www.linkedin.com/in/adri%C3%A1n-ag%C3%BCero/",
    email: "mailto:aguero.adrian.data@gmail.com",
    cv: knowledge.profile.cv
  }
};

export const skills: SkillCategory[] = [
  {
    name: "Core Stack (Productivo)",
    skills: [...knowledge.skills.primary, ...knowledge.skills.secondary]
  },
  {
    name: "En Formación Activa",
    skills: knowledge.skills.inProgress
  },
  {
    name: "Soft Skills",
    skills: knowledge.skills.soft
  }
];

export const projects: Project[] = [
  {
    id: "exp_helios_ssr",
    title: "Repositorio Único — Grupo Petersen (SSR)",
    description: "Liderazgo técnico de pipelines ETL productivos para los 4 bancos del Grupo Petersen (BER, BSJ, BSC, BSF), con foco en calidad de datos, gobierno y resolución de incidencias críticas en producción.",
    techStack: ["Apache NiFi", "Apache Atlas", "HiveQL", "Apache Impala", "Kafka", "Elastic Stack"],
    status: "COMPLETED",
    diagramType: "ETL",
    period: "Febrero 2025 - Mayo 2026",
    role: "Semi Senior Data Engineer",
    badge: "Producción",
    highlights: [
      "Bug crítico en pipeline MODO: recuperación de datos históricos con CTE deduplicado (ROW_NUMBER)",
      "Reprocesamiento contable end-to-end multicapa para cierre de saldos bancarios",
      "Diseño de tabla de métricas HBI mensual con manejo de late-arriving data",
      "Patrón NiFi + Atlas: configuración dinámica para cientos de tablas sin modificar código",
      "Coordinación con stakeholders bancarios y validación pre-producción"
    ]
  },
  {
    id: "exp_helios_jr",
    title: "Repositorio Único — Grupo Petersen (DE)",
    description: "Desarrollo de pipelines ETL end-to-end sobre Data Lake Medallion de 5 capas en Cloudera para los 4 bancos del Grupo Petersen. Ingesta, transformación y gobierno de datos de múltiples dominios bancarios.",
    techStack: ["Apache NiFi", "Apache Hive", "Apache Impala", "Apache Atlas", "Apache Kudu", "HDFS", "Cloudera"],
    status: "COMPLETED",
    diagramType: "ETL",
    period: "Febrero 2024 - Febrero 2025",
    role: "Data Engineer",
    badge: "Batch ETL",
    highlights: [
      "Arquitectura Data Lake Medallion: Raw → Curado → Refinado → Consumo → Datamart",
      "Ingesta con NiFi: flujos dinámicos configurados vía Atlas Terms en params_ingestas",
      "Dominios: ATM, Contabilidad, Tarjetas (TC), Canales HBI, Pagos Digitales (MODO)",
      "HDFS (Raw-Refinado, tablas externas) + Kudu (Consumo-Datamart, tablas internas)",
      "Integración de 4 bancos con estructuras de origen heterogéneas"
    ],
    architectureFlow: [
      { name: "Fuentes Bancarias", icon: "database" },
      { name: "WinSCP/SFTP", icon: "server" },
      { name: "NiFi + Atlas", icon: "workflow" },
      { name: "HDFS (Raw→Ref)", icon: "hard-drive" },
      { name: "Kudu (Datamart)", icon: "database" }
    ]
  },
  {
    id: "exp_neoris",
    title: "Neoris — Backend .NET",
    description: "Desarrollo de servicios backend con C#/.NET y SQL Server para integración de datos empresariales. Primer contacto con SQL productivo y arquitecturas de integración.",
    techStack: ["C#", ".NET", "SQL Server", "APIs REST"],
    status: "COMPLETED",
    diagramType: "WAREHOUSE",
    period: "Febrero 2023 - Agosto 2023",
    role: "Desarrollador .NET Back-End",
    highlights: [
      "Desarrollo y mantenimiento de APIs REST con C#/.NET",
      "Optimización de consultas SQL Server en sistemas productivos",
      "Automatización de procesos de datos reduciendo intervención manual"
    ],
    architectureFlow: [
      { name: "API REST", icon: "globe" },
      { name: ".NET", icon: "code" },
      { name: "SQL Server", icon: "database" }
    ]
  }
];

export const certifications: Certification[] = [
  {
    name: "Azure Data Engineer Associate (DP-203)",
    issuer: "Microsoft",
    date: "Objetivo 2026",
    url: ""
  },
  {
    name: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    date: "Objetivo 2026",
    url: ""
  }
];
