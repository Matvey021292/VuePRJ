import store from '../store/index'

export default function (to, from, next) {

    setTimeout(()=>{
        if (store.getters.user) {
            next()
        } else {
            next('/auth?loginError=true')
        }
    },800)
}