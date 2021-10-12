import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'admin',
    redirect: "/admin/home/",
    component: () => import('../views/admin.vue'),
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/admin/home/',
        name: '/admin/home/',
        component: () => import('../views/page/home.vue')
      },
      {
        path: '/admin/product/product_list',
        name: '/admin/product/product_list',
        component: () => import('../views/product/product_list.vue')
      },
      {
        path: '/admin/product/product_attr',
        name: '/admin/product/product_attr',
        component: () => import('../views/product/product_attr.vue')
      },
      {
        path: '/admin/product/product_classify',
        name: '/admin/product/product_classify',
        component: () => import('../views/product/product_classify.vue')
      },
      {
        path: '/admin/product/product_reply',
        name: '/admin/product/product_reply',
        component: () => import('../views/product/product_reply.vue')
      },

    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/page/Login.vue')
  },
]

const router = new VueRouter({
  routes
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(v => { return v.meta.isLogin == true })) {
    if (sessionStorage.getItem("token")) {
      next()
    }
    else {
      next('/login')
    }
  }
  else {
    next()
  }
})



export default router
