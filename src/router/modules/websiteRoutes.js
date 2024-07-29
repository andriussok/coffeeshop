import { useStore } from 'vuex';
import Home from '@app-views/Home.vue';
import Signin from '@app-views/account/Signin.vue';
import Signup from '@app-views/account/Signup.vue';
import Products from '@app-views/Products.vue';
import Product from '@app-views/Product.vue';
import Company from '@app-views/Company.vue';
import Contact from '@app-views/Contact.vue';
import Cart from '@app-views/Cart.vue';
import Checkout from '@app-views/Checkout.vue';
import OrderSummary from '@app-views/OrderSummary.vue';

const websiteRoutes = [
  { path: '/', component: Home },
  { path: '/signin', component: Signin },
  { path: '/signup', component: Signup },
  { path: '/products/', component: Products},
  { path: '/product/:id', component: Product},
  { path: '/company', component: Company },
  { path: '/contact', component: Contact },
  { path: '/cart', component: Cart },
  { 
    path: '/checkout',
    component: Checkout,
    beforeEnter: (to, from, next) => {
      // Check if there are products in the cart
      const store = useStore();
      const userCart = store.getters['cart/userCart'];
      if (userCart.length === 0) {
        next('/cart'); // Redirect to cart page if the cart is empty
      } else {
        next(); // Proceed to checkout if the cart has items
      }
    },
  },
  { 
    path: '/order-summary',
    component: OrderSummary,
    beforeEnter: (to, from, next) => {
      // Check if there is order in the cart
      const store = useStore();
      const checkoutSuccess = store.getters['checkout/checkoutSuccess'];
      if (!checkoutSuccess) {
        next('/'); // Redirect to homepage
      } else {
        next(); // Proceed to order-summary
      }
    },
  },
];

export default websiteRoutes;
