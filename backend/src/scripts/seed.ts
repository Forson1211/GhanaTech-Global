import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { hashPassword } from '../utils/password';
import { User } from '../models/User';
import { Candidate } from '../models/Candidate';
import { Service } from '../models/Service';
import { TechnologyCategory } from '../models/TechnologyCategory';
import { FAQ } from '../models/FAQ';
import { Testimonial } from '../models/Testimonial';
import { CalculatorConfig } from '../models/CalculatorConfig';
import { Statistic } from '../models/Statistic';
import { SiteSettings } from '../models/SiteSettings';
import { TalentApplication } from '../models/TalentApplication';
import { CompanyLead } from '../models/CompanyLead';

async function seedDatabase(): Promise<void> {
  try {
    console.log('🌱 Connecting to database for seeding...');
    await connectDatabase();

    console.log('🧹 Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Candidate.deleteMany({}),
      Service.deleteMany({}),
      TechnologyCategory.deleteMany({}),
      FAQ.deleteMany({}),
      Testimonial.deleteMany({}),
      CalculatorConfig.deleteMany({}),
      Statistic.deleteMany({}),
      SiteSettings.deleteMany({}),
      TalentApplication.deleteMany({}),
      CompanyLead.deleteMany({}),
    ]);

    // 1. Seed Users (Admin & Recruiter)
    console.log('👤 Seeding Administrative Users...');
    const hashedAdminPassword = await hashPassword('AdminPass123!');
    const hashedRecruiterPassword = await hashPassword('RecruiterPass123!');

    await User.create([
      {
        name: 'GhanaTech Admin',
        email: 'admin@ghanatechglobal.com',
        password: hashedAdminPassword,
        role: 'admin',
        isActive: true,
      },
      {
        name: 'Senior Recruiter',
        email: 'recruiter@ghanatechglobal.com',
        password: hashedRecruiterPassword,
        role: 'recruiter',
        isActive: true,
      },
    ]);

    // 2. Seed Technology Categories
    console.log('📂 Seeding Technology Categories...');
    await TechnologyCategory.create([
      {
        name: 'Cybersecurity',
        slug: 'cybersecurity',
        description: 'Vetted defensive, offensive, and GRC security specialists dedicated to protecting enterprise assets.',
        icon: 'ShieldCheck',
        status: 'published',
        order: 1,
      },
      {
        name: 'Cloud & IT',
        slug: 'cloud-it',
        description: 'Architects and DevOps engineers scaling AWS, Azure, GCP infrastructure with automated CI/CD.',
        icon: 'Cloud',
        status: 'published',
        order: 2,
      },
      {
        name: 'Software Engineering',
        slug: 'software-engineering',
        description: 'Modern full-stack, frontend, and backend engineers building resilient web and mobile applications.',
        icon: 'Code',
        status: 'published',
        order: 3,
      },
      {
        name: 'Data & Analytics',
        slug: 'data-analytics',
        description: 'Data engineers, analysts, and ML practitioners turning complex data sets into actionable intelligence.',
        icon: 'BarChart3',
        status: 'published',
        order: 4,
      },
    ]);

    // 3. Seed Managed Services (Section 18)
    console.log('🛠️ Seeding Managed Services...');
    await Service.create([
      {
        title: 'Cybersecurity',
        slug: 'cybersecurity',
        description:
          'Comprehensive 24/7 security monitoring, vulnerability assessments, penetration testing, and compliance readiness for U.S. enterprises.',
        capabilities: [
          '24/7 SOC Monitoring & Alert Triage',
          'Vulnerability Management & Pen Testing',
          'Cloud Security Posture (CSPM) & IAM Hardening',
          'SOC 2 Type II & ISO 27001 Audit Readiness',
          'Incident Response & Forensic Investigation',
        ],
        status: 'published',
        order: 1,
      },
      {
        title: 'Cloud & IT Infrastructure',
        slug: 'cloud-it',
        description:
          'End-to-end cloud platform engineering, infrastructure as code, automated deployments, and continuous system reliability.',
        capabilities: [
          'AWS & Azure Multi-Region Architecture',
          'Kubernetes (EKS/AKS) Orchestration',
          'Terraform Infrastructure as Code (IaC)',
          'Automated CI/CD Pipeline Modernization',
          '24/7 SysAdmin & Cloud Cost Optimization',
        ],
        status: 'published',
        order: 2,
      },
      {
        title: 'Software Engineering',
        slug: 'software',
        description:
          'Dedicated engineering squads building scalable web applications, enterprise SaaS platforms, and distributed APIs.',
        capabilities: [
          'Full-Stack Web & Mobile App Development',
          'Microservices & Distributed Systems in Go/Node.js',
          'Modern Frontend Architecture (Vue 3, TypeScript)',
          'Legacy Modernization & API Integration',
          'Quality Assurance & Automated Test Suites',
        ],
        status: 'published',
        order: 3,
      },
      {
        title: 'Data & Analytics',
        slug: 'data',
        description:
          'High-throughput data engineering pipelines, modern analytical data warehouses, and executive reporting dashboards.',
        capabilities: [
          'Data Warehousing (Snowflake, BigQuery, Redshift)',
          'ETL / ELT Pipelines with dbt and Apache Airflow',
          'Executive BI Dashboards (Power BI, Tableau)',
          'Data Governance & Pipeline Monitoring',
          'Predictive Modeling & Applied AI Integration',
        ],
        status: 'published',
        order: 4,
      },
    ]);

    // 4. Seed Trust Statistics (Section 11)
    console.log('📊 Seeding Trust Statistics...');
    await Statistic.create([
      {
        key: 'tech_professionals',
        value: '100+',
        label: 'Technology Professionals',
        description: 'Vetted Ghanaian engineers, analysts, and cybersecurity specialists ready to deploy.',
        order: 1,
        isPublished: true,
      },
      {
        key: 'tech_roles',
        value: '25+',
        label: 'Technology Roles',
        description: 'Specialized disciplines covered across modern enterprise engineering stacks.',
        order: 2,
        isPublished: true,
      },
      {
        key: 'tech_disciplines',
        value: '4',
        label: 'Technology Disciplines',
        description: 'Cybersecurity, Cloud & IT, Software Engineering, and Data & Analytics.',
        order: 3,
        isPublished: true,
      },
      {
        key: 'global_network',
        value: 'U.S. ↔ Ghana',
        label: 'Global Technology Network',
        description: 'Seamless cross-border team integration with complete time-zone overlap and cultural fluency.',
        order: 4,
        isPublished: true,
      },
    ]);

    // 5. Seed FAQs (Section 26)
    console.log('❓ Seeding FAQs...');
    await FAQ.create([
      {
        question: 'What technology professionals do you provide?',
        answer:
          'GhanaTech Global provides vetted, English-fluent technology talent across four primary disciplines: Cybersecurity (SOC Analysts, Security Engineers, GRC Specialists), Cloud & IT (AWS/Azure Engineers, DevOps, SysAdmins), Software Engineering (Full-Stack, Backend, Frontend Developers), and Data & Analytics (Data Engineers, BI Analysts, ML Engineers).',
        category: 'Talent',
        order: 1,
        isPublished: true,
      },
      {
        question: 'How are candidates assessed?',
        answer:
          'We evaluate technical ability, not just resumes. Our rigorous 4-step assessment encompasses in-depth background screening, live coding and architectural challenges, real-world scenario evaluations with our technical leads, and comprehensive communication fluency interviews.',
        category: 'Vetting',
        order: 2,
        isPublished: true,
      },
      {
        question: 'How quickly can I receive candidates?',
        answer:
          'For pre-assessed talent in our active network, we deliver shortlisted profiles within 48 to 72 hours. From initial interview to onboarding, companies typically place and begin work with a professional within 7 to 10 business days.',
        category: 'Hiring',
        order: 3,
        isPublished: true,
      },
      {
        question: 'Can I hire one professional?',
        answer:
          'Yes. Whether you require an individual specialized engineer to fill an immediate gap or a single SOC analyst to augment your security operations, we support individual hires seamlessly.',
        category: 'Hiring',
        order: 4,
        isPublished: true,
      },
      {
        question: 'Can I build an entire team?',
        answer:
          'Absolutely. We routinely assemble complete dedicated squads—such as a Tech Lead, Senior Backend Developer, Frontend Engineer, and QA Specialist—fully aligned to your sprint rituals and reporting structure.',
        category: 'Hiring',
        order: 5,
        isPublished: true,
      },
      {
        question: 'Do you provide managed cybersecurity?',
        answer:
          'Yes. Our Managed Cybersecurity service delivers round-the-clock SOC monitoring, vulnerability scanning, security compliance readiness (SOC 2, ISO 27001), and rapid incident response managed by certified security leaders.',
        category: 'Services',
        order: 6,
        isPublished: true,
      },
      {
        question: 'Do you provide cloud and DevOps services?',
        answer:
          'Yes. Our Cloud & IT managed services team architects, migrates, and manages AWS, Azure, and Google Cloud environments, builds automated CI/CD pipelines with Terraform and Docker/Kubernetes, and ensures 99.99% uptime.',
        category: 'Services',
        order: 7,
        isPublished: true,
      },
      {
        question: 'Can you support software projects?',
        answer:
          'Yes. We provide end-to-end software development lifecycle support, including greenfield application builds, legacy platform modernization, microservices architecture, and API integrations.',
        category: 'Services',
        order: 8,
        isPublished: true,
      },
      {
        question: 'How does pricing work?',
        answer:
          'We offer transparent, predictable monthly pricing that typically saves U.S. companies 55% to 70% compared to domestic onshore rates. There are no surprise overheads or hidden recruitment commissions.',
        category: 'Pricing',
        order: 9,
        isPublished: true,
      },
      {
        question: 'How do I get started?',
        answer:
          'Simply click "Hire Talent" or "Discuss Managed Services" on our website, fill out our short requirement form, and our technology advisory team will contact you within one business day to discuss your specific needs.',
        category: 'General',
        order: 10,
        isPublished: true,
      },
    ]);

    // 6. Seed Testimonials (Clearly marked demo content - Section 37 & 60)
    console.log('💬 Seeding Testimonials (Demo Content)...');
    await Testimonial.create([
      {
        name: 'David Miller',
        role: 'VP of Engineering',
        company: 'CloudScale Technologies (Demo Client)',
        quote:
          'GhanaTech Global delivered three senior engineers who integrated into our sprints within days. The technical rigor, English proficiency, and commitment to code quality exceeded our highest expectations.',
        rating: 5,
        status: 'published',
        order: 1,
      },
      {
        name: 'Sarah Jenkins',
        role: 'Chief Information Security Officer',
        company: 'FinGuard Cyber Solutions (Demo Client)',
        quote:
          'Our GhanaTech SOC analysts provide continuous monitoring and rapid threat triage during peak U.S. hours. The cost efficiency combined with exceptional vigilance has transformed our security posture.',
        rating: 5,
        status: 'published',
        order: 2,
      },
      {
        name: 'Marcus Vance',
        role: 'Head of Product & Data',
        company: 'Axiom Data Systems (Demo Client)',
        quote:
          'Building our Snowflake and dbt pipeline with Ghanaian data engineers saved us over $140,000 annually without compromising on sprint velocity or data architecture standards.',
        rating: 5,
        status: 'published',
        order: 3,
      },
    ]);

    // 7. Seed Value Calculator Roles (Section 13, 18, 36)
    console.log('🧮 Seeding Value Calculator Configs...');
    const rolesList = [
      { role: 'SOC Analyst', jrUs: 90000, jrGh: 28000, midUs: 125000, midGh: 42000, srUs: 165000, srGh: 58000 },
      { role: 'Security Engineer', jrUs: 105000, jrGh: 34000, midUs: 145000, midGh: 50000, srUs: 185000, srGh: 68000 },
      { role: 'GRC Analyst', jrUs: 85000, jrGh: 28000, midUs: 120000, midGh: 40000, srUs: 155000, srGh: 55000 },
      { role: 'IAM Specialist', jrUs: 95000, jrGh: 30000, midUs: 135000, midGh: 46000, srUs: 175000, srGh: 62000 },
      { role: 'Cloud Engineer', jrUs: 100000, jrGh: 32000, midUs: 140000, midGh: 48000, srUs: 180000, srGh: 65000 },
      { role: 'AWS Engineer', jrUs: 105000, jrGh: 34000, midUs: 145000, midGh: 50000, srUs: 185000, srGh: 68000 },
      { role: 'Azure Engineer', jrUs: 105000, jrGh: 34000, midUs: 145000, midGh: 50000, srUs: 185000, srGh: 68000 },
      { role: 'DevOps Engineer', jrUs: 110000, jrGh: 35000, midUs: 150000, midGh: 52000, srUs: 190000, srGh: 70000 },
      { role: 'Systems Administrator', jrUs: 80000, jrGh: 26000, midUs: 110000, midGh: 38000, srUs: 140000, srGh: 50000 },
      { role: 'IT Support Specialist', jrUs: 65000, jrGh: 22000, midUs: 85000, midGh: 30000, srUs: 115000, srGh: 40000 },
      { role: 'Frontend Developer', jrUs: 95000, jrGh: 30000, midUs: 135000, midGh: 45000, srUs: 175000, srGh: 62000 },
      { role: 'Backend Developer', jrUs: 105000, jrGh: 34000, midUs: 145000, midGh: 48000, srUs: 185000, srGh: 66000 },
      { role: 'Full-Stack Developer', jrUs: 110000, jrGh: 36000, midUs: 150000, midGh: 52000, srUs: 195000, srGh: 72000 },
      { role: 'QA Engineer', jrUs: 85000, jrGh: 26000, midUs: 115000, midGh: 38000, srUs: 145000, srGh: 52000 },
      { role: 'Data Analyst', jrUs: 85000, jrGh: 28000, midUs: 120000, midGh: 40000, srUs: 155000, srGh: 55000 },
      { role: 'Data Engineer', jrUs: 110000, jrGh: 36000, midUs: 150000, midGh: 52000, srUs: 190000, srGh: 70000 },
      { role: 'Business Analyst', jrUs: 90000, jrGh: 28000, midUs: 125000, midGh: 42000, srUs: 160000, srGh: 58000 },
    ];

    const calcDocs: any[] = [];
    for (const r of rolesList) {
      calcDocs.push({
        role: r.role,
        seniority: 'Junior',
        usEstimatedAnnualCost: r.jrUs,
        ghanaTechEstimatedAnnualCost: r.jrGh,
      });
      calcDocs.push({
        role: r.role,
        seniority: 'Mid-Level',
        usEstimatedAnnualCost: r.midUs,
        ghanaTechEstimatedAnnualCost: r.midGh,
      });
      calcDocs.push({
        role: r.role,
        seniority: 'Senior',
        usEstimatedAnnualCost: r.srUs,
        ghanaTechEstimatedAnnualCost: r.srGh,
      });
    }
    await CalculatorConfig.insertMany(calcDocs);

    // 8. Seed Sample Candidates (Section 14, 15, 44)
    console.log('🧑‍💻 Seeding Candidates across 4 disciplines...');
    await Candidate.create([
      {
        firstName: 'Kofi',
        lastName: 'Mensah',
        headline: 'Senior Cloud & DevOps Engineer | AWS Certified Solutions Architect',
        location: 'Accra',
        country: 'Ghana',
        role: 'Cloud Engineer',
        category: 'Cloud & IT',
        yearsExperience: 6,
        skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'Linux'],
        bio: 'Senior Cloud and DevOps engineer with 6+ years designing scalable AWS infrastructure, implementing zero-downtime CI/CD pipelines, and orchestrating Kubernetes clusters for high-traffic SaaS applications.',
        availability: 'Available',
        assessmentStatus: 'Ready for Placement',
        profileStatus: 'Approved',
        email: 'kofi.mensah.demo@ghanatechglobal.com',
        phone: '+233 24 123 4567',
        internalNotes: 'Top 1% score on AWS architectural assessment. Excellent communication and client presence.',
      },
      {
        firstName: 'Akosua',
        lastName: 'Boateng',
        headline: 'Lead Cybersecurity & SOC Analyst | CISSP & CEH',
        location: 'Accra',
        country: 'Ghana',
        role: 'SOC Analyst',
        category: 'Cybersecurity',
        yearsExperience: 7,
        skills: ['SIEM', 'Splunk', 'CrowdStrike', 'Threat Hunting', 'Incident Response', 'SOC 2'],
        bio: 'Seasoned cyber defense specialist with 7 years managing SOC operations, conducting proactive threat hunting, and securing financial services infrastructures against advanced persistent threats.',
        availability: 'Available',
        assessmentStatus: 'Ready for Placement',
        profileStatus: 'Approved',
        email: 'akosua.boateng.demo@ghanatechglobal.com',
        phone: '+233 20 987 6543',
        internalNotes: 'Exceptional incident response exercise evaluation. Ready for immediate enterprise deployment.',
      },
      {
        firstName: 'Kwame',
        lastName: 'Osei',
        headline: 'Senior Full-Stack Developer | Vue 3, TypeScript & Node.js',
        location: 'Kumasi',
        country: 'Ghana',
        role: 'Full-Stack Developer',
        category: 'Software Engineering',
        yearsExperience: 5,
        skills: ['Vue 3', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
        bio: 'Passionate full-stack engineer who builds clean, accessible, and high-performance web products. Experienced in modern component-driven architectures, GraphQL, and microservice backends.',
        availability: 'Available',
        assessmentStatus: 'Ready for Placement',
        profileStatus: 'Approved',
        email: 'kwame.osei.demo@ghanatechglobal.com',
        phone: '+233 27 555 1212',
        internalNotes: 'Clean, elegant code architecture in live coding test. Strong TypeScript typing mastery.',
      },
      {
        firstName: 'Ama',
        lastName: 'Asante',
        headline: 'Senior Data Engineer | Snowflake, dbt & Python Pipeline Specialist',
        location: 'Accra',
        country: 'Ghana',
        role: 'Data Engineer',
        category: 'Data & Analytics',
        yearsExperience: 6,
        skills: ['Snowflake', 'dbt', 'Python', 'Apache Airflow', 'SQL', 'AWS Redshift'],
        bio: 'Specialized data engineer architecting reliable, modern data platforms and streaming pipelines. Proficient in transforming raw business data into curated analytics models and dashboards.',
        availability: 'Interviewing',
        assessmentStatus: 'Ready for Placement',
        profileStatus: 'Approved',
        email: 'ama.asante.demo@ghanatechglobal.com',
        phone: '+233 24 333 8899',
        internalNotes: 'Currently in interview rounds with two U.S. partner firms.',
      },
      {
        firstName: 'Yaw',
        lastName: 'Acheampong',
        headline: 'Senior Backend Engineer | Distributed Systems & High-Throughput APIs',
        location: 'Accra',
        country: 'Ghana',
        role: 'Backend Developer',
        category: 'Software Engineering',
        yearsExperience: 8,
        skills: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'gRPC'],
        bio: 'Architecting resilient distributed backend systems capable of processing millions of daily transactions with sub-100ms response times.',
        availability: 'Available',
        assessmentStatus: 'Ready for Placement',
        profileStatus: 'Approved',
        email: 'yaw.acheampong.demo@ghanatechglobal.com',
        phone: '+233 26 777 4411',
        internalNotes: 'Veteran engineer with deep system architecture insights.',
      },
      {
        firstName: 'Esi',
        lastName: 'Darko',
        headline: 'Senior GRC & Information Security Compliance Analyst',
        location: 'Accra',
        country: 'Ghana',
        role: 'GRC Analyst',
        category: 'Cybersecurity',
        yearsExperience: 5,
        skills: ['ISO 27001', 'SOC 2 Type II', 'NIST CSF', 'Risk Assessment', 'Audit Defense'],
        bio: 'Experienced in guiding technology startups and scaling enterprises through SOC 2 Type II and ISO 27001 compliance lifecycles with continuous risk assessment protocols.',
        availability: 'Available',
        assessmentStatus: 'Ready for Placement',
        profileStatus: 'Approved',
        email: 'esi.darko.demo@ghanatechglobal.com',
        phone: '+233 20 111 2233',
        internalNotes: 'Helped 12+ international startups pass compliance audits.',
      },
      {
        firstName: 'Emmanuel',
        lastName: 'Appiah',
        headline: 'DevOps & Site Reliability Engineer | Azure & Terraform',
        location: 'Accra',
        country: 'Ghana',
        role: 'DevOps Engineer',
        category: 'Cloud & IT',
        yearsExperience: 5,
        skills: ['Azure', 'Terraform', 'Kubernetes', 'GitHub Actions', 'Prometheus', 'Grafana'],
        bio: 'Specialist in cloud infrastructure automation, GitOps workflows, and proactive observability that reduces MTTR by over 60%.',
        availability: 'Available',
        assessmentStatus: 'Ready for Placement',
        profileStatus: 'Approved',
        email: 'emmanuel.appiah.demo@ghanatechglobal.com',
        phone: '+233 24 999 0011',
        internalNotes: 'Strong hands-on observability and CI/CD automation expertise.',
      },
      {
        firstName: 'Abena',
        lastName: 'Gyasi',
        headline: 'Lead Business Intelligence & Analytics Engineer',
        location: 'Accra',
        country: 'Ghana',
        role: 'Data Analyst',
        category: 'Data & Analytics',
        yearsExperience: 6,
        skills: ['Power BI', 'SQL', 'Tableau', 'Python', 'Data Modeling', 'Looker'],
        bio: 'Bridging technical data pipelines and executive decision making through intuitive interactive dashboards and deep cohort retention analyses.',
        availability: 'Available',
        assessmentStatus: 'Ready for Placement',
        profileStatus: 'Approved',
        email: 'abena.gyasi.demo@ghanatechglobal.com',
        phone: '+233 27 888 3322',
        internalNotes: 'Exceptional visual storytelling and business stakeholder management.',
      },
    ]);

    // 9. Seed Site Settings
    console.log('⚙️ Seeding Site Settings...');
    await SiteSettings.create({
      companyName: 'GhanaTech Global',
      tagline: 'U.S.–Ghana Technology Talent & Services',
      contactEmail: 'advisors@ghanatechglobal.com',
      supportPhone: '+1 (726) 227-2605',
      accraOfficeAddress: 'Airport Residential Area, Accra, Ghana',
      usOfficeAddress: 'Austin, TX & New York, NY',
      allowPublicApplications: true,
      allowLeadSubmissions: true,
    });

    // 10. Seed Sample Applications and Leads for Admin CRM showcase
    console.log('💼 Seeding Demo Applications & Leads for Admin UI...');
    await TalentApplication.create([
      {
        name: 'Samuel Tawiah',
        email: 'samuel.tawiah.demo@gmail.com',
        phone: '+233 24 456 7890',
        location: 'Accra, Ghana',
        technologyArea: 'Software Engineering',
        role: 'Frontend Developer',
        yearsExperience: 4,
        skills: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite'],
        linkedin: 'https://linkedin.com/in/samueltawiah-demo',
        github: 'https://github.com/samueltawiah-demo',
        availability: 'Available Immediately',
        desiredEngagement: 'Full-time Remote',
        status: 'New',
        internalNotes: 'Strong portfolio showcasing responsive Vue 3 applications.',
      },
      {
        name: 'Joyce Quaye',
        email: 'joyce.quaye.demo@gmail.com',
        phone: '+233 20 789 0123',
        location: 'Accra, Ghana',
        technologyArea: 'Cybersecurity',
        role: 'Security Engineer',
        yearsExperience: 5,
        skills: ['AWS Security', 'Terraform', 'Vulnerability Assessment', 'Burp Suite'],
        linkedin: 'https://linkedin.com/in/joycequaye-demo',
        github: 'https://github.com/joycequaye-demo',
        availability: '2 Weeks Notice',
        desiredEngagement: 'Full-time Dedicated',
        status: 'Shortlisted',
        internalNotes: 'Passed technical screening with top marks.',
      },
    ]);

    await CompanyLead.create([
      {
        name: 'Robert Hastings',
        company: 'Vanguard Health Systems (U.S.)',
        email: 'rhastings.demo@vanguardhealth.io',
        phone: '+1 (512) 555-0199',
        companySize: '51-200',
        technologyNeed: 'Managed Cybersecurity',
        role: 'SOC Analyst',
        numberOfProfessionals: 2,
        engagementType: 'Full-Time Dedicated',
        budgetRange: '$60k - $90k/yr',
        message: 'Looking for 2 dedicated night-shift SOC analysts to cover our 24/7 security monitoring needs.',
        status: 'New',
        internalNotes: 'High-value enterprise lead from Austin, TX. Follow up scheduled.',
      },
      {
        name: 'Elena Rostova',
        company: 'HyperMetric Analytics (U.S.)',
        email: 'elena.demo@hypermetric.com',
        phone: '+1 (415) 555-0144',
        companySize: '11-50',
        technologyNeed: 'Dedicated Engineering Squad',
        role: 'Full-Stack Developer',
        numberOfProfessionals: 3,
        engagementType: 'Dedicated Squad',
        budgetRange: '$120k - $160k/yr',
        message: 'Scaling our fintech platform and need 3 full-stack engineers experienced in TypeScript and microservices.',
        status: 'Qualified',
        internalNotes: 'Qualified during introductory call. Shortlisting candidates now.',
      },
    ]);

    console.log('\n======================================================');
    console.log('✅ GhanaTech Global database seeded successfully!');
    console.log('======================================================');
    console.log('Default Admin Account:');
    console.log('  Email: admin@ghanatechglobal.com');
    console.log('  Password: AdminPass123!');
    console.log('------------------------------------------------------');
    console.log('Default Recruiter Account:');
    console.log('  Email: recruiter@ghanatechglobal.com');
    console.log('  Password: RecruiterPass123!');
    console.log('======================================================\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed with error:', error);
    process.exit(1);
  }
}

seedDatabase();
