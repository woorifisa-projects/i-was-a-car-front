// Composables
import { createRouter, createWebHistory } from 'vue-router';
import serviceRouter from './service';
import adminRouter from './admin';

const router = createRouter({
  history: createWebHistory(),
  routes: [...serviceRouter.options.routes, ...adminRouter.options.routes],
});

export default router;
