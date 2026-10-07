<template>
  <div class="bg-white min-h-screen">
    <!-- Header Hero with GhanaTech purple gradient and organic curve -->
    <section class="relative bg-gradient-to-br from-[#6D28D9] via-[#5B21B6] to-[#4C1D95] pt-32 pb-24 sm:pt-40 sm:pb-32 text-white">
      <!-- Background decoration wrapped in overflow-hidden so circles don't cause page scrollbars -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="hidden sm:block absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -bottom-12 -left-12 w-[240px] h-[240px] rounded-full border border-white/15 pointer-events-none" />
        <div class="hidden sm:block absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full border border-white/15 pointer-events-none" />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto">

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Find the Right Tech Professionals for Your Team
          </h1>

          <p class="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            We help companies hire skilled people from Ghana for software, cloud, security, data, IT support, and project work. We check their skills, experience, and communication before introducing them to your team.
          </p>

          <!-- Dual Call to Action -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <router-link
              to="/hire-talent"
              class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-brand-dark font-extrabold text-xs sm:text-sm uppercase tracking-wide shadow-lg hover:bg-brand-soft hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Hire Tech Professionals
            </router-link>
            <router-link
              to="/join-talent"
              class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 text-white border border-white/30 text-xs sm:text-sm font-bold hover:bg-white/20 transition-all text-center"
            >
              Join Our Talent Network
            </router-link>
          </div>

          <!-- Trust Badges -->
          <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/15 text-left">
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">Top 2%</span>
              <span class="text-xs font-semibold text-white/80">Candidates Who Pass Our Checks</span>
            </div>
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">48–72h</span>
              <span class="text-xs font-semibold text-white/80">Suggested Candidates</span>
            </div>
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">100%</span>
              <span class="text-xs font-semibold text-white/80">English Communication</span>
            </div>
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">55%–70%</span>
              <span class="text-xs font-semibold text-white/80">Estimated Yearly Savings</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Organic Curved Wave Bottom Divider (overlapping by 2px to eliminate subpixel gap) -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <!-- The 4-Stage Vetting & Placement Pipeline -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
            HOW WE CHECK SKILLS
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            We Check Skills and Experience
          </h2>
          <p class="mt-3 text-sm text-brand-muted">
            We review work experience, check practical skills, and meet candidates before recommending them.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <!-- Step 1 -->
          <div class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/70 hover:border-brand-primary/50 transition-all flex flex-col justify-between">
            <div>
              <span class="inline-block text-3xl font-black text-brand-primary/40 mb-3">01</span>
              <h3 class="text-lg font-bold text-brand-dark mb-2">CV &amp; Background Checks</h3>
              <p class="text-xs text-brand-muted leading-relaxed">
                We review each CV, past work, education, and references before moving to skill tests.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-brand-border/40 text-[11px] font-semibold text-brand-primary">
              ✓ Identity & background verified
            </div>
          </div>

          <!-- Step 2 -->
          <div class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/70 hover:border-brand-primary/50 transition-all flex flex-col justify-between">
            <div>
              <span class="inline-block text-3xl font-black text-brand-primary/40 mb-3">02</span>
              <h3 class="text-lg font-bold text-brand-dark mb-2">Practical Skill Checks</h3>
              <p class="text-xs text-brand-muted leading-relaxed">
                Experienced professionals use practical tasks to check how candidates solve problems and do the work.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-brand-border/40 text-[11px] font-semibold text-brand-primary">
              ✓ Checked with practical tasks
            </div>
          </div>

          <!-- Step 3 -->
          <div class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/70 hover:border-brand-primary/50 transition-all flex flex-col justify-between">
            <div>
              <span class="inline-block text-3xl font-black text-brand-primary/40 mb-3">03</span>
              <h3 class="text-lg font-bold text-brand-dark mb-2">Communication &amp; Teamwork</h3>
              <p class="text-xs text-brand-muted leading-relaxed">
                We check how candidates explain their work, write clearly, and work with other people.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-brand-border/40 text-[11px] font-semibold text-brand-primary">
              ✓ Clear communication and teamwork
            </div>
          </div>

          <!-- Step 4 -->
          <div class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/70 hover:border-brand-primary/50 transition-all flex flex-col justify-between">
            <div>
              <span class="inline-block text-3xl font-black text-brand-primary/40 mb-3">04</span>
              <h3 class="text-lg font-bold text-brand-dark mb-2">Meet Candidates &amp; Get Support</h3>
              <p class="text-xs text-brand-muted leading-relaxed">
                We suggest suitable candidates for you to interview. We then agree on hiring arrangements and the support your team needs.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-brand-border/40 text-[11px] font-semibold text-brand-primary">
              ✓ Help with the next steps
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Roles & Disciplines We Recruit -->
    <section class="py-20 bg-brand-lightest/30 border-y border-brand-border/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
            TYPES OF WORK
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            People We Can Help You Hire
          </h2>
          <p class="mt-2 text-sm text-brand-muted">
            Choose a type of work to see common roles, skills, and experience.
          </p>
        </div>

        <!-- Discipline Tabs -->
        <div class="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            v-for="tab in disciplines"
            :key="tab.id"
            type="button"
            class="px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-violet-sm"
            :class="activeDiscipline === tab.id
              ? 'bg-brand-primary text-white shadow-violet-md'
              : 'bg-white text-brand-dark border border-brand-border/80 hover:bg-brand-soft'"
            @click="activeDiscipline = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>

        <!-- Selected Discipline Detail -->
        <div class="bg-white rounded-3xl p-8 sm:p-10 border border-brand-border/80 shadow-violet-md">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div class="space-y-4">
              <span class="px-3 py-1 rounded-full bg-brand-soft text-brand-primary text-xs font-bold border border-brand-border">
                ABOUT THIS TYPE OF WORK
              </span>
              <h3 class="text-2xl font-extrabold text-brand-dark">
                {{ currentDiscipline.name }}
              </h3>
              <p class="text-xs sm:text-sm text-brand-muted leading-relaxed">
                {{ currentDiscipline.description }}
              </p>

              <div class="pt-4 space-y-2">
                <span class="block text-xs font-bold text-brand-dark">Common Certificates &amp; Standards:</span>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="cert in currentDiscipline.certifications"
                    :key="cert"
                    class="px-2.5 py-1 rounded-lg bg-brand-lightest text-brand-dark text-[11px] font-semibold border border-brand-border/60"
                  >
                    {{ cert }}
                  </span>
                </div>
              </div>

              <div class="pt-4">
                <router-link
                  :to="{ path: '/hire-talent', query: { technologyNeed: currentDiscipline.name } }"
                  class="inline-flex items-center px-6 py-3 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-all shadow-violet-sm"
                >
                  Request {{ currentDiscipline.name }} Talent
                </router-link>
              </div>
            </div>

            <!-- Role Cards Grid within the Discipline -->
            <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="role in currentDiscipline.roles"
                :key="role.title"
                class="p-5 rounded-2xl bg-brand-lightest/40 border border-brand-border/60 hover:border-brand-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="text-base font-bold text-brand-dark">{{ role.title }}</h4>
                    <span class="text-[10px] font-bold text-brand-primary bg-brand-soft px-2 py-0.5 rounded">
                      {{ role.experience }}
                    </span>
                  </div>
                  <p class="text-xs text-brand-muted leading-relaxed mb-4">
                    {{ role.summary }}
                  </p>
                  <div class="flex flex-wrap gap-1 mb-4">
                    <span
                      v-for="s in role.skills"
                      :key="s"
                      class="px-2 py-0.5 rounded bg-white text-brand-dark text-[10px] font-medium border border-brand-border/40"
                    >
                      {{ s }}
                    </span>
                  </div>
                </div>

                <router-link
                  :to="{ path: '/hire-talent', query: { role: role.title, technologyNeed: currentDiscipline.name } }"
                  class="text-xs font-bold text-brand-primary hover:text-brand-dark flex items-center gap-1 group"
                >
                  <span>Ask About This Job</span>
                  <span class="group-hover:translate-x-1 transition-transform">→</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Placement & Engagement Models -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
            WAYS TO WORK WITH US
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Choose How You Want to Hire
          </h2>
          <p class="mt-2 text-sm text-brand-muted">
            Hire one person, build a team, or get help with a project.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Model 1 -->
          <div class="p-8 rounded-3xl bg-white border border-brand-border/80 shadow-violet-sm hover:shadow-violet-md transition-all flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-brand-soft text-brand-primary flex items-center justify-center font-black text-xl mb-6 shadow-violet-sm">
                01
              </div>
              <h3 class="text-xl font-bold text-brand-dark mb-2">Add Someone to Your Team</h3>
              <p class="text-xs text-brand-muted leading-relaxed mb-6">
                Work with a Ghanaian tech professional who joins your meetings, uses your tools, and reports to your team manager.
              </p>
              <ul class="space-y-2.5 text-xs text-brand-dark font-medium mb-8">
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Works with your existing team
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Flexible 40 hr/week schedule
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Clear monthly costs
                </li>
              </ul>
            </div>
            <router-link
              to="/hire-talent"
              class="w-full py-2.5 px-4 rounded-xl bg-brand-soft text-brand-dark hover:bg-brand-primary hover:text-white font-bold text-xs text-center transition-all"
            >
              Find Someone for Your Team
            </router-link>
          </div>

          <!-- Model 2 (Featured) -->
          <div class="p-8 rounded-3xl bg-brand-lightest/50 border-2 border-brand-primary shadow-violet-md transition-all flex flex-col justify-between relative">
            <span class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-primary text-white text-[11px] font-extrabold uppercase tracking-wider shadow-violet-sm">
              Most Popular
            </span>
            <div>
              <div class="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-black text-xl mb-6 shadow-violet-sm">
                02
              </div>
              <h3 class="text-xl font-bold text-brand-dark mb-2">Build a Dedicated Team</h3>
              <p class="text-xs text-brand-muted leading-relaxed mb-6">
                Bring together developers, testers, and a team leader to work on your software or technology project.
              </p>
              <ul class="space-y-2.5 text-xs text-brand-dark font-medium mb-8">
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> A team with an experienced leader
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Agreed tasks and progress updates
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Support from GhanaTech Global
                </li>
              </ul>
            </div>
            <router-link
              to="/hire-talent"
              class="w-full py-3 px-4 rounded-xl bg-brand-primary text-white hover:bg-brand-dark font-bold text-xs text-center transition-all shadow-violet-sm"
            >
              Build Your Team
            </router-link>
          </div>

          <!-- Model 3 -->
          <div class="p-8 rounded-3xl bg-white border border-brand-border/80 shadow-violet-sm hover:shadow-violet-md transition-all flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-brand-soft text-brand-primary flex items-center justify-center font-black text-xl mb-6 shadow-violet-sm">
                03
              </div>
              <h3 class="text-xl font-bold text-brand-dark mb-2">Hire Someone Directly</h3>
              <p class="text-xs text-brand-muted leading-relaxed mb-6">
                Find a tech professional or team leader to hire directly for a long-term role in your company.
              </p>
              <ul class="space-y-2.5 text-xs text-brand-dark font-medium mb-8">
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Candidates chosen for your needs
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Skills and past work reviewed
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> 90-day replacement guarantee
                </li>
              </ul>
            </div>
            <router-link
              to="/hire-talent"
              class="w-full py-2.5 px-4 rounded-xl bg-brand-soft text-brand-dark hover:bg-brand-primary hover:text-white font-bold text-xs text-center transition-all"
            >
              Ask About Direct Hiring
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Compliance, Hardware, and IP Protection -->
    <section class="py-16 bg-brand-lightest/40 border-t border-brand-border/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-white border border-brand-border/70">
            <h4 class="text-sm font-bold text-brand-dark mb-1 flex items-center gap-2">
              <span class="text-brand-primary">🔒</span> Agreements &amp; Ownership of Your Work
            </h4>
            <p class="text-xs text-brand-muted leading-relaxed">
              Your agreements set out who owns the code and other work created for your company.
            </p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-brand-border/70">
            <h4 class="text-sm font-bold text-brand-dark mb-1 flex items-center gap-2">
              <span class="text-brand-primary">💻</span> Equipment &amp; Security
            </h4>
            <p class="text-xs text-brand-muted leading-relaxed">
              We discuss the computers, software, and security setup needed for the job.
            </p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-brand-border/70">
            <h4 class="text-sm font-bold text-brand-dark mb-1 flex items-center gap-2">
              <span class="text-brand-primary">🌐</span> Pay &amp; Employment Support
            </h4>
            <p class="text-xs text-brand-muted leading-relaxed">
              We agree on pay, benefits, employment responsibilities, and billing before work starts.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Banner -->
    <section class="py-20 bg-brand-dark text-white text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Ready to Grow Your Team?
        </h2>
        <p class="text-sm sm:text-base text-brand-lightest/80 max-w-2xl mx-auto mb-8">
          Tell us about the work and the people you need. Our team will help you plan the next steps.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link
            to="/hire-talent"
            class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-brand-dark text-sm font-bold hover:bg-brand-soft transition-all shadow-violet-sm"
          >
            Send a Hiring Request
          </router-link>
          <router-link
            to="/join-talent"
            class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-primary/40 text-white border border-white/20 text-sm font-bold hover:bg-brand-primary transition-all"
          >
            Join Our Talent Network
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const activeDiscipline = ref('cyber');

