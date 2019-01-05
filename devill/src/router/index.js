import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Auth from '../components/Auth'
import Home from '../components/Home'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/auth',
            name: 'Auth',
            component: Auth,
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            beforeEnter: AuthGuard
        },
    ],
    mode: 'history',
})
