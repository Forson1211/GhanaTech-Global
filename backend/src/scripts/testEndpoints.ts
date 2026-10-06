async function testAllEndpoints() {
  const BASE_URL = 'http://localhost:5000/api';
  console.log('🧪 Starting Full System Endpoints Test for GhanaTech Global...\n');

  let passed = 0;
  let failed = 0;

  async function test(name: string, fn: () => Promise<void>) {
    try {
      await fn();
      console.log(`  ✅ [PASS] ${name}`);
      passed++;
    } catch (err: any) {
      console.error(`  ❌ [FAIL] ${name}:`, err.message);
      failed++;
    }
  }

  // 1. Health check
  await test('GET /health', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    if (!data.success) throw new Error('Health check returned success: false');
  });

  // 2. Public Candidates
  let firstCandidateId = '';
  await test('GET /candidates (Public List)', async () => {
    const res = await fetch(`${BASE_URL}/candidates`);
    const json = await res.json();
    if (!json.success || !json.data.candidates.length) throw new Error('Candidates not returned');
    firstCandidateId = json.data.candidates[0]._id;
    // Check that private fields are NOT present
    const c = json.data.candidates[0];
    if (c.email || c.phone || c.internalNotes || c.cvUrl) {
      throw new Error('SECURITY VIOLATION: Private candidate fields exposed in public endpoint!');
    }
  });

  // 3. Public Candidate Detail
  await test(`GET /candidates/${firstCandidateId} (Public Profile)`, async () => {
    const res = await fetch(`${BASE_URL}/candidates/${firstCandidateId}`);
    const json = await res.json();
    if (!json.success || !json.data) throw new Error('Candidate detail not returned');
    const c = json.data;
    if (c.email || c.phone || c.internalNotes || c.cvUrl) {
      throw new Error('SECURITY VIOLATION: Private candidate fields exposed in public profile!');
    }
  });

  // 4. Public Services
  await test('GET /services', async () => {
    const res = await fetch(`${BASE_URL}/services`);
    const json = await res.json();
    if (!json.success || json.data.length < 4) throw new Error('Expected at least 4 services');
  });

  // 5. Public Categories
  await test('GET /categories', async () => {
    const res = await fetch(`${BASE_URL}/categories`);
    const json = await res.json();
    if (!json.success || json.data.length < 4) throw new Error('Expected at least 4 categories');
  });

  // 6. Public Statistics
  await test('GET /statistics', async () => {
    const res = await fetch(`${BASE_URL}/statistics`);
    const json = await res.json();
    if (!json.success || json.data.length < 4) throw new Error('Expected 4 trust statistics');
  });

  // 7. Public FAQs
  await test('GET /faqs', async () => {
    const res = await fetch(`${BASE_URL}/faqs`);
    const json = await res.json();
    if (!json.success || json.data.length < 10) throw new Error('Expected 10 FAQs');
  });

  // 8. Public Testimonials
  await test('GET /testimonials', async () => {
    const res = await fetch(`${BASE_URL}/testimonials`);
    const json = await res.json();
    if (!json.success || !json.data.length) throw new Error('Testimonials not returned');
  });

  // 9. Public Calculator Configs & Calculate
  await test('POST /calculator/calculate', async () => {
    const res = await fetch(`${BASE_URL}/calculator/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'Security Engineer', seniority: 'Senior', count: 3 }),
    });
    const json = await res.json();
    if (!json.success || json.data.estimatedAnnualDifference <= 0) {
      throw new Error('Calculator did not compute positive savings');
    }
  });

  // 10. Public Submit Lead
  await test('POST /leads (Hire Talent Form)', async () => {
    const res = await fetch(`${BASE_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Mercer',
        company: 'Starlight Tech Inc.',
        email: 'alex.mercer@starlighttech.io',
        phone: '+1 512 888 9999',
        companySize: '11-50',
        technologyNeed: 'Managed Cloud & IT',
        role: 'DevOps Engineer',
        numberOfProfessionals: 1,
        engagementType: 'Full-Time Dedicated',
        budgetRange: '$50k - $75k/yr',
        message: 'Looking for a dedicated engineer to accelerate our AWS migration.',
      }),
    });
    const json = await res.json();
    if (!json.success || !json.data.id) throw new Error('Lead creation failed');
  });

  // 11. Public Submit Application
  await test('POST /applications (Join Talent Form)', async () => {
    const res = await fetch(`${BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Kweku Annan',
        email: 'kweku.annan.test@gmail.com',
        phone: '+233 24 000 1122',
        location: 'Accra, Ghana',
        technologyArea: 'Software Engineering',
        role: 'Full-Stack Developer',
        yearsExperience: 4,
        skills: ['Vue 3', 'TypeScript', 'Node.js', 'PostgreSQL'],
        availability: 'Available Immediately',
        desiredEngagement: 'Full-time Remote',
      }),
    });
    const json = await res.json();
    if (!json.success || !json.data.id) throw new Error('Application creation failed');
  });

  // 12. Admin Authentication & Protected Endpoints
  let adminToken = '';
  await test('POST /auth/login (Admin Sign In)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@ghanatechglobal.com',
        password: 'AdminPass123!',
      }),
    });
    const json = await res.json();
    if (!json.success || !json.data.token) throw new Error('Admin login failed');
    adminToken = json.data.token;
  });

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${adminToken}`,
  };

  // 13. Admin Auth Me
  await test('GET /auth/me (Protected)', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, { headers: authHeaders });
    const json = await res.json();
    if (!json.success || json.data.role !== 'admin') throw new Error('Failed to retrieve admin user profile');
  });

  // 14. Admin Dashboard Summary
  await test('GET /statistics/admin/dashboard-summary (Protected)', async () => {
    const res = await fetch(`${BASE_URL}/statistics/admin/dashboard-summary`, { headers: authHeaders });
    const json = await res.json();
    if (!json.success || !json.data.cards.totalCandidates) throw new Error('Dashboard summary KPIs not returned');
  });

  // 15. Admin Candidates Listing (Unsanitized, includes internal notes)
  await test('GET /candidates/admin/all (Protected)', async () => {
    const res = await fetch(`${BASE_URL}/candidates/admin/all`, { headers: authHeaders });
    const json = await res.json();
    if (!json.success || !json.data.candidates.length) throw new Error('Admin candidate list failed');
    // Verify admin can see internalNotes
    const hasNotes = json.data.candidates.some((c: any) => c.internalNotes !== undefined);
    if (!hasNotes) throw new Error('Admin should have access to internal notes');
  });

  // 16. Admin Leads Listing
  await test('GET /leads/admin/all (Protected)', async () => {
    const res = await fetch(`${BASE_URL}/leads/admin/all`, { headers: authHeaders });
    const json = await res.json();
    if (!json.success || !json.data.leads.length) throw new Error('Admin leads list failed');
  });

  // 17. Admin Applications Listing
  await test('GET /applications/admin/all (Protected)', async () => {
    const res = await fetch(`${BASE_URL}/applications/admin/all`, { headers: authHeaders });
    const json = await res.json();
    if (!json.success || !json.data.applications.length) throw new Error('Admin applications list failed');
  });

  console.log(`\n======================================================`);
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`======================================================\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

testAllEndpoints();
