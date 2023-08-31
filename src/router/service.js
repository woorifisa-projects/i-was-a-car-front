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
        path: 'products/:productId',
        name: 'ProductDetail',
        component: () => import('@/views/service/products/ProductDetails.vue'),
      },
    ],
  },
  {
    path: '/mypage',
    component: () => import('@/layouts/service/myPage/Default.vue'),
    children: [
      {
        path: '/',
        name: 'MyPage',
        component: () => import('@/views/service/'),
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
];

const serviceRouter = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: serviceRoutes,
});

export default serviceRouter;
