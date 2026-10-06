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
            Recruit World-Class Ghanaian Tech Talent for Your U.S. Team
          </h1>

          <p class="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            GhanaTech Global recruits, technically assesses, places, and supports elite Ghanaian software engineers, cloud architects, cybersecurity specialists, and data practitioners. Pre-vetted for technical excellence, native English fluency, and seamless U.S. timezone collaboration.
          </p>

          <!-- Dual Call to Action -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <router-link
              to="/hire-talent"
              class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-brand-dark font-extrabold text-xs sm:text-sm uppercase tracking-wide shadow-lg hover:bg-brand-soft hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Hire Ghanaian Talent
            </router-link>
            <router-link
              to="/join-talent"
              class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 text-white border border-white/30 text-xs sm:text-sm font-bold hover:bg-white/20 transition-all text-center"
            >
              Apply to Join Talent Network
            </router-link>
          </div>

          <!-- Trust Badges -->
          <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/15 text-left">
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">Top 2%</span>
              <span class="text-xs font-semibold text-white/80">Vetting Acceptance Rate</span>
            </div>
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">48–72h</span>
              <span class="text-xs font-semibold text-white/80">Candidate Shortlists</span>
            </div>
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">100%</span>
              <span class="text-xs font-semibold text-white/80">Native English Fluency</span>
            </div>
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">55%–70%</span>
              <span class="text-xs font-semibold text-white/80">Annual Cost Efficiency</span>
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
            RIGOROUS EVALUATION
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            We Assess Technical Ability, Not Just Resumes
          </h2>
          <p class="mt-3 text-sm text-brand-muted">
            Our multi-tier assessment methodology filters for top-decile technical competency, architectural judgment, and professional autonomy.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <!-- Step 1 -->
          <div class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/70 hover:border-brand-primary/50 transition-all flex flex-col justify-between">
            <div>
              <span class="inline-block text-3xl font-black text-brand-primary/40 mb-3">01</span>
              <h3 class="text-lg font-bold text-brand-dark mb-2">Resume & Pedigree Screening</h3>
              <p class="text-xs text-brand-muted leading-relaxed">
                Verification of professional background, production project repositories, university education, and client references. Only 15% advance to technical testing.
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
              <h3 class="text-lg font-bold text-brand-dark mb-2">Technical Assessment</h3>
              <p class="text-xs text-brand-muted leading-relaxed">
                Live hands-on coding, systems architecture challenges, algorithmic problem-solving, and domain-specific scenarios evaluated by senior technical architects.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-brand-border/40 text-[11px] font-semibold text-brand-primary">
              ✓ Tested on production problems
            </div>
          </div>

          <!-- Step 3 -->
          <div class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/70 hover:border-brand-primary/50 transition-all flex flex-col justify-between">
            <div>
              <span class="inline-block text-3xl font-black text-brand-primary/40 mb-3">03</span>
              <h3 class="text-lg font-bold text-brand-dark mb-2">Communication & Culture</h3>
              <p class="text-xs text-brand-muted leading-relaxed">
                In-depth interviews assessing verbal clarity, written precision, asynchronous collaboration, empathy, and comfort operating inside U.S. agile sprints.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-brand-border/40 text-[11px] font-semibold text-brand-primary">
              ✓ Flawless English & agile fluency
            </div>
          </div>

          <!-- Step 4 -->
          <div class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/70 hover:border-brand-primary/50 transition-all flex flex-col justify-between">
            <div>
              <span class="inline-block text-3xl font-black text-brand-primary/40 mb-3">04</span>
              <h3 class="text-lg font-bold text-brand-dark mb-2">Client Match & Ongoing Support</h3>
              <p class="text-xs text-brand-muted leading-relaxed">
                Curated shortlists presented for your final interview. Once selected, GhanaTech Global manages payroll, equipment, legal compliance, and ongoing HR support.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-brand-border/40 text-[11px] font-semibold text-brand-primary">
              ✓ Zero administrative friction
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
            SPECIALIZED DISCIPLINES
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Key Engineering Roles We Recruit & Place
          </h2>
          <p class="mt-2 text-sm text-brand-muted">
            Explore our specialized talent disciplines and typical technical proficiencies.
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
                PRACTICE OVERVIEW
              </span>
              <h3 class="text-2xl font-extrabold text-brand-dark">
                {{ currentDiscipline.name }}
              </h3>
              <p class="text-xs sm:text-sm text-brand-muted leading-relaxed">
                {{ currentDiscipline.description }}
              </p>

              <div class="pt-4 space-y-2">
                <span class="block text-xs font-bold text-brand-dark">Common Certifications & Standards:</span>
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
                  <span>Inquire for this role</span>
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
            FLEXIBLE ENGAGEMENT
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            How U.S. Companies Partner With Us
          </h2>
          <p class="mt-2 text-sm text-brand-muted">
            Choose the model that best matches your roadmap, engineering leadership, and budget structure.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Model 1 -->
          <div class="p-8 rounded-3xl bg-white border border-brand-border/80 shadow-violet-sm hover:shadow-violet-md transition-all flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-brand-soft text-brand-primary flex items-center justify-center font-black text-xl mb-6 shadow-violet-sm">
                01
              </div>
              <h3 class="text-xl font-bold text-brand-dark mb-2">Dedicated Staff Augmentation</h3>
              <p class="text-xs text-brand-muted leading-relaxed mb-6">
                Embed pre-assessed Ghanaian engineers directly into your engineering sprints. They attend your daily standups, push code to your GitHub/GitLab, and report to your Engineering Managers.
              </p>
              <ul class="space-y-2.5 text-xs text-brand-dark font-medium mb-8">
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Direct sprint integration
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Flexible 40 hr/week schedule
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Transparent monthly retainers
                </li>
              </ul>
            </div>
            <router-link
              to="/hire-talent"
              class="w-full py-2.5 px-4 rounded-xl bg-brand-soft text-brand-dark hover:bg-brand-primary hover:text-white font-bold text-xs text-center transition-all"
            >
              Request Dedicated Engineers
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
              <h3 class="text-xl font-bold text-brand-dark mb-2">Autonomous Managed Squads</h3>
              <p class="text-xs text-brand-muted leading-relaxed mb-6">
                Deploy complete, cross-functional squads (Tech Lead, Senior Backend, Frontend, and QA) to take ownership of specific feature sets, microservices, or cloud infrastructure modernizations.
              </p>
              <ul class="space-y-2.5 text-xs text-brand-dark font-medium mb-8">
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Turnkey team with senior Tech Lead
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Sprint commitments & milestone tracking
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> GhanaTech technical advisory oversight
                </li>
              </ul>
            </div>
            <router-link
              to="/hire-talent"
              class="w-full py-3 px-4 rounded-xl bg-brand-primary text-white hover:bg-brand-dark font-bold text-xs text-center transition-all shadow-violet-sm"
            >
              Deploy a Dedicated Squad
            </router-link>
          </div>

          <!-- Model 3 -->
          <div class="p-8 rounded-3xl bg-white border border-brand-border/80 shadow-violet-sm hover:shadow-violet-md transition-all flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-brand-soft text-brand-primary flex items-center justify-center font-black text-xl mb-6 shadow-violet-sm">
                03
              </div>
              <h3 class="text-xl font-bold text-brand-dark mb-2">Direct Placement & Executive Search</h3>
              <p class="text-xs text-brand-muted leading-relaxed mb-6">
                Targeted executive search and placement for permanent engineering hires, architects, or practice heads looking to build long-term relationships with your firm.
              </p>
              <ul class="space-y-2.5 text-xs text-brand-dark font-medium mb-8">
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> Customized candidate sourcing
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-brand-primary font-bold">✓</span> In-depth technical portfolio vetting
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
              Discuss Direct Placement
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
              <span class="text-brand-primary">🔒</span> U.S. Legal & IP Protection
            </h4>
            <p class="text-xs text-brand-muted leading-relaxed">
              All intellectual property, code commits, and project artifacts are owned 100% by your company under U.S.-governed commercial agreements.
            </p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-brand-border/70">
            <h4 class="text-sm font-bold text-brand-dark mb-1 flex items-center gap-2">
              <span class="text-brand-primary">💻</span> Enterprise Hardware & Security
            </h4>
            <p class="text-xs text-brand-muted leading-relaxed">
              We provision encrypted, high-performance hardware configured with Mobile Device Management (MDM) and enterprise antivirus standards.
            </p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-brand-border/70">
            <h4 class="text-sm font-bold text-brand-dark mb-1 flex items-center gap-2">
              <span class="text-brand-primary">🌐</span> Payroll, Benefits & Compliance
            </h4>
            <p class="text-xs text-brand-muted leading-relaxed">
              We handle all statutory taxation, local social security, healthcare, and employment compliance in Ghana. You receive a simple U.S. monthly invoice.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Banner -->
    <section class="py-20 bg-brand-dark text-white text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Ready to Expand Your Technology Team?
        </h2>
        <p class="text-sm sm:text-base text-brand-lightest/80 max-w-2xl mx-auto mb-8">
          Tell us about your technical roadmap and talent requirements. We'll present a curated shortlist of assessed Ghanaian professionals within 48 to 72 hours.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link
            to="/hire-talent"
            class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-brand-dark text-sm font-bold hover:bg-brand-soft transition-all shadow-violet-sm"
          >
            Start Your Hiring Sprint
          </router-link>
          <router-link
            to="/join-talent"
            class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-primary/40 text-white border border-white/20 text-sm font-bold hover:bg-brand-primary transition-all"
          >
            Apply to Join Network
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeDiscipline = ref('cyber');

