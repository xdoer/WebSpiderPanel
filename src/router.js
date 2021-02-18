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
      children: [
        {
          path: '/crawl',
          name: 'crawl',
          component: () => import('@/components/WebSpider'),
        },
      ],
    },
  ],
});
