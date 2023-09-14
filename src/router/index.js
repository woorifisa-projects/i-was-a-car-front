// Composables
import { createRouter, createWebHistory } from 'vue-router';
import serviceRouter from './service';
import adminRouter from './admin';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { authAPI } from '@/apis/service/auth/authApi';
import { useRouteStore } from '@/store/route';

const router = createRouter({
  history: createWebHistory(),
  routes: [...serviceRouter.options.routes, ...adminRouter.options.routes],
});

router.beforeEach(async (to, from) => {
  const auth = useAuthStore();
  const { isLogin } = storeToRefs(auth);
  const { verifiedAuth } = auth;

  const routeStore = useRouteStore();
  const { setPreviousRoute } = routeStore;

  setPreviousRoute(from.path);

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
