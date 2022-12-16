import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/PostsList.vue")
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () => import("@/pages/Post.vue"),
    props: (route) => {
      const id = Number.parseInt(route.params.id, 10)
      if (Number.isNaN(id)) {
        return 0
      }
      return { id }
    }
  },
  {
    path: "/profile/:userId",
    name: "Profile",
    component: () => import("@/pages/UserProfile.vue"),
    props: (route) => {
      const userId = Number.parseInt(route.params.userId, 10)
      if (Number.isNaN(userId)) {
        return 0
      }
      return { userId }
    }
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;