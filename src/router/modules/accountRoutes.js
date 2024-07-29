// router/accountRoutes.js
import AccountDashboard from '@app-views/account/AccountDashboard.vue';

import Profile from '@app-components/account/Profile.vue';
import Orders from '@app-components/account/Orders.vue';
import Wishlist from '@app-components/account/Wishlist.vue';
import MyReviews from '@app-components/account/MyReviews.vue';
import PaymentMethod from '@app-components/account/PaymentMethod.vue';
import Settings from '@app-components/account/Settings.vue';
import Signout from '@app-views/account/Signout.vue';

const accountRoutes = [
  {
    path: '/account',
    component: AccountDashboard,
    children: [
      { path: '', redirect: '/account/orders' },
      { path: 'profile', component: Profile },
      { path: 'orders', component: Orders },
      { path: 'wishlist', component: Wishlist },
      { path: 'reviews', component: MyReviews },
      { path: 'payment-method', component: PaymentMethod },
      { path: 'settings', component: Settings }
    ]
  },
  { path: '/signout', component: Signout }
];

export default accountRoutes;
