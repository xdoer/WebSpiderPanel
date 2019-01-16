import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/crawl',
      children: [{
          path: '/crawl',
          name: 'crawl',
          component: () => import('@/components/WebSpider')
        }, {
          path: '/proxy',
          name: 'proxy',
          component: () => import('@/components/Proxy')
        }, {
          path: '/guide',
          name: 'guide',
          component: () => import('@/components/Guide')
        }, {
          path: '/log',
          name: 'log',
          component: () => import('@/components/Log')
        }, {
          path: '/manage',
          name: 'manage',
          component: () => import('@/components/Manage')
        }, {
          path: '/share',
          name: 'share',
          component: () => import('@/components/Share')
        }]
    }, 
  ],
});