const disciplines = [
  {
    id: 'cyber',
    name: 'Cybersecurity',
    description: 'Defensive, offensive, and compliance security practitioners safeguarding cloud infrastructures, enterprise networks, and regulated data.',
    certifications: ['CISSP', 'CEH', 'CompTIA Security+', 'CISM', 'AWS Security Specialty', 'SOC 2 Type II Auditing'],
    roles: [
      {
        title: 'SOC Analyst',
        experience: '3–7+ Years',
        summary: '24/7 security monitoring, alert triage, proactive threat hunting, and incident response across SIEM and EDR platforms.',
        skills: ['Splunk', 'CrowdStrike', 'Microsoft Sentinel', 'Incident Triage', 'MITRE ATT&CK'],
      },
      {
        title: 'Security Engineer',
        experience: '5–10+ Years',
        summary: 'Cloud security hardening, penetration testing, IAM architecture, and vulnerability remediation across AWS and Azure environments.',
        skills: ['Cloud Security', 'IAM', 'Burp Suite', 'Terraform', 'NIST CSF', 'Pen Testing'],
      },
      {
        title: 'GRC & Compliance Specialist',
        experience: '4–8+ Years',
        summary: 'Guiding organizations through SOC 2 Type II, ISO 27001, and HIPAA compliance audits with continuous risk management.',
        skills: ['ISO 27001', 'SOC 2', 'Risk Assessment', 'Audit Defense', 'Vendor Risk'],
      },
      {
        title: 'IAM Specialist',
        experience: '4–8+ Years',
        summary: 'Architecting identity lifecycles, Single Sign-On (SSO), multi-factor authentication, and privileged access management (PAM).',
        skills: ['Okta', 'Azure AD / Entra ID', 'Ping Identity', 'OAuth 2.0 / OIDC', 'CyberArk'],
      },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & IT',
    description: 'Certified cloud architects, DevOps practitioners, and systems administrators building reliable, automated multi-region infrastructures.',
    certifications: ['AWS Solutions Architect', 'Azure Administrator', 'CKA (Kubernetes)', 'Terraform Associate', 'Linux LPIC'],
    roles: [
      {
        title: 'AWS Cloud Architect',
        experience: '6–12+ Years',
        summary: 'Designing highly available, fault-tolerant, and secure cloud topologies with infrastructure as code and microservice frameworks.',
        skills: ['AWS', 'Terraform', 'EKS', 'VPC Architecture', 'CloudWatch', 'Cost Optimization'],
      },
      {
        title: 'DevOps & SRE Engineer',
        experience: '5–10+ Years',
        summary: 'Automating zero-downtime CI/CD pipelines, container orchestration with Kubernetes, and enterprise observability.',
        skills: ['Kubernetes', 'Docker', 'GitHub Actions', 'Prometheus', 'Grafana', 'GitOps'],
      },
      {
        title: 'Azure Cloud Engineer',
        experience: '4–9+ Years',
        summary: 'Deploying and managing Azure enterprise services, Virtual WANs, AKS clusters, and Azure DevOps release pipelines.',
        skills: ['Azure', 'ARM / Bicep', 'AKS', 'Azure DevOps', 'Entra ID', 'PowerShell'],
      },
      {
        title: 'Systems Administrator',
        experience: '4–8+ Years',
        summary: 'Managing Linux/Windows server fleets, network routing, VPNs, user provisioning, and day-to-day IT operational stability.',
        skills: ['Linux RHEL/Ubuntu', 'Active Directory', 'Bash / Python', 'Networking', 'Zero Trust'],
      },
    ],
  },
  {
    id: 'software',
    name: 'Software Engineering',
    description: 'Senior full-stack, frontend, and backend developers architecting high-performance web applications, distributed APIs, and enterprise SaaS products.',
    certifications: ['AWS Developer', 'Node.js Certified Developer', 'Professional Scrum Master'],
    roles: [
      {
        title: 'Full-Stack Developer',
        experience: '4–9+ Years',
        summary: 'End-to-end product development using modern TypeScript, reactive frontend frameworks, and scalable relational/NoSQL backends.',
        skills: ['Vue 3', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
      },
      {
        title: 'Backend Systems Engineer',
        experience: '5–11+ Years',
        summary: 'Architecting high-throughput distributed microservices, message queues, and API gateways capable of high concurrency.',
        skills: ['Go', 'Node.js', 'Python', 'Redis', 'Kafka', 'PostgreSQL', 'gRPC'],
      },
      {
        title: 'Frontend Developer',
        experience: '4–8+ Years',
        summary: 'Crafting responsive, accessible, pixel-perfect user interfaces with state management, animations, and optimal Core Web Vitals.',
        skills: ['Vue 3', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Pinia', 'REST / GraphQL'],
      },
      {
        title: 'QA Automation Engineer',
        experience: '4–8+ Years',
        summary: 'Building comprehensive test automation frameworks (unit, integration, E2E) to maintain continuous delivery confidence.',
        skills: ['Playwright', 'Cypress', 'Jest', 'CI/CD Integration', 'API Testing', 'Selenium'],
      },
    ],
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    description: 'Data engineers and business intelligence analysts turning fragmented operational data into high-value analytical assets and executive dashboards.',
    certifications: ['dbt Certified Developer', 'Snowflake SnowPro Core', 'Microsoft Power BI Data Analyst', 'Databricks Associate'],
    roles: [
      {
        title: 'Data Engineer',
        experience: '5–10+ Years',
        summary: 'Building streaming and batch data pipelines, configuring data lakehouses, and optimizing analytics transformation models.',
        skills: ['Snowflake', 'dbt', 'Python', 'Apache Airflow', 'AWS Redshift', 'SQL'],
      },
      {
        title: 'BI & Data Analyst',
        experience: '4–8+ Years',
        summary: 'Transforming complex datasets into actionable executive dashboards, cohort retention models, and revenue forecasting tools.',
        skills: ['Power BI', 'SQL', 'Tableau', 'Looker', 'Data Modeling', 'Excel / Financials'],
      },
      {
        title: 'Machine Learning Engineer',
        experience: '4–8+ Years',
        summary: 'Deploying operational ML pipelines, embedding vectors, LLM integrations, and predictive models into production applications.',
        skills: ['Python', 'PyTorch', 'LangChain', 'Vector DBs', 'FastAPI', 'MLOps'],
      },
      {
        title: 'Business Analyst',
        experience: '4–8+ Years',
        summary: 'Bridging business stakeholders and engineering teams with detailed requirement documentation, sprint user stories, and acceptance criteria.',
        skills: ['Agile / Scrum', 'Jira', 'Process Mapping', 'SQL', 'Product Backlog', 'User Stories'],
      },
    ],
  },
];

const currentDiscipline = computed(() => {
  return disciplines.find((d) => d.id === activeDiscipline.value) || disciplines[0];
});
</script>
