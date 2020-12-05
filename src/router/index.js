import Vue from "vue";
import VueRouter from "vue-router";

import {store} from "@/store";
import Header_basket from '@/components/Header_basket';
import List from '@/components/List';

Vue.component('app-header', Header_basket);
Vue.component('list', List);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Главная",
    components: {
      default: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"), 
    }
  },
  {
    path: "/about",
    name: "О нас",
    components: {
      default: () => import(/* webpackChunkName: "home" */ "@/views/About.vue"), 
    }
  },
  /*{
  path: "/services",
  name: "Сервисы",
  component: () => import("../views/Services.vue"),
  children: [
    {
      path: 'krovlya',
      component: () => import("../views/Krovlya.vue")
    },
    {
      path: 'karkas',
      component: () => import("../views/Karkas.vue")
    },
    {
      path: 'build',
      component: () => import("../views/Build.vue")
    },
    {
      path: "",
      component: () => import("../views/Dropdown.vue")
    }]    
  },*/  
  {
    path: "/krovlya",
    name: "Кровля",
     components: {
      default: () => import(/* webpackChunkName: "home" */ "@/views/Krovlya.vue"), 
    }//,
    //meta: {requiredAuth: true} 
  },
  {
    path: "/karkas",
    name: "Каркасный дом",
    components: {
      default: () => import(/* webpackChunkName: "home" */ "@/views/Karkas.vue"), 
    }
  },  
  {
    path: "/build",
    name: "Общестрой",
    components: {
      default: () => import(/* webpackChunkName: "home" */ "@/views/Build.vue"), 
    }
  },
  {
    path: "/prices",
    name: "Расценки",
    components: {
      default: () => import(/* webpackChunkName: "home" */ "@/views/Price.vue"), 
    },
      meta: {requiredAuth: true}
  },    
  {
    path: "/contacts",
    name: "Контакты",
    components: {
      default: () => import(/* webpackChunkName: "home" */ "@/views/Contacts.vue"), 
    }
  },
  {
    path: "/users",
    name: "Авторизация",
    components: {
      default: () => import(/* webpackChunkName: "clients" */ "@/views/Authentication")
    }   
  },
  {
    path: "/clients",
    name: "Отзывы клиентов",
    components: {
      header: Header_basket,
      default: () => import(/* webpackChunkName: "clients" */ "@/views/Clients"),
      list: List
  },
    meta: {requiredAuth: true}
  }     
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiredAuth)) {
    if(store.getters.IS_AUTHENTICATED) next()
    else next({path: '/users', params: {nextUrl: to.fullPath}});
  } else next();
});

export default router;
