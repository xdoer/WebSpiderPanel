import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
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
          path: '/history',
          name: 'history',
          component: () => import('@/components/History')
        }, {
          path: '/manage',
          name: 'manage',
          component: () => import('@/components/Manage/manage')
        }, {
          path: '/share',
          name: 'share',
          component: () => import('@/components/Share/index')
        }, {
          path: '/enter',
          name: 'enter',
          component: () => import('@/components/Manage/index')
        }]
    }, 
  ],
});
