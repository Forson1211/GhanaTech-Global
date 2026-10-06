import { ref } from 'vue';
import type { ToastMessage } from '@/types/common';

const toasts = ref<ToastMessage[]>([]);

export function useToast() {
  const show = (message: string, type: 'success' | 'error' | 'info' = 'info', title?: string, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: ToastMessage = { id, message, type, title, duration };
    toasts.value.push(toast);

    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }
  };

  const success = (message: string, title = 'Success') => {
    show(message, 'success', title);
  };

  const error = (message: string, title = 'Error') => {
    show(message, 'error', title);
  };

  const info = (message: string, title = 'Notice') => {
    show(message, 'info', title);
  };

  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };

  return {
    toasts,
    show,
    success,
    error,
    info,
    remove,
  };
}
