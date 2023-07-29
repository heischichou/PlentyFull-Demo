import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// Shared Modules
import Home from "@/views/Guest/HomeView.vue";
import Find from "@/views/Shared/FindUsersView.vue";
import Statistics from "@/views/Shared/StatisticsView.vue";
import Profile from "@/views/Shared/ProfileView.vue";
// Transactions page also doubles as the Receive page for Charities
import Transactions from "@/views/Shared/TransactionsView.vue";

// Guest Modules
import About from "@/views/Guest/AboutView.vue";
import Register from "@/views/Guest/RegisterView.vue";
import Login from "@/views/Guest/LoginView.vue";

// Donor Modules
import Donate from "@/views/Donor/DonateView.vue";

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
    component: Transactions,
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
