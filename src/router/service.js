import { createRouter, createWebHistory } from 'vue-router';

const serviceRoutes = [
  {
    path: '/',
    component: () => import('@/layouts/service/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/service/Home.vue'),
      },
    ],
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
