import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/auth';
import type { User, LoginCredentials } from '@/types/auth';

function getInitialUser(): User | null {
  const saved = localStorage.getItem('gtg_user');
  try {
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

const user = ref<User | null>(getInitialUser());

const token = ref<string | null>(localStorage.getItem('gtg_token'));
const isLoading = ref(false);
const error = ref<string | null>(null);

export function useAuth() {
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');
  const isRecruiter = computed(() => user.value?.role === 'recruiter');

  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data) {
        user.value = response.data.user;
        token.value = response.data.token;
        localStorage.setItem('gtg_token', response.data.token);
        localStorage.setItem('gtg_user', JSON.stringify(response.data.user));
        return response.data;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Invalid email or password.';
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // Continue client cleanup even if network fails
    } finally {
      user.value = null;
      token.value = null;
      localStorage.removeItem('gtg_token');
      localStorage.removeItem('gtg_user');
      if (router) {
        router.push('/admin/login');
      } else {
        window.location.href = '/admin/login';
      }
    }
  };

  const checkAuth = async () => {
    if (!token.value) {
      user.value = null;
      return false;
    }
    try {
      const res = await authService.verifyToken();
      if (res.success && res.data?.user) {
        user.value = res.data.user;
        localStorage.setItem('gtg_user', JSON.stringify(res.data.user));
        return true;
      }
      logout();
      return false;
    } catch {
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    isRecruiter,
    login,
    logout,
    checkAuth,
  };
}
