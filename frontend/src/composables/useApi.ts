import { ref } from 'vue';

export function useApi<T>(apiFn: (...args: any[]) => Promise<any>) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const execute = async (...args: any[]) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await apiFn(...args);
      data.value = response.data !== undefined ? response.data : response;
      return data.value;
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || 'An unexpected error occurred.';
      error.value = errMsg;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    error,
    isLoading,
    execute,
  };
}
