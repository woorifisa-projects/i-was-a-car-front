import { createRouter, createWebHistory } from 'vue-router';

const adminRoutes = [
  {
    path: '/admin',
    component: () => import('@/layouts/admin/default/TheDefault.vue'),
    // meta: { requiresAuth: true, requiredRole: 'admin' },
    children: [
      {
        path: '',
        name: 'ProductManagement',
        component: () =>
          import('@/views/admin/products/ProductManagementView.vue'),
      },
      {
        path: 'judge',
        name: 'ProductJudgeManagement',
        component: () =>
          import('@/views/admin/products/ProductJudgeManagementView.vue'),
      },
      {
        path: 'member',
        name: 'MemberManagement',
        component: () =>
          import('@/views/admin/members/MemberManagementView.vue'),
      },
      {
        path: 'log',
        name: 'LogManagemnet',
        component: () => import('@/views/admin/logs/LogManagementView.vue'),
      },
    ],
  },
];

const adminRouter = createRouter({
  history: createWebHistory(),
  routes: adminRoutes,
});

export default adminRouter;
