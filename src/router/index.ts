import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// Shared Modules
import Home from "@/views/HomeView.vue";
import Find from "@/views/FindUsersView.vue";
import Transactions from "@/views/TransactionsView.vue";
import Statistics from "@/views/StatisticsView.vue";
import Profile from "@/views/ProfileView.vue";

// Guest Modules
import About from "@/views/Guest/AboutView.vue";
import Register from "@/views/Guest/RegisterView.vue";
import Login from "@/views/Guest/LoginView.vue";

// Donor Modules
import Donate from "@/views/Donor/DonateView.vue";

// Charity Modules
import Receive from "@/views/Charity/ReceiveView.vue";

// Admin Modules
import Registry from "@/views/Admin/RegistryView.vue";

const routes: Array<RouteRecordRaw> = [
  // Shared Routes
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/find",
    name: "Find",
    component: Find,
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  // Guest Routes
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  // Donor Routes
  {
    path: "/donate",
    name: "Donate",
    component: Donate,
  },
  // Charity Routes
  {
    path: "/receive",
    name: "Receive",
    component: Receive,
  },
  // Admin Routes
  {
    path: "/registry",
    name: "Registry",
    component: Registry,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { routes };

export default router;
