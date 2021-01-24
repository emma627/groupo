import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Ajouter from "../views/Ajouter.vue";
import Profil from "../views/Profil.vue";
import Signup from "../views/Signup.vue";
import Myposts from "../views/Myposts.vue";
import Users from "../views/Users.vue";
import Modifier from "../views/Modifier.vue";
import Comment from "../views/Comment.vue";
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/ajouter",
    name: "Ajouter",
    component: Ajouter,
  },
  {
    path: "/profil/:id",
    name: "Profil",
    component: Profil,
  },
  {
    path: "/modifier/:id",
    name: "Modifier",
    component: Modifier,
  },
  {
    path: "/comment/:id",
    name: "Comment",
    component: Comment,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/posts/:id",
    name: "Myposts",
    component: Myposts,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
