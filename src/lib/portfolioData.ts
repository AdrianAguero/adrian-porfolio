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
    badge: "Actual",
    summary:
      "Pipelines ETL end-to-end para los 4 bancos del Grupo Petersen (BER, BSJ, BSC, BSF) sobre Cloudera, con foco en calidad de datos, gobierno y resolución de incidencias críticas en producción.",
    roles: [
      {
        role: "Semi Senior Data Engineer",
        period: "Feb 2025 — Actualidad",
        length: "1 año 5 meses",
        current: true,
        highlights: [
          "Responsable de la confiabilidad y calidad de los datos en pipelines productivos para los 4 bancos del Grupo Petersen.",
          "Resolución de incidentes críticos en producción y análisis de causa raíz sobre el ecosistema Cloudera/Hadoop.",
          "Diseño de nuevas estructuras de datos y métricas de negocio según requerimientos de las áreas funcionales.",
          "Coordinación directa con stakeholders bancarios para relevamiento, validación y mejora continua de los procesos de datos.",
        ],
      },
      {
        role: "Data Engineer",
        period: "Feb 2024 — Feb 2025",
        length: "1 año",
        current: false,
        highlights: [
          "Desarrollo y mantenimiento de pipelines ETL end-to-end sobre arquitectura Data Lake en el ecosistema Hadoop.",
          "Integración de múltiples fuentes bancarias con estructuras heterogéneas en una plataforma analítica unificada.",
          "Estandarización, transformación y aplicación de reglas de negocio sobre grandes volúmenes de datos.",
          "Gobierno y trazabilidad de datos en múltiples dominios: ATM, contabilidad, tarjetas, canales digitales (HBI) y pagos digitales (MODO).",
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
  date: string;
  category: string;
  pdfUrl: string;
  status: "obtenida" | "en_curso";
}

export const certifications: Certification[] = [
  // SQL
  { name: "Intermediate SQL", issuer: "DataCamp", date: "Ago 2024", category: "SQL", pdfUrl: "/certificates/datacamp-intermediate-sql.pdf", status: "obtenida" },
  { name: "Joining Data in SQL", issuer: "DataCamp", date: "Ago 2024", category: "SQL", pdfUrl: "/certificates/datacamp-joining-data-sql.pdf", status: "obtenida" },
  { name: "Data Manipulation in SQL", issuer: "DataCamp", date: "Feb 2025", category: "SQL", pdfUrl: "/certificates/datacamp-data-manipulation-sql.pdf", status: "obtenida" },
  // Modelado y Data Engineering
  { name: "Database Design", issuer: "DataCamp", date: "Jun 2026", category: "Modelado y Data Engineering", pdfUrl: "/certificates/datacamp-database-design.pdf", status: "obtenida" },
  { name: "Data Warehousing Concepts", issuer: "DataCamp", date: "Jun 2026", category: "Modelado y Data Engineering", pdfUrl: "/certificates/datacamp-data-warehousing.pdf", status: "obtenida" },
  { name: "Understanding Data Engineering", issuer: "DataCamp", date: "Jul 2024", category: "Modelado y Data Engineering", pdfUrl: "/certificates/datacamp-understanding-data-engineering.pdf", status: "obtenida" },
  // Python
  { name: "Python para Análisis de Datos", issuer: "EducaciónIT", date: "Jul 2024", category: "Python", pdfUrl: "/certificates/educacionit-python-analisis-datos.pdf", status: "obtenida" },
  { name: "Python Avanzado", issuer: "EducaciónIT", date: "Jun 2024", category: "Python", pdfUrl: "/certificates/educacionit-python-avanzado.pdf", status: "obtenida" },
  { name: "Introducción al Paradigma de Objetos", issuer: "EducaciónIT", date: "Ago 2023", category: "Python", pdfUrl: "/certificates/educacionit-paradigma-objetos.pdf", status: "obtenida" },
  // Herramientas
  { name: "Git: Desarrollo Colaborativo", issuer: "EducaciónIT", date: "Oct 2023", category: "Herramientas", pdfUrl: "/certificates/educacionit-git.pdf", status: "obtenida" },
  { name: "MongoDB Fundamentos", issuer: "EducaciónIT", date: "Oct 2023", category: "Herramientas", pdfUrl: "/certificates/educacionit-mongodb.pdf", status: "obtenida" },
  // Formación Académica
  { name: "Tec. Universitaria en Hemoterapia e Inmunohematología", issuer: "Universidad de Buenos Aires", date: "2021", category: "Formación Académica", pdfUrl: "/certificates/titulo-uba.pdf", status: "obtenida" },
  // En curso
  { name: "Associate Data Engineer in SQL", issuer: "DataCamp", date: "En curso", category: "En curso", pdfUrl: "", status: "en_curso" },
  { name: "Azure Data Engineer Associate (DP-203)", issuer: "Microsoft", date: "Objetivo 2026", category: "En curso", pdfUrl: "", status: "en_curso" },
  { name: "Databricks Certified Data Engineer Associate", issuer: "Databricks", date: "Objetivo 2026", category: "En curso", pdfUrl: "", status: "en_curso" },
];

// keep certs alias for legacy usage
export const certs = certifications.filter(c => c.status === "en_curso");

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
