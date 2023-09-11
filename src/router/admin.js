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
        name: 'LogManagement',
        component: () => import('@/views/admin/logs/LogManagementView.vue'),
      },
      {
        path: 'productDetail/:id',
        name: 'ProductManagementDetail',
        component: () => import('@/views/admin/products/ProductDetailView.vue'),
      },
    ],
  },
];

const adminRouter = createRouter({
  history: createWebHistory(),
  routes: adminRoutes,
});

export default adminRouter;
