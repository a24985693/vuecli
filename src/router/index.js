import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/Orders.vue'),
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../views/Coupon.vue'),
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/Index.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'productsList',
        name: 'productsList',
        component: () => import('../views/UserProducts.vue'),
      },
      {
        path: 'product/:productId',
        name: 'product',
        component: () => import('../views/UserProduct.vue'),
      },
      {
        path: 'information',
        name: 'information',
        component: () => import('../views/UserInformation.vue'),
      },
      {
        path: 'checkout/:orderId',
        name: 'checkout',
        component: () => import('../views/UserCheckout.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
