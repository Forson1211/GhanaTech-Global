import { onMounted, ref } from 'vue';
import api from '@/services/api';
import type { ApiResponse } from '@/types/common';
import type { SiteSettings } from '@/services/settings';
const settings = ref<SiteSettings>({ companyName: 'GhanaTech Global', tagline: 'Vetted Technology Talent. Global Delivery.', contactEmail: 'advisors@ghanatechglobal.com', supportPhone: '+1 (726) 227-2605', accraOfficeAddress: 'Airport Residential Area, Accra, Ghana', usOfficeAddress: 'Austin, TX & New York, NY', allowPublicApplications: true, allowLeadSubmissions: true, socialLinks: {} });
let pending: Promise<void> | null = null;
export async function refreshSiteSettings() {
  if (!pending) pending = (async () => {
    try { const result = await api.get('/settings') as unknown as ApiResponse<SiteSettings>; if (result.success) settings.value = { ...settings.value, ...result.data }; }
    catch { /* Preserve the existing contact details while offline. */ }
    finally { pending = null; }
  })();
  await pending;
}
export function useSiteSettings() { onMounted(refreshSiteSettings); return { settings }; }
