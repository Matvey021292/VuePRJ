// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Nav from './components/Navigations'
import Add from './components/Add'
import Posts from './components/Posts'
import Edit from './components/ModalEdit'
import * as fb from 'firebase'

Vue.use(Vuetify);
Vue.component('app-navigation', Nav);
Vue.component('app-add-post', Add);
Vue.component('app-posts', Posts);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>',
    created(){
        fb.initializeApp({
            apiKey: "AIzaSyDDFAbpL4iE-pxuewP-1gng0v0iMlgO6G4",
            authDomain: "pasword-ed97b.firebaseapp.com",
            databaseURL: "https://pasword-ed97b.firebaseio.com",
            projectId: "pasword-ed97b",
            storageBucket: "pasword-ed97b.appspot.com",
            messagingSenderId: "356265843194"
        });
        fb.auth().onAuthStateChanged(user => {
            if (user) {
                this.$store.dispatch('autoLoginUser', user)
            }
        })
        this.$store.dispatch('fetchPost')
    }
});