const disciplines = [
  {
    id: 'cyber',
    name: 'Cybersecurity',
    description: "People who protect computers, accounts, networks, and important business data.",
    certifications: ['CISSP', 'CEH', 'CompTIA Security+', 'CISM', 'AWS Security Specialty', 'SOC 2 Type II Auditing'],
    roles: [
      {
        title: 'SOC Analyst',
        experience: '3–7+ Years',
        summary: "Monitor security alerts, investigate threats, and help teams respond to attacks.",
        skills: ['Splunk', 'CrowdStrike', 'Microsoft Sentinel', 'Incident Triage', 'MITRE ATT&CK'],
      },
      {
        title: 'Security Engineer',
        experience: '5–10+ Years',
        summary: "Find and fix security weaknesses in cloud systems, accounts, and applications.",
        skills: ['Cloud Security', 'IAM', 'Burp Suite', 'Terraform', 'NIST CSF', 'Pen Testing'],
      },
      {
        title: 'GRC & Compliance Specialist',
        experience: '4–8+ Years',
        summary: "Help businesses understand security risks and prepare for reviews such as SOC 2 and ISO 27001.",
        skills: ['ISO 27001', 'SOC 2', 'Risk Assessment', 'Audit Defense', 'Vendor Risk'],
      },
      {
        title: 'IAM Specialist',
        experience: '4–8+ Years',
        summary: "Manage who can sign in to company systems and what they are allowed to access.",
        skills: ['Okta', 'Azure AD / Entra ID', 'Ping Identity', 'OAuth 2.0 / OIDC', 'CyberArk'],
      },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    description: "People who build, manage, and automate cloud systems and business IT.",
    certifications: ['AWS Solutions Architect', 'Azure Administrator', 'CKA (Kubernetes)', 'Terraform Associate', 'Linux LPIC'],
    roles: [
      {
        title: 'AWS Cloud Architect',
        experience: '6–12+ Years',
        summary: "Plan secure cloud systems that keep applications available and can grow with the business.",
        skills: ['AWS', 'Terraform', 'EKS', 'VPC Architecture', 'CloudWatch', 'Cost Optimization'],
      },
      {
        title: 'DevOps & SRE Engineer',
        experience: '5–10+ Years',
        summary: "Automate software releases, manage cloud applications, and monitor system performance.",
        skills: ['Kubernetes', 'Docker', 'GitHub Actions', 'Prometheus', 'Grafana', 'GitOps'],
      },
      {
        title: 'Azure Cloud Engineer',
        experience: '4–9+ Years',
        summary: "Set up and manage business applications and networks on Microsoft Azure.",
        skills: ['Azure', 'ARM / Bicep', 'AKS', 'Azure DevOps', 'Entra ID', 'PowerShell'],
      },
      {
        title: 'Systems Administrator',
        experience: '4–8+ Years',
        summary: "Keep servers and networks running, manage user accounts, and solve IT problems.",
        skills: ['Linux RHEL/Ubuntu', 'Active Directory', 'Bash / Python', 'Networking', 'Zero Trust'],
      },
    ],
  },
  {
    id: 'software',
    name: 'Software Engineering',
    description: "People who build websites, mobile apps, and the software businesses use every day.",
    certifications: ['AWS Developer', 'Node.js Certified Developer', 'Professional Scrum Master'],
    roles: [
      {
        title: 'Full-Stack Developer',
        experience: '4–9+ Years',
        summary: "Build both the website or app interface and the systems that work behind it.",
        skills: ['Vue 3', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
      },
      {
        title: 'Backend Systems Engineer',
        experience: '5–11+ Years',
        summary: "Build the systems that process data and connect apps, databases, and business tools.",
        skills: ['Go', 'Node.js', 'Python', 'Redis', 'Kafka', 'PostgreSQL', 'gRPC'],
      },
      {
        title: 'Frontend Developer',
        experience: '4–8+ Years',
        summary: "Build website and app screens that are easy to use on phones and computers.",
        skills: ['Vue 3', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Pinia', 'REST / GraphQL'],
      },
      {
        title: 'QA Automation Engineer',
        experience: '4–8+ Years',
        summary: "Create automated tests to find bugs and check that software works correctly.",
        skills: ['Playwright', 'Cypress', 'Jest', 'CI/CD Integration', 'API Testing', 'Selenium'],
      },
    ],
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    description: "People who organise data and turn it into useful reports and dashboards.",
    certifications: ['dbt Certified Developer', 'Snowflake SnowPro Core', 'Microsoft Power BI Data Analyst', 'Databricks Associate'],
    roles: [
      {
        title: 'Data Engineer',
        experience: '5–10+ Years',
        summary: "Collect, organise, and move data so businesses can use it reliably.",
        skills: ['Snowflake', 'dbt', 'Python', 'Apache Airflow', 'AWS Redshift', 'SQL'],
      },
      {
        title: 'BI & Data Analyst',
        experience: '4–8+ Years',
        summary: "Create reports and dashboards that help teams understand results and make decisions.",
        skills: ['Power BI', 'SQL', 'Tableau', 'Looker', 'Data Modeling', 'Excel / Financials'],
      },
      {
        title: 'Machine Learning Engineer',
        experience: '4–8+ Years',
        summary: "Build and connect AI tools that help software recognise patterns and make predictions.",
        skills: ['Python', 'PyTorch', 'LangChain', 'Vector DBs', 'FastAPI', 'MLOps'],
      },
      {
        title: 'Business Analyst',
        experience: '4–8+ Years',
        summary: "Help business and technology teams agree on what to build and how it should work.",
        skills: ['Agile / Scrum', 'Jira', 'Process Mapping', 'SQL', 'Product Backlog', 'User Stories'],
      },
    ],
  },
  { id: 'it', name: 'IT', description: "People who help staff use computers and keep business IT running.", certifications: ['CompTIA A+', 'CompTIA Network+', 'Microsoft certifications'], roles: [
    { title: 'Help Desk & Technical Support', experience: 'All experience levels', summary: "Help people fix computer problems, set up devices, and use company systems.", skills: ['Help Desk', 'Troubleshooting', 'Technical Support'] },
    { title: 'Systems Administrator', experience: 'All experience levels', summary: "Manage servers, user accounts, backups, and day-to-day IT support.", skills: ['Windows', 'Linux', 'Systems Administration'] },
    { title: 'Network Engineer', experience: 'All experience levels', summary: "Set up and maintain the networks that connect computers and business systems.", skills: ['Networking', 'Infrastructure', 'VPN'] },
  ] },
  { id: 'business', name: 'Business Technology', description: "People who help plan projects, manage teams, and turn business needs into clear tasks.", certifications: ['PMP', 'Professional Scrum Master', 'Business analysis certifications'], roles: [
    { title: 'Business Analyst', experience: 'All experience levels', summary: "Understand business needs and explain what a project or system should do.", skills: ['Business Analysis', 'Requirements', 'Process Mapping'] },
    { title: 'Project & Program Manager', experience: 'All experience levels', summary: "Plan projects, organise work, manage risks, and keep teams on schedule.", skills: ['Project Management', 'Program Management', 'Delivery'] },
    { title: 'Scrum Master', experience: 'All experience levels', summary: "Help teams organise their work, solve problems, and improve how they work together.", skills: ['Scrum', 'Agile', 'Facilitation'] },
    { title: 'Product Professional', experience: 'All experience levels', summary: "Decide what a product needs and help teams build the most useful features.", skills: ['Product Management', 'Roadmaps', 'Prioritization'] },
  ] },
];

watch(() => route.query.category, category => { const match = disciplines.find(item => item.name === category || item.id === category || category === 'Cloud & IT' && item.id === 'cloud'); if (match) activeDiscipline.value = match.id; }, { immediate: true });

const currentDiscipline = computed(() => {
  return disciplines.find((d) => d.id === activeDiscipline.value) || disciplines[0];
});
</script>
