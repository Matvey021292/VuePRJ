import * as fb from 'firebase'

class User {
    constructor(id) {
        this.id = id;
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        async loginUser({commit}, {email, pass}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const user = await fb.auth().signInWithEmailAndPassword(email, pass);
                commit('setUser', new User(user.uid));
                commit('setLoading', false);
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
        },
        autoLoginUser({commit}, payload) {
            commit('setUser', new User(payload.uid),true)
        },
        logOutUser({commit}) {
            fb.auth().signOut();
            commit('setUser', null)
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        isUserLogin(state) {
            return state.user !== null;
        }
    }
}