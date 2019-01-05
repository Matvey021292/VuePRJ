import * as fb from 'firebase'

class Post {
    constructor(service, login, pass, email, image, userid, id = null) {
        this.service = service;
        this.login = login;
        this.pass = pass;
        this.email = email;
        this.image = image;
        this.userid = userid;
        this.id = id;
    }
}

export default {
    state: {
        posts: []
    },
    mutations: {
        loadPost(state, payload) {
            state.posts = payload;
        },
        createPost(state, payload) {
            state.posts.push(payload)
        },
        updatePost(state,{ service,email,pass,login,id}){
            const post = state.posts.find(a=>{
                return a.id === id
            })
            post.service = service;
            post.email = email;
            post.pass = pass;
            post.login = login;
        },
        onDelete(state,payload){
            let ids;
            state.posts.forEach(function(id, index) {
                if(payload === id.id) {
                    ids = index;
                }

            });
            state.posts.splice(ids,1);
        }
    },
    actions: {
        async onDelete({commit},payload){
            commit('clearError');
            commit('setLoading', true);
            try {
                await fb.database().ref('post').child(payload).remove();
                commit('setLoading', false)
                commit('onDelete',payload)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async updatePost({commit},{service,email,pass,login,id}){
            commit('clearError');
            commit('setLoading', true);
            try {
                await fb.database().ref('post').child(id).update({
                    service,email,pass,login
                });
                commit('setLoading', false)
                commit('updatePost',{
                    service,email,pass,login,id
                })
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async createPost({commit, getters}, payload) {
            commit('clearError');
            commit('setLoading', true);
            const image = payload.image;
            try {
                const post = new Post(payload.service, payload.login, payload.pass, payload.email, '', getters.user.id)
                const ptValue = await fb.database().ref('post').push(post);
                const imageExt = image.name.slice(image.name.lastIndexOf('.') + 1);
                const metadata = {
                    contentType: image.type
                };
                const fileData = await fb.storage().ref(`post/${ptValue.key}.${imageExt}`).put(image, metadata);
                const imageSrc = await fb.storage().ref(fileData.ref.fullPath).getDownloadURL();
                await fb.database().ref('post').child(ptValue.key).update({image:imageSrc})
                commit('setLoading', false)
                commit('createPost', {
                    ...post, id: ptValue.key, image: imageSrc
                })

            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async fetchPost({commit}, payload) {
            commit('clearError')
            commit('setLoading', true)
            const resultPost = [];
            try {
                const ptValue = await fb.database().ref('post').once('value');
                const post = ptValue.val();
                if(post){
                    Object.keys(post).forEach(key => {
                        const pos = post[key]
                        resultPost.push(
                            new Post(pos.service, pos.login, pos.pass, pos.email, pos.image, pos.userid, key)
                        )
                    })
                }

                commit('loadPost', resultPost)
                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        }
    },
    getters: {
        posts(state) {
            return state.posts;
        },
        postById(state){
            return postID => {
                return state.posts.find(posts => posts.id == postID)
            }
        }
    }
}