// ── Profile ──────────────────────────────────────────────────────
export const profile = {
  name: "Adrián Agüero",
  role: "Semi Senior Data Engineer",
  email: "aguero.adrian.data@gmail.com",
  location: "Buenos Aires · AMBA",
  workMode: "Remoto o Híbrido",
  englishLevel: "A2 (en formación)",
  relocation: "No",
  links: {
    github: "https://github.com/AdrianAguero",
    linkedin: "https://www.linkedin.com/in/adri%C3%A1n-ag%C3%BCero/",
    email: "mailto:aguero.adrian.data@gmail.com",
    cv: "https://drive.google.com/file/d/1QViXff7nz_KPYf1wg45tnNiktXzLytGG/view?usp=sharing",
  },
  summary:
    "Semi Senior Data Engineer con más de 2 años construyendo y manteniendo pipelines ETL end-to-end en ecosistemas Hadoop/Cloudera para el sector bancario. Especializado en Apache NiFi, Hive, Impala, SQL avanzado y gobierno de datos con Apache Atlas sobre arquitecturas Data Lake tipo Medallion de 5 capas.",
};

// ── Experience ───────────────────────────────────────────────────
export interface Role {
  role: string;
  period: string;
  length: string;
  current: boolean;
  highlights: string[];
}

export interface Job {
  id: string;
  company: string;
  sector: string;
  tenure: string;
  period: string;
  badge: string | null;
  summary: string;
  roles: Role[];
  tech: string[];
}

export const experience: Job[] = [
  {
    id: "helios",
    company: "Helios System",
    sector: "Banca",
    tenure: "2 años 4 meses",
    period: "Feb 2024 — May 2026",
    badge: "Producción",
    summary:
      "Pipelines ETL end-to-end para los 4 bancos del Grupo Petersen (BER, BSJ, BSC, BSF) sobre Cloudera, con foco en calidad de datos, gobierno y resolución de incidencias críticas en producción.",
    roles: [
      {
        role: "Semi Senior Data Engineer",
        period: "Feb 2025 — Actualidad",
        length: "1 año 5 meses",
        current: true,
        highlights: [
          "Bug crítico en el pipeline de pagos MODO: recuperé datos históricos perdidos en los 4 bancos con un CTE deduplicado (ROW_NUMBER OVER PARTITION BY payment_id).",
          "Reprocesamiento contable end-to-end para el cierre de saldos bancarios, sin impacto en producción.",
          "Diseñé la tabla de métricas mensuales HBI con manejo de late-arriving data y ventana de lookback.",
          "Análisis de causa raíz de incidentes productivos sobre Cloudera/Hadoop.",
        ],
      },
      {
        role: "Data Engineer",
        period: "Feb 2024 — Feb 2025",
        length: "1 año",
        current: false,
        highlights: [
          "Desarrollo de pipelines ETL end-to-end en el ecosistema Hadoop (Hive, Impala, NiFi, Atlas).",
          "Ingesta dinámica con NiFi + Atlas: cientos de tablas gestionadas sin tocar el código del pipeline.",
          "Estandarización, casteo y reglas de negocio sobre grandes volúmenes de datos bancarios.",
          "Dominios: ATM, contabilidad, tarjetas, canales digitales (HBI) y pagos digitales (MODO).",
        ],
      },
    ],
    tech: ["Apache NiFi", "Apache Hive", "Apache Impala", "Apache Atlas", "Apache Kudu", "HDFS", "Kafka", "Cloudera"],
  },
  {
    id: "neoris",
    company: "Neoris",
    sector: "Software",
    tenure: "7 meses",
    period: "Feb 2023 — Ago 2023",
    badge: null,
    summary:
      "Servicios backend con C#/.NET y SQL Server para integración de datos empresariales. Primer contacto con SQL productivo y arquitecturas de integración.",
    roles: [
      {
        role: "Desarrollador .NET Back-End",
        period: "Feb 2023 — Ago 2023",
        length: "7 meses",
        current: false,
        highlights: [
          "Desarrollo y mantenimiento de APIs REST con C#/.NET.",
          "Optimización de consultas SQL Server en sistemas productivos.",
          "Automatización de procesos de datos reduciendo intervención manual.",
        ],
      },
    ],
    tech: ["C#", ".NET", "SQL Server", "APIs REST"],
  },
];

// ── Stack ─────────────────────────────────────────────────────────
export const stack = {
  core: ["SQL avanzado", "Apache Hive", "Apache Impala", "Apache NiFi"],
  platform: ["Apache Atlas", "Apache Kudu", "HDFS", "Kafka", "Cloudera", "Elastic Stack"],
  learning: ["Azure Data Engineering", "Databricks", "dbt"],
};

// ── Certifications ────────────────────────────────────────────────
export interface Certification {
  name: string;
  issuer: string;
  year: string;
  area: string;
}

export const certifications: Certification[] = [
  { name: "SQL (Advanced)", issuer: "HackerRank", year: "2024", area: "Datos" },
  { name: "AZ-900: Azure Fundamentals", issuer: "Microsoft", year: "2025", area: "Cloud" },
  { name: "DP-900: Azure Data Fundamentals", issuer: "Microsoft", year: "2025", area: "Cloud" },
  { name: "Git & GitHub", issuer: "Platzi", year: "2023", area: "Herramientas" },
];

export interface CertInProgress {
  name: string;
  issuer: string;
  date: string;
}

export const certs: CertInProgress[] = [
  { name: "Azure Data Engineer Associate (DP-203)", issuer: "Microsoft", date: "Objetivo 2026" },
  { name: "Databricks Certified Data Engineer Associate", issuer: "Databricks", date: "Objetivo 2026" },
];

// ── Chat suggested questions ──────────────────────────────────────
export const SUGGESTED = [
  { q: "¿Cuál es tu stack principal?" },
  { q: "Contame tu logro más difícil" },
  { q: "¿Qué experiencia tenés en banca?" },
  { q: "¿Estás disponible para trabajar?" },
];

// ── Legacy exports (kept for backwards compat) ────────────────────
export const knowledge = {
  profile: {
    name: profile.name,
    role: profile.role,
    experience: "+2 años en banca",
    location: profile.location,
    englishLevel: profile.englishLevel,
    workMode: profile.workMode,
    relocation: profile.relocation,
    cv: profile.links.cv,
    summary: profile.summary,
  },
  workExperience: {
    helios: {
      role: "Semi Senior Data Engineer",
      period: "Febrero 2024 - Mayo 2026",
      responsibilities: experience[0].roles.flatMap(r => r.highlights),
      tech: experience[0].tech,
      achievements: experience[0].roles[0].highlights,
      dataTypes: ["Transacciones ATM", "Pagos digitales (MODO)", "Saldos contables", "Métricas HBI", "Tarjetas"],
    },
    neoris: {
      role: "Desarrollador .NET Back-End",
      period: "Febrero 2023 - Agosto 2023",
      responsibilities: experience[1].roles[0].highlights,
      tech: experience[1].tech,
    },
  },
  skills: {
    primary: stack.core,
    secondary: stack.platform,
    inProgress: stack.learning,
    soft: ["Gobierno de datos", "Relevamiento funcional", "Resolución de incidencias productivas"],
  },
  goals: {
    roles: ["Semi Senior Data Engineer", "Cloud Data Engineer", "Analytics Engineer"],
    direction: "Consolidar stack moderno: Azure + Databricks + dbt",
  },
};
