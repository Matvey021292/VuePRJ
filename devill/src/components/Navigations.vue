<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                fixed
                class="fixed-toolbar"
                app
        >
            <v-list dense>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>assignment_ind</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Вход</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Выход</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>
                WebDevil
            </v-toolbar-title>
            <i class="material-icons">
                keyboard_capslock
            </i>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <!--<v-btn flat>-->
                    <!--<i class="material-icons mr-1">-->
                        <!--assignment_ind-->
                    <!--</i>-->
                    <!--Вход-->
                <!--</v-btn>-->
                <v-btn flat v-if="isUserLogin" @click="logOutUser">
                    <i class="material-icons  mr-1">
                        exit_to_app
                    </i>
                    Выход
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-container fill-height>
                <v-layout row wrap
                >
                    <v-flex sm3>
                        <app-add-post></app-add-post>
                    </v-flex>
                    <v-flex xs9 class="scroll-post-section">
                        <app-posts></app-posts>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer color="indigo" dark app>
            <div class="white--text ">&copy; 2018</div>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                drawer: false,
            }
        },
        props: {
            source: String
        },
        methods:{
            logOutUser () {
                this.$store.dispatch('logOutUser')
                this.$router.push('/auth')
            }
        },
        computed: {
            isUserLogin() {
                return this.$store.getters.isUserLogin
            },
        }
    }
</script>

<style>
.scroll-post-section{
    overflow-y: auto;
    max-height: 80vh;
}
</style>