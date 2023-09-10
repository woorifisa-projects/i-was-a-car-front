// Composables
import { createRouter, createWebHistory } from 'vue-router';
import serviceRouter from './service';
import adminRouter from './admin';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { authAPI } from '@/apis/service/auth/authApi';

const router = createRouter({
  history: createWebHistory(),
  routes: [...serviceRouter.options.routes, ...adminRouter.options.routes],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  const { isLogin } = storeToRefs(auth);
  const { verifiedAuth } = auth;

  try {
    const { data } = await authAPI();

    if (data != null) {
      verifiedAuth(data);
    }
  } catch (e) {
    //
  }

  if (to.meta.requiresAuth && !isLogin.value) {
    return '/login';
  }
});

export default router;
