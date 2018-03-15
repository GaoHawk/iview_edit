import Vue from 'vue';
import Router from 'vue-router';
import loginView from './views/login';
import welcome from './views/welcome'
import table from './views/table/table'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'loginView',
            component: loginView
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: welcome
        },
        {
            path: '/table',
            name: 'table',
            component: table
        }
    ]
})