<template>

    <div class="text-xs-center">
        <v-dialog
                v-model="modalDelete"
                width="500"
        >
            <v-btn color="pink lighten-1" class="btn-del" dark small absolute right top fab slot="activator">
                <v-icon>close</v-icon>
            </v-btn>
            <v-card class="elevation-0">
                <v-toolbar dark color="error" class="elevation-1">
                    <i class="material-icons">
                        delete
                    </i>
                    <v-toolbar-title>
                        Удалить запись
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                    </v-tooltip>

                </v-toolbar>
                <v-card-text>
                    <v-layout row justify-center>
                        <v-card-actions class="pl-0 pr-0 mr-4">
                            <v-btn
                                    large
                                    color="indigo white--text"
                                    large
                                    @click="onCancelD"
                            >
                                <i class="material-icons mr-2">
                                    close
                                </i>
                                Отменить
                            </v-btn>
                        </v-card-actions>
                        <v-card-actions class="pl-0 pr-0 ">
                            <v-btn
                                    large
                                    color="error white--text"
                                    large
                                    :loading="loading"
                                    @click="onDelete"
                            >
                                <i class="material-icons mr-2">
                                    add
                                </i>
                                Удалить
                            </v-btn>
                        </v-card-actions>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props:['posts'],
        data() {
            return {
                modalDelete: false,
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading;
            },
        },
        methods: {
            onCancelD(){
                this.modalDelete = false
            },
            onDelete(){
                this.$store.dispatch('onDelete',this.posts.id)
                    .then(()=>{
                        this.modalDelete = false
                    })
            }

        },
    }
</script>
<style>
    button.btn-del {
        transform: translateX(-150%);
    }
</style>