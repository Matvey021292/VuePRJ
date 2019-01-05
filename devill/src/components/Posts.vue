<template>
    <v-container>
        <v-layout v-if="posts.length" row wrap>
            <v-flex xs12 sm6 md4 class=" mb-2" v-for="post in posts" :key="post.id">
                <v-card class="pb-3 ma-2">
                    <v-toolbar dark color="indigo" class="elevation-0">
                        <v-toolbar-title>{{post.service}}</v-toolbar-title>
                    </v-toolbar>
                 <v-card-actions>
                     <app-modal-delete :posts="post"></app-modal-delete>
                     <app-modal-edit :posts="post"></app-modal-edit>
                 </v-card-actions>
                    <v-img :src=post.image
                           aspect-ratio="2.75"
                    ></v-img>
                    <v-divider class="mb-3"></v-divider>
                    <v-card-actions block>
                        <v-list-tile v-if="post.pass">
                            <v-list-tile-avatar>
                                <v-icon>lock</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{post.pass}}</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn icon ripple>
                                    <v-icon color="pink lighten-1">info</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-card-actions>
                    <v-card-actions block>
                        <v-list-tile v-if="post.login">
                            <v-list-tile-avatar>
                                <v-icon>person</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{post.login}}</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn icon ripple>
                                    <v-icon color="pink lighten-1">info</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-card-actions>
                    <v-card-actions block>
                        <v-list-tile v-if=post.email>
                            <v-list-tile-avatar>
                                <v-icon>mail</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{post.email}}</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn icon ripple>
                                    <v-icon color="pink lighten-1">info</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-card>
                <v-toolbar dark color="indigo lighten-1" class="elevation-0">
                    <v-toolbar-title>Записей не найдено... :(</v-toolbar-title>
                </v-toolbar>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    import Edit from './ModalEdit'
    import Delete from './ModalDelete'

    export default {
        props:['id'],
        computed: {
            posts() {
                const id = this.id;
                return this.$store.getters.posts;
            }
        },
        components:{
            'app-modal-edit': Edit,
            'app-modal-delete': Delete
        }
    }
</script>

<style>
    div[role="listitem"] {
        width: 100%;
    }

    .v-image__image {
        background-size: contain;
    }

    .v-list__tile {
        height: 24px;
    }



    .v-toolbar {
        z-index: 1;
    }

    .elevation-2 {
        margin: auto;
    }
</style>