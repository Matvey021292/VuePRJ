<template>
    <v-app id="inspire">
        <template v-if="error">
            <v-snackbar
                    :timeout="6000"
                    :multi-line="true"
                    color="error"
                    @input="closeError"
                    :value="true"
            >
                {{ error }}
            </v-snackbar>
        </template>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-3">
                            <div class="text-xs-center loader-icon" v-if="loading">
                                <v-progress-circular
                                        :size="50"
                                        color="primary"
                                        indeterminate
                                ></v-progress-circular>
                            </div>
                            <v-toolbar dark color="indigo">
                                <v-toolbar-title>Авторизация</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-tooltip bottom>
                                </v-tooltip>

                            </v-toolbar>
                            <v-card-text>
                                <v-form v-model="valid" ref="form" lazy-validation>
                                    <v-text-field
                                            prepend-icon="person"
                                            v-model="emailAuth"
                                            name="email"
                                            label="Логин"
                                            type="text"
                                            :rules="emailAuthRules"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            id="passAuth"
                                            prepend-icon="lock"
                                            v-model="passAuth"
                                            :rules="passAuthRules"
                                            name="pass"
                                            label="Пароль"
                                            type="password"
                                            :counter="8"
                                            required
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        large color="indigo white--text"
                                        @click="sendAuth"
                                        :loading="loading"
                                        :disabled="!valid || loading">
                                    Войти
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        data() {
            return {
                drawer: null,
                valid: false,
                emailAuth: '',
                passAuth: '',
                emailAuthRules: [
                    v => !!v || 'Требуется электронная почта',
                    v => /.+@.+/.test(v) || 'E-mail должен быть действительным'
                ],
                passAuthRules: [
                    v => (v && v.length >= 8) || 'Требуется пароль',
                ],
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading;
            },
            error() {
                return this.$store.getters.error
            },
        },
        methods: {
            closeError() {
                this.$store.dispatch('clearError')
            },
            sendAuth() {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.emailAuth,
                        pass: this.passAuth
                    }
                    this.$store.dispatch('loginUser', user)
                        .then(() => {
                            this.$router.push('/')
                        })
                        .catch(err => {
                        })
                }
            },
        },

        props: {
            source: String
        }
    }
</script>

<style>
    .loader-icon {
        position: absolute;
        top: 0;
        transition: all 0.3s ease;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 111;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.6);
    }
</style>