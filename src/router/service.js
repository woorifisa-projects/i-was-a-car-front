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
        path: 'sales/meeting',
        name: 'MeeingLocation',
        component: () => import('@/views/service/sales/MeetingLocation.vue'),
      },
      {
        path: 'sales/car-info',
        name: 'CarRetrieve',
        component: () => import('@/views/service/sales/CarRetrieve.vue'),
      },
      {
        path: 'sales/car',
        name: 'CarInfo',
        component: () => import('@/views/service/sales/CarInfo.vue'),
      },
      {
        path: 'sales/images',
        name: 'ImageInput',
        component: () => import('@/views/service/sales/ImageInput.vue'),
      },
      {
        path: 'sales/finance',
        name: 'PriceAndAccount',
        component: () => import('@/views/service/sales/PriceAndAccount.vue'),
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
      },
      {
        path: '/sale',
        name: 'MyPageSale',
        component: () => import('@/views/service/mypage/SaleHistoryView.vue'),
      },
      {
        path: '/member',
        name: 'MyPageMember',
        component: () => import('@/views/service/mypage/MemberInfoView.vue'),
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
    path: '/one-click-purchase/:id',
    name: 'OneClickPurchase',
    component: () => import('@/views/service/OneClickPurchaseView.vue'),
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
