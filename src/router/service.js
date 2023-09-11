import { createRouter, createWebHistory } from 'vue-router';

const serviceRoutes = [
  {
    path: '/',
    component: () => import('@/layouts/service/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/service/HomeView.vue'),
      },
      {
        path: 'products/:productId',
        name: 'ProductDetail',
        component: () => import('@/views/service/products/ProductDetails.vue'),
      },
      {
        path: '/normal-purchase/:id',
        name: 'purchase',
        component: () => import('@/views/service/PurchaseView.vue'),
      },
      {
        path: '/one-click-purchase/:id',
        name: 'OneClickPurchase',
        component: () => import('@/views/service/OneClickPurchaseView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/one-click-sale/:id',
        name: 'OneClickSale',
        component: () => import('@/views/service/OneClickSaleView.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/mypage',
    component: () => import('@/layouts/service/myPage/Default.vue'),
    children: [
      {
        path: '/purchase',
        name: 'MyPagePurchase',
        component: () =>
          import('@/views/service/mypage/PurchaseHistoryView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/sale',
        name: 'MyPageSale',
        component: () => import('@/views/service/mypage/SaleHistoryView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/member',
        name: 'MyPageMember',
        component: () => import('@/views/service/mypage/MemberInfoView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/purchase/:id',
        name: 'PurchaseHistoryDetail',
        component: () =>
          import('@/views/service/mypage/PurchaseHistoryDetailView.vue'),
      },
      {
        path: '/sale/:id',
        name: 'SaleHistoryDetail',
        component: () =>
          import('@/views/service/mypage/SaleHistoryDetailView.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/service/LoginView.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/service/SignupView.vue'),
  },
  {
    path: '/email',
    name: 'EmailAuthentication',
    component: () => import('@/views/service/EmailAuthenticationView.vue'),
  },
  {
    path: '/signup-consent',
    name: 'SignupConsent',
    component: () => import('@/views/service/SignupConsentView.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('@/views/common/NotFoundView.vue'),
  },
];

const serviceRouter = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: serviceRoutes,
});

export default serviceRouter;
