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
import { env } from '../config/environment';

async function seedDatabase(): Promise<void> {
  try {
    if (env.isProduction) throw new Error('Demo seeding is disabled in production. Use create-admin instead.');
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
          "Help protect your systems and data with security monitoring, weakness checks, and support for security reviews.",
        capabilities: [
          "24/7 Security Monitoring & Alert Review",
          "Security Weakness Checks & Testing",
          "Cloud Security & Account Access",
          "Preparing for SOC 2 & ISO 27001 Reviews",
          "Responding to Security Incidents",
        ],
        status: 'published',
        order: 1,
      },
      {
        title: 'Cloud & IT Infrastructure',
        slug: 'cloud-it',
        description:
          "Set up and manage cloud systems, automate software updates, and keep your business systems running.",
        capabilities: [
          "Setting Up AWS & Azure Cloud Systems",
          "Managing Apps with Kubernetes",
          "Automating Cloud Setup with Terraform",
          "Automating Software Releases",
          "24/7 System Support & Cloud Cost Reviews",
        ],
        status: 'published',
        order: 2,
      },
      {
        title: 'Software Engineering',
        slug: 'software',
        description:
          "Build websites, business software, and connections between your apps and systems.",
        capabilities: [
          "Website & Mobile App Development",
          "Connected Business Systems with Go & Node.js",
          "Website Interfaces with Vue & TypeScript",
          "Improving & Connecting Existing Software",
          "Software Testing & Automated Checks",
        ],
        status: 'published',
        order: 3,
      },
      {
        title: 'Data & Analytics',
        slug: 'data',
        description:
          "Collect and organise data, then turn it into useful business reports and dashboards.",
        capabilities: [
          "Organising Data in Snowflake, BigQuery & Redshift",
          "Collecting & Preparing Data with dbt & Airflow",
          "Business Dashboards with Power BI & Tableau",
          "Data Quality & Access Checks",
          "Business Forecasts & AI Tools",
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
        label: "Tech Professionals",
        description: "Skilled Ghanaian professionals available for technology work.",
        order: 1,
        isPublished: true,
      },
      {
        key: 'tech_roles',
        value: '25+',
        label: "Types of Jobs",
        description: "Job roles across software, cloud, security, and data.",
        order: 2,
        isPublished: true,
      },
      {
        key: 'tech_disciplines',
        value: '4',
        label: "Types of Work",
        description: "Software, cloud, security, and data work.",
        order: 3,
        isPublished: true,
      },
      {
        key: 'global_network',
        value: 'U.S. ↔ Ghana',
        label: "Our Global Network",
        description: "Connecting people in Ghana with companies around the world.",
        order: 4,
        isPublished: true,
      },
    ]);

    // 5. Seed FAQs (Section 26)
    console.log('❓ Seeding FAQs...');
    await FAQ.create([
      {
        question: "What kinds of professionals can I hire?",
        answer:
          "We help you hire people for cybersecurity, cloud systems, software development, data and reporting, IT support, and business or project management.",
        category: 'Talent',
        order: 1,
        isPublished: true,
      },
      {
        question: "How do you check candidates?",
        answer:
          "We review each CV, check background details and practical skills, and interview candidates about their experience and communication.",
        category: 'Vetting',
        order: 2,
        isPublished: true,
      },
      {
        question: "How soon can I meet candidates?",
        answer:
          "For candidates already checked in our network, we usually suggest profiles within 48 to 72 hours. Starting work depends on interviews, availability, and the job.",
        category: 'Hiring',
        order: 3,
        isPublished: true,
      },
      {
        question: "Can I hire just one person?",
        answer:
          "Yes. Tell us the job and skills you need, and we can help you find one suitable person.",
        category: 'Hiring',
        order: 4,
        isPublished: true,
      },
      {
        question: "Can you help me build a team?",
        answer:
          "Yes. We can help you build a team of developers, testers, cloud engineers, or other professionals, with the right mix of skills for your project.",
        category: 'Hiring',
        order: 5,
        isPublished: true,
      },
      {
        question: "Can you help with cybersecurity?",
        answer:
          "Yes. We can help monitor security threats, check for weaknesses, manage account access, and prepare for security reviews. Talk to us about the support you need.",
        category: 'Services',
        order: 6,
        isPublished: true,
      },
      {
        question: "Can you help with cloud and IT systems?",
        answer:
          "Yes. We can help set up, move, and manage cloud systems, automate software updates, and keep your IT systems running.",
        category: 'Services',
        order: 7,
        isPublished: true,
      },
      {
        question: "Can you help with software projects?",
        answer:
          "Yes. We can help build websites and mobile apps, improve existing software, and connect your business systems.",
        category: 'Services',
        order: 8,
        isPublished: true,
      },
      {
        question: "How much does it cost?",
        answer:
          "Costs depend on the job, experience, number of people, and support you need. Our team will explain the pricing before you agree to hire or start a project.",
        category: 'Pricing',
        order: 9,
        isPublished: true,
      },
      {
        question: "How do I get started?",
        answer:
          "Choose Hire Tech Professionals, fill in the hiring form, and our team will contact you to discuss the next steps.",
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
