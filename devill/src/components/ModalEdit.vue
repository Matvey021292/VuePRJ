<template>

    <div class="text-xs-center">
        <v-dialog
                v-model="modal"
                width="500"
        >
            <v-btn color="success" dark absolute right top fab slot="activator">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-card class="elevation-0">
                <v-toolbar dark color="error" class="elevation-1">
                    <i class="material-icons">
                        edit
                    </i>
                    <v-toolbar-title>
                        Изменить запись
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                    </v-tooltip>

                </v-toolbar>
                <v-card-text>
                    <v-form class="text-sm-right" ref="form" v-model="valid">
                        <v-text-field prepend-icon="keyboard_capslock"
                                      name="service"
                                      v-model="editService"
                                      label="Наименование сервиса"
                                      type="text"
                        ></v-text-field>
                        <v-text-field
                                prepend-icon="lock"
                                v-model="editPass"
                                name="pass"
                                label="Пароль"
                                type="text"
                        ></v-text-field>
                        <v-text-field
                                prepend-icon="person"
                                v-model="editLogin"
                                name="login"
                                label="Логин"
                                type="text"
                        ></v-text-field>
                        <v-text-field
                                prepend-icon="email"
                                name="email"
                                v-model="editEmail"
                                label="Email"
                                type="text"
                        ></v-text-field>
                    </v-form>
                    <v-layout row justify-end>
                        <v-card-actions class="pl-0 pr-0 mr-4">
                            <v-btn
                                    large
                                    @click="onCancel"
                                    color="error white--text"
                                    large
                                    :loading="loading"
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
                                    @click="onEdit"
                                    color="error white--text"
                                    large
                                    :loading="loading"
                            >
                                <i class="material-icons mr-2">
                                    save
                                </i>
                                Изменить
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
        props: ['posts'],
        data() {
            return {
                modal: false,
                editService: this.posts.service,
                editPass: this.posts.pass,
                editLogin: this.posts.login,
                editEmail: this.posts.email,
                imageSrc: this.posts.image,
                valid: false
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading;
            },
        },
        methods: {
            onEdit() {
                this.$store.dispatch('updatePost', {
                    service: this.editService,
                    email: this.editEmail,
                    pass: this.editPass,
                    login: this.editLogin,
                    id:this.posts.id
                })
                    this.modal = false
            },
            onCancel() {
                this.editService = this.posts.service;
                this.editPass = this.posts.pass;
                this.editLogin = this.posts.login;
                this.editEmail = this.posts.email;
                this.modal = false
            }
        },
    }
</script>