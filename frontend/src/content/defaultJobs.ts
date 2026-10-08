export interface DefaultJob {
  id: string;
  title: string;
  category: string;
  type: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  techStack: string[];
}

export const defaultJobOpenings: DefaultJob[] = [
  {
    id: '10965',
    title: 'SOC Analyst',
    category: 'Cybersecurity',
    type: 'Full-time',
    salary: '$42,000 – $60,000 / year',
    description: 'Vigilant security analysts monitoring enterprise SIEM environments, analyzing alert telemetry, performing triage, and supporting incident response for global networks.',
    responsibilities: [
      'Monitor and investigate security event logs from SIEM platforms (Splunk, Microsoft Sentinel).',
      'Triage endpoint detection alerts (CrowdStrike, Defender for Endpoint) and escalate genuine threats.',
      'Perform initial threat hunting and malware analysis according to MITRE ATT&CK framework.',
      'Document incident tickets, conduct root cause reviews, and coordinate containment actions.',
    ],
    requirements: [
      '3+ years of professional SOC or information security operations experience.',
      'Hands-on expertise with SIEM, EDR, and log aggregation tools.',
      'Familiarity with network protocols, TCP/IP, DNS, and common web attack vectors.',
      'Security certifications preferred (CompTIA Security+, CySA+, CEH, or SC-200).',
    ],
    techStack: ['Splunk', 'CrowdStrike', 'Microsoft Sentinel', 'Wireshark', 'MITRE ATT&CK', 'Linux'],
  },
  {
    id: '14527',
    title: 'Senior Full-Stack Developer',
    category: 'Software Engineering',
    type: 'Full-time',
    salary: '$50,000 – $72,000 / year',
    description: 'Product-focused engineers building resilient, scalable web applications with modern component frameworks, TypeScript, and clean microservices.',
    responsibilities: [
      'Architect and build maintainable frontend web applications using Vue 3, React, and TypeScript.',
      'Design RESTful and GraphQL backend APIs using Node.js, Go, or Python with relational databases.',
      'Collaborate closely with product managers and designers in rapid two-week agile sprints.',
      'Write comprehensive unit and integration tests with Playwright, Vitest, or Jest.',
    ],
    requirements: [
      '5+ years of full-stack software development experience in production web applications.',
      'High proficiency in TypeScript/JavaScript and modern asynchronous patterns.',
      'Experience with PostgreSQL, Redis caching, Docker containerization, and CI/CD pipelines.',
      'Strong architectural intuition and clean code standards.',
    ],
    techStack: ['TypeScript', 'Vue 3', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'GraphQL'],
  },
  {
    id: '08752',
    title: 'Cloud & DevOps Engineer',
    category: 'Cloud & DevOps',
    type: 'Full-time',
    salary: '$48,000 – $68,000 / year',
    description: 'Cloud architects specializing in resilient AWS/Azure infrastructures, automated CI/CD pipelines, and Kubernetes container orchestration for high-availability systems.',
    responsibilities: [
      'Automate infrastructure provisioning using Terraform, OpenTofu, and Ansible.',
      'Manage and monitor multi-cluster Kubernetes deployments in AWS EKS or Azure AKS.',
      'Build automated, secure CI/CD pipelines using GitHub Actions and GitLab CI.',
      'Optimize cloud infrastructure spend, monitor latency SLAs, and implement observability (Prometheus/Grafana).',
    ],
    requirements: [
      '4+ years of dedicated DevOps or Cloud Systems Engineering experience.',
      'Extensive hands-on experience with AWS (VPC, IAM, EKS, RDS, S3) or Microsoft Azure.',
      'Proficiency in Infrastructure as Code (Terraform) and Linux systems administration.',
      'AWS Certified Solutions Architect or CKA certification is a strong plus.',
    ],
    techStack: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions', 'Prometheus', 'Linux'],
  },
  {
    id: '19823',
    title: 'Data & Analytics Engineer',
    category: 'Data & Analytics',
    type: 'Full-time',
    salary: '$45,000 – $65,000 / year',
    description: 'Data specialists responsible for constructing robust ETL/ELT pipelines, managing modern data warehouse architectures, and turning raw data into strategic business reporting.',
    responsibilities: [
      'Design, build, and maintain automated ELT pipelines using Python, Airflow, and dbt.',
      'Model and optimize analytical data tables in Snowflake, BigQuery, or Amazon Redshift.',
      'Construct executive dashboards and self-service analytics reports in Power BI, Tableau, or Metabase.',
      'Implement data quality validation tests and schema migration safeguards.',
    ],
    requirements: [
      '3+ years of experience in data engineering, analytics engineering, or business intelligence.',
      'Advanced SQL modeling expertise (window functions, query plan optimization, partitioning).',
      'Proficiency in Python and workflow orchestration tools (Airflow, Dagster, or Prefect).',
      'Experience with modern dimensional data modeling (Kimball methodology).',
    ],
    techStack: ['SQL', 'Python', 'Snowflake', 'dbt', 'Apache Airflow', 'Power BI', 'BigQuery'],
  },
  {
    id: '22314',
    title: 'Cloud Security & IAM Specialist',
    category: 'Cybersecurity',
    type: 'Full-time',
    salary: '$52,000 – $75,000 / year',
    description: 'Specialists securing enterprise cloud access, establishing least-privilege RBAC/ABAC models, and auditing SaaS and cloud infrastructure configurations.',
    responsibilities: [
      'Configure and manage enterprise Identity & Access Management solutions (Okta, Azure AD / Entra ID).',
      'Audit AWS/Azure IAM policies, access boundaries, and credential rotation mechanisms.',
      'Support client preparation for SOC 2 Type II, ISO 27001, and HIPAA compliance audits.',
      'Implement Single Sign-On (SSO), SCIM automated provisioning, and conditional access policies.',
    ],
    requirements: [
      '4+ years of specialized identity management and cloud security experience.',
      'Deep knowledge of SAML 2.0, OIDC, OAuth, and SCIM protocol standards.',
      'Experience with Cloud Security Posture Management (CSPM) tools like Wiz or Prisma Cloud.',
      'CISSP, CCSP, or AWS Security Specialty certification preferred.',
    ],
    techStack: ['Okta', 'Azure AD', 'AWS IAM', 'SAML/OIDC', 'SOC 2', 'Terraform', 'Wiz'],
  },
  {
    id: '31409',
    title: 'QA Automation Engineer',
    category: 'Software Engineering',
    type: 'Full-time',
    salary: '$38,000 – $55,000 / year',
    description: 'Quality assurance specialists designing comprehensive end-to-end automated testing suites, preventing regressions, and accelerating release velocity.',
    responsibilities: [
      'Develop and execute automated test suites using Playwright, Cypress, or Selenium.',
      'Integrate automated smoke and regression tests into GitHub Actions deployment workflows.',
      'Perform API contract testing and performance/load testing with k6 or Postman.',
      'Collaborate with developers to establish testability guidelines and maintain test environments.',
    ],
    requirements: [
      '3+ years of automated software testing experience for web and mobile applications.',
      'Strong programming proficiency in TypeScript or Python.',
      'Experience with CI/CD integration and test reporting frameworks.',
      'Demonstrated skill in analyzing edge cases and writing clear reproduction steps for defects.',
    ],
    techStack: ['Playwright', 'TypeScript', 'Cypress', 'GitHub Actions', 'Postman', 'k6', 'Jest'],
  },
];
