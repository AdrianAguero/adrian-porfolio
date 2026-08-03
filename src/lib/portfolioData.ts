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
    "Semi Senior Data Engineer con más de 2 años construyendo y manteniendo pipelines ETL end-to-end sobre Cloudera. Experiencia en banca (4 bancos del Grupo Petersen) y actualmente en el sector energético (proyecto YPF en Taligent). Especializado en Apache NiFi, PySpark, Hive, Impala, SQL avanzado y gobierno de datos sobre arquitecturas Data Lake tipo Medallion.",
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
    id: "taligent",
    company: "Taligent",
    sector: "Energía",
    tenure: "1 mes",
    period: "Jul 2026 — Actualidad",
    badge: "Actual",
    summary:
      "Desarrollo end-to-end de productos de datos para YPF sobre Cloudera CDP.",
    roles: [
      {
        role: "Semi Senior Data Engineer",
        period: "Jul 2026 — Actualidad",
        length: "1 mes",
        current: true,
        highlights: [
          "Desarrollo end-to-end de productos de datos en ecosistema Cloudera CDP, desde el consumo e ingesta hasta la disponibilización para consumo analítico.",
          "Construcción de pipelines de ingesta y transformación con Apache NiFi y PySpark.",
          "Modelado dimensional y capas curadas; optimización de consultas SQL en Hive/Impala.",
          "Aplicación de técnicas de calidad y gobierno de datos; diseño de pruebas y documentación técnica.",
        ],
      },
    ],
    tech: ["Cloudera CDP", "Apache NiFi", "PySpark", "Apache Hive", "Apache Impala", "SQL avanzado"],
  },
  {
    id: "helios",
    company: "Helios System",
    sector: "Bancario",
    tenure: "2 años 5 meses",
    period: "Feb 2024 — Jul 2026",
    badge: null,
    summary:
      "Pipelines ETL end-to-end para los 4 bancos del Grupo Petersen (BER, BSJ, BSC, BSF) sobre Cloudera, con foco en calidad de datos, gobierno y resolución de incidencias críticas en producción.",
    roles: [
      {
        role: "Semi Senior Data Engineer",
        period: "Feb 2025 — Jul 2026",
        length: "1 año 5 meses",
        current: false,
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
  core: ["SQL avanzado", "Apache Hive", "Apache Impala", "Apache NiFi", "PySpark"],
  platform: ["Apache Atlas", "Apache Kudu", "HDFS", "Kafka", "Cloudera", "Spark", "Elastic Stack"],
  learning: ["Python (consolidando)", "PySpark (profundizar API de DataFrames)", "Azure Databricks"],
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
  { name: "Licenciatura en Ciencias de Datos", issuer: "UNAB", date: "En curso", category: "Formación Académica", pdfUrl: "", status: "en_curso" },
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
  { q: "¿Qué experiencia tenés en banca y energía?" },
  { q: "¿Qué estás haciendo actualmente?" },
];

// ── Legacy exports (kept for backwards compat) ────────────────────
const taligentJob = experience.find(e => e.id === "taligent")!;
const heliosJob = experience.find(e => e.id === "helios")!;
const neorisJob = experience.find(e => e.id === "neoris")!;

export const knowledge = {
  profile: {
    name: profile.name,
    role: profile.role,
    experience: "+2 años en banca y energía",
    location: profile.location,
    englishLevel: profile.englishLevel,
    workMode: profile.workMode,
    relocation: profile.relocation,
    cv: profile.links.cv,
    summary: profile.summary,
  },
  workExperience: {
    taligent: {
      role: "Semi Senior Data Engineer",
      period: "Julio 2026 - Actualidad",
      sector: "Energía (proyecto YPF)",
      responsibilities: taligentJob.roles.flatMap(r => r.highlights),
      tech: taligentJob.tech,
    },
    helios: {
      role: "Semi Senior Data Engineer",
      period: "Febrero 2024 - Julio 2026",
      sector: "Banca (Grupo Petersen)",
      responsibilities: heliosJob.roles.flatMap(r => r.highlights),
      tech: heliosJob.tech,
      achievements: heliosJob.roles[0].highlights,
      dataTypes: ["Transacciones ATM", "Pagos digitales (MODO)", "Saldos contables", "Métricas HBI", "Tarjetas"],
    },
    neoris: {
      role: "Desarrollador .NET Back-End",
      period: "Febrero 2023 - Agosto 2023",
      responsibilities: neorisJob.roles[0].highlights,
      tech: neorisJob.tech,
    },
  },
  skills: {
    primary: stack.core,
    secondary: stack.platform,
    inProgress: stack.learning,
    soft: ["Gobierno de datos", "Relevamiento funcional", "Resolución de incidencias productivas"],
  },
  goals: {
    roles: ["Data Engineer", "Cloud Data Engineer", "Analytics Engineer"],
    direction: "Consolidar stack moderno con foco en Spark/PySpark y Azure Databricks.",
  },
};
