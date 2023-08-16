import { createRouter, createWebHistory } from 'vue-router';

const adminRoutes = [
  {
    path: '/admin',
    component: () => import('@/layouts/admin/default/Default.vue'),
    meta: { requiresAuth: true, requiredRole: 'admin' },
    children: [
      {
        path: '',
        name: 'HomeView',
        component: () => import('@/views/admin/HomeView.vue'),
      },
    ],
  },
];

const adminRouter = createRouter({
  history: createWebHistory(),
  routes: adminRoutes,
});

export default adminRouter;
