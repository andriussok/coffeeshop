// router/adminRoutes.js
import AdminDashboard from '@app-admin/AdminDashboard.vue';
import AdminOrders from '@app-admin/views/AdminOrders.vue';
import AdminUsers from '@app-admin/views/AdminUsers.vue';
import AdminStats from '@app-admin/views/AdminStats.vue';
import AdminProducts from '@app-admin/views/AdminProducts.vue';

const adminRoutes = [
  {
    path: '/admin',
    component: AdminDashboard,
    children: [
      { path: '', redirect: 'admin/stats' },
      { path: 'orders', component: AdminOrders },
      { path: 'users', component: AdminUsers },
      { path: 'stats', component: AdminStats },
      { path: 'products', component: AdminProducts },
      // { path: 'wishlist', component: AdminWishlist },
      // { path: 'reviews', component: AdminReviews },
      // { path: 'settings', component: AdminSettings }
    ]
  },
  // { path: '/signout', component: Signout }
];

export default adminRoutes;
