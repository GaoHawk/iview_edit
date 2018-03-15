import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router.js';
import Util from './libs/util.js';
import store from './store/index';
import { sync } from 'vuex-router-sync';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueAxios, axios);
sync(store, Routers);
// // 没有cookie 登陆跳转
// router.beforeEach((to, from, next) => {
//     let token = localStorage.cookies;
//     let menu = to.path.split('/')[2];

//     store.commit('TABLE_NAME', menu);
//     console.log(menu);
//     if (to.path === '/') {
//         store.commit('SET_TOKEN', '');
//         next();
//     } else
//     if (token && to.path !== '/') {
//         store.commit('SET_TOKEN', token)
//         next();
//     } else {
//         next('/')
//     }
//     // next()
// })

// // 路由配置
// const RouterConfig = {
//     mode: 'history',
//     routes: Routers
// };
// const router = new VueRouter(RouterConfig);

// router.beforeEach((to, from, next) => {
//     iView.LoadingBar.start();
//     Util.title(to.meta.title);
//     next();
// });

// router.afterEach((to, from, next) => {
//     iView.LoadingBar.finish();
//     window.scrollTo(0, 0);
// });

new Vue({
    el: '#app',
    router: Routers,
    store,
    render: h => h(App)
});