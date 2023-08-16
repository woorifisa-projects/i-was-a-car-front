import { createRouter, createWebHistory } from 'vue-router';

const adminRoutes = [
  {
    path: '/admin',
    component: () => import('@/layouts/admin/default/TheDefault.vue'),
    meta: { requiresAuth: true, requiredRole: 'admin' },
    children: [
      {
        path: '',
        name: 'ProductManagement',
        component: () => import('@/views/admin/ProductManagementView.vue'),
      },
      {
        path: 'member',
        name: 'MemberManagement',
        component: () => import('@/views/admin/MemberManagementView.vue'),
      },
    ],
  },
];

const adminRouter = createRouter({
  history: createWebHistory(),
  routes: adminRoutes,
});

export default adminRouter;
