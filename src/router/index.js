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
        path: '/admin/home',
        name: 'home',
        component: () => import('../views/page/home.vue')
      },
      {
        path: '/admin/product',
        name: 'product',
        redirect: "/admin/product/product_list",
        component: () => import('../views/page/product.vue'),
        children: [
          {
            path: '/admin/product/product_list',
            name: 'product_list',
            component: () => import('../views/product/product_list.vue')
          },
          {
            path: '/admin/product/product_classify',
            name: 'product_classify',
            component: () => import('../views/product/product_classify.vue')
          },
          {
            path: '/admin/product/product_reply',
            name: 'product_reply',
            component: () => import('../views/product/product_reply.vue')
          },
          {
            path: '/admin/product/product_attr',
            name: 'product_attr',
            component: () => import('../views/product/product_attr.vue')
          },
        ]
      },
      {
        path: '/admin/user',
        name: 'user',
        redirect: "/admin/user/list",
        component: () => import('../views/page/user.vue'),
        children: [
          {
            path: '/admin/user/list',
            name: 'list',
            component: () => import('../views/user/list.vue')
          },
          {
            path: '/admin/user/level',
            name: 'level',
            component: () => import('../views/user/level.vue')
          },
          {
            path: '/admin/user/group',
            name: 'group',
            component: () => import('../views/user/group.vue')
          },
          {
            path: '/admin/user/label',
            name: 'label',
            component: () => import('../views/user/label.vue')
          },
        ]
      },
      {
        path: '/admin/order',
        name: 'order',
        redirect: "/admin/order/list",
        component: () => import('../views/page/order.vue'),
        children: [
          {
            path: '/admin/order/list',
            name: 'list',
            component: () => import('../views/order/list.vue')
          },
        ]
      },
      {
        path: '/admin/agent',
        name: 'order',
        redirect: "/admin/order/list",
        component: () => import('../views/page/order.vue'),
        children: [
          {
            path: '/admin/agent/agent_manage/index',
            name: 'list',
            component: () => import('../views/agent/agent_manage.vue')
          },
        ]
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
