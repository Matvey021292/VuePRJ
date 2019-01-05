<template>
    <div id="app" class="mt-0">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        computed: {
            isUserLogin() {
                return this.$store.getters.isUserLogin
            },
            user() {
                console.log(this.$store.getters.user)
            }
        },
        created() {
            if (this.$route.query['?loginError=true']) {
                this.$store.dispatch('setError', 'Пожалуйста войдите в систему')
            }
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    html {
        overflow-y: hidden;
    }
    .v-toolbar--absolute, .v-toolbar--fixed{
        z-index: 2222 !important;
    }
</style>
