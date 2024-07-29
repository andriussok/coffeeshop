import { createStore } from 'vuex';
import auth from '@app-store/modules/auth';
import user from '@app-store/modules/user';
import products from '@app-store/modules/products';
import reviews from '@app-store/modules/reviews';
import cart from '@app-store/modules/cart';
import orders from '@app-store/modules/orders';
import checkout from '@app-store/modules/checkout';
import toast from '@app-store/modules/toast';

// ADMIN
import adminOrders from '@app-store/modules/admin/adminOrders';
import adminUsers from '@app-store/modules/admin/adminUsers';
import adminProducts from '@app-store/modules/admin/adminProducts';


const store = createStore({
  modules: {
    auth,
    user,
    products,
    reviews,
    cart,
    orders,
    checkout,
    toast,
    adminOrders, // ADMIN
    adminUsers,
    adminProducts
  },
});

export default store;
