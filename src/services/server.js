// src/services/server.js
import { v4 as uuidv4 } from 'uuid';

const SERVER_KEY = 'server_data';

const getServerData = () => {
  const data = localStorage.getItem(SERVER_KEY);
  return data ? JSON.parse(data) : { users: [], carts: [], orders: [], reviews: [] };
};

const setServerData = (data) => {
  localStorage.setItem(SERVER_KEY, JSON.stringify(data));
};

// User CRUD Operations
export const createUser = (user) => {
  const data = getServerData();
  data.users.push(user);
  data.carts.push({ userId: user.id, items: [] }); // Create an empty cart for the user
  setServerData(data);
};

export const verifyUser = (username) => {
  const data = getServerData();
  const index = data.users.findIndex(u => u.username === username && !u.verified);
  if (index !== -1) {
    data.users[index].verified = true;
    setServerData(data);
    return data.users[index];
  }
  return null;
};

export const getUser = (username) => {
  const data = getServerData();
  return data.users.find(u => u.username === username);
};

export const getUserById = (userId) => {
  const data = getServerData();
  return data.users.find(u => u.id === userId);
};

export const updateUser = (user) => {
  const data = getServerData();
  const index = data.users.findIndex(u => u.id === user.id);
  if (index !== -1) {
    data.users[index] = user;
    setServerData(data);
    return data.users[index]; // Return the updated user
  }
};

export const updatePassword = ({ id, password, salt }) => {
  const data = getServerData();
  const index = data.users.findIndex(u => u.id === id);
  if (index !== -1) {
    data.users[index].password = password;
    data.users[index].salt = salt;
    setServerData(data);
    return data.users[index]; // Return the updated user
  }
  throw new Error('User not found');
};

export async function signoutOtherSessions(userId) {
  return // Logic to sign out user from all other sessions
}

export const deleteUser = (userId) => {
  const data = getServerData();
  const index = data.users.findIndex(u => u.id === userId);
  if (index !== -1) {
    data.users.splice(index, 1);
    data.carts = data.carts.filter(cart => cart.userId !== userId);
    setServerData(data);
  }
};

// Cart CRUD Operations
export const createCart = (cart) => {
  const data = getServerData();
  data.carts.push(cart);
  setServerData(data);
};

export const getCartByUserId = (userId) => {
  const data = getServerData();
  return data.carts.find(cart => cart.userId === userId);
};

export const updateCart = (cart) => {
  const data = getServerData();
  const index = data.carts.findIndex(c => c.userId === cart.userId);
  if (index !== -1) {
    data.carts[index] = cart;
    setServerData(data);
  }
};

export const clearCart = (userId) => {
  sessionStorage.removeItem('guestCart');
  const data = getServerData();
  const index = data.carts.findIndex(c => c.userId === userId);
  if (index !== -1) {
    data.carts[index].items = [];
    setServerData(data);
  }
};



// Order CRUD Operations
export const createOrder = (order) => {
  const data = getServerData();
  data.orders.push(order);
  setServerData(data);
};

export const getOrdersByUserId = (userId) => {
  const data = getServerData();
  return data.orders.filter(order => order.userId === userId);
};

export const getOrdersByEmail = (email) => {
  const data = getServerData();
  return data.orders.filter(order => order.email === email);
};

export const updateOrderUserId = (orderId, newUserId) => {
  const data = getServerData();
  const orderIndex = data.orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    const order = data.orders[orderIndex];
    order.userId = newUserId;
    order.isGuestOrder = false;
    order.transferTimestamp = new Date().toISOString();
    setServerData(data);
    return order;
  }
  return null;
};


// Reviews CRUD Operations

export const addReview = (review) => {
  const data = getServerData();

  // Prevent guest reviews
  if (review.userId === 'guest') {
    throw new Error('Guest users cannot place reviews.');
  }

  // Check if the user has purchased the product
  const userOrders = data.orders.filter(order => order.userId === review.userId);
  const purchasedProduct = userOrders.some(order => order.items.some(item => item.id === review.productId));

  // Add new review
  const newReview = {
    ...review,
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    verifiedPurchase: purchasedProduct,
    edited: false,
  };

  data.reviews.push(newReview);
  setServerData(data);
  return newReview;
};

export const updateReview = (updatedReview) => {
  const data = getServerData();
  const existingReviewIndex = data.reviews.findIndex(r => r.id === updatedReview.id);

  if (existingReviewIndex !== -1) {
    data.reviews[existingReviewIndex] = {
      ...data.reviews[existingReviewIndex],
      ...updatedReview,
      timestamp: new Date().toISOString(),
      edited: true,
    };
    setServerData(data);
    return data.reviews[existingReviewIndex];
  }
  return null;
};

export const getReviewsByProduct = (productId) => {
  const data = getServerData();
  return data.reviews.filter(review => review.productId === productId);
};

export const getReviewsByUser = (userId) => {
  const data = getServerData();
  return data.reviews.filter(review => review.userId === userId);
};

export const deleteReview = (reviewId) => {
  const data = getServerData();
  const reviewIndex = data.reviews.findIndex(r => r.id === reviewId);

  if (reviewIndex !== -1) {
    data.reviews.splice(reviewIndex, 1);
    setServerData(data);
    return true;
  }
  return false;
};

// STATS

// Stats Calculator Function
export const calculateStats = () => {
  const data = getServerData();
  const totalOrders = data.orders.length;
  const totalSales = data.orders.reduce((acc, order) => acc + order.total, 0);
  const averageOrderValue = totalOrders > 0 ? (totalSales / totalOrders).toFixed(0) : 0;
  const totalProducts = data.orders.reduce((acc, order) => acc + order.items.length, 0);
  const productsPerOrder = totalOrders > 0 ? (totalProducts / totalOrders).toFixed(2) : 0;

  return {
    totalOrders,
    totalSales,
    averageOrderValue,
    productsPerOrder
  };
};

export const getStats = () => {
  return calculateStats();
};




// UTILITY
export const paginateAndFilter = (items, page, pageSize, filters) => {

  // Apply filters
  for (const key in filters) {
    if (filters[key]) {
      items = items.filter(item => {
        for (const [subkey, value] of Object.entries(item)) {
          if (String(value).toLowerCase().includes(filters[key].toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }
  }

  const total = items.length;

  // Paginate
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedItems = items.slice(start, end);

  return {
    total,
    items: paginatedItems,
  };
};

export const getOrders = (page = 1, pageSize = 10, filters = {}) => {
  const data = getServerData();
  return paginateAndFilter(data.orders, page, pageSize, filters);
};

export const getUsers = (page = 1, pageSize = 10, filters = {}) => {
  const data = getServerData();
  return paginateAndFilter(data.users, page, pageSize, filters);
};
