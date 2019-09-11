import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Homepage from './views/Homepage.vue';
import Randomizerpage from './views/Randomizerpage.vue';
import Detailpage from './views/Detailpage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage,
    },
    {
      path: '/detailpage/:id',
      name: 'detailpage',
      component: Detailpage,
    },
    {
      path: '/randomizerpage',
      name: 'randomizerpage',
      component: Randomizerpage,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
