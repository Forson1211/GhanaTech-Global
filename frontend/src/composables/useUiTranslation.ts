import { useRoute } from 'vue-router';
import { useAdminPreferences } from './useAdminPreferences';
export function useUiTranslation() {
  const route = useRoute();
  const preferences = useAdminPreferences();
  return { t: (value: string) => route.path.startsWith('/admin') ? preferences.t(value) : value };
}
