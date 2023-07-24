export const routerInfo = [
  {
    path: '/login',
    component: () => import("@/views/login/index.vue"),
    name: 'login',
    meta: {
      title: '登录',
      show: false
    }
  },
  {
    path: '/',
    component: () => import("@/layout/index.vue"),
    name: 'layout',
    redirect: '/home',
    meta: {
      title: 'layout',
      show: true,
      icon: 'HomeFilled'
    },
    children: [
      {
        path: '/home',
        component: () => import("@/views/home/index.vue"),
        name: 'home',
        meta: {
          title: '首页',
          show: true,
          icon: 'HomeFilled'
        }
      }
    ]
  },
  {
    path: '/screen',
    component: () => import("@/views/screen/screen.vue"),
    name: 'Screen',
    meta: {
      show: true,
      title: '数据大屏',
      icon: 'FullScreen'
    }
  },
  {
    path: '/acl',
    component: () => import("@/layout/index.vue"),
    name: 'Acl',
    meta: {
      show: true,
      title: '权限管理',
      icon: 'Lock'
    },
    redirect: '/acl/role',
    children: [
      {
        path: '/acl/user',
        component: () => import("@/views/authority/user/user.vue"),
        name: 'Acl',
        meta: {
          show: true,
          title: '用户管理',
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        component: () => import("@/views/authority/role/role.vue"),
        name: 'Role',
        meta: {
          show: true,
          title: '角色管理',
          icon: 'UserFilled'
        },
      },
      {
        path: '/acl/permisson',
        component: () => import("@/views/authority/permisson/permisson.vue"),
        name: 'Permisson',
        meta: {
          show: true,
          title: '菜单管理',
          icon: 'Files'
        },
      }
    ]
  },
  {
    path: '/product',
    component: () => import("@/layout/index.vue"),
    name: 'Product',
    meta: {
      show: true,
      title: '商品管理',
      icon: 'Goods'
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import("@/views/product/trademark/index.vue"),
        name: 'Trademark',
        meta: {
          show: true,
          title: '品牌管理',
          icon: 'ShoppingCart'
        },
      },
      {
        path: '/product/attr',
        component: () => import("@/views/product/attr/index.vue"),
        name: 'Attr',
        meta: {
          show: true,
          title: '属性管理',
          icon: 'Aim'
        },
      },
      {
        path: '/product/sku',
        component: () => import("@/views/product/sku/index.vue"),
        name: 'Sku',
        meta: {
          show: true,
          title: 'SKU管理',
          icon: 'Setting'
        },
      },
      {
        path: '/product/spu',
        component: () => import("@/views/product/spu/index.vue"),
        name: 'Spu',
        meta: {
          show: true,
          title: 'SPU管理',
          icon: 'Setting'
        },
      }
    ]
  },
  {
    path: '/404',
    component: () => import("@/views/404/index.vue"),
    name: '404',
    meta: {
      title: '404',
      show: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: '任意路由',
      show: false
    },
  }
]