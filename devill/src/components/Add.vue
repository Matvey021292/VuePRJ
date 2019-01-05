<template>
    <v-container class="mt-2">
        <v-card class="elevation-0">
            <div class="text-xs-center loader-icon" v-if="loading">
                <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </div>
            <v-toolbar dark color="error" class="elevation-1">
                <i class="material-icons">
                    add
                </i>
                <v-toolbar-title>
                    Добавить запись
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                </v-tooltip>

            </v-toolbar>
            <v-card-text>
                <v-form class="text-sm-right" ref="form" v-model="valid">
                    <v-text-field prepend-icon="keyboard_capslock"
                                  name="service"
                                  v-model="service"
                                  label="Наименование сервиса"
                                  type="text"
                    ></v-text-field>
                    <v-text-field id="password"
                                  prepend-icon="lock"
                                  v-model="pass"
                                  name="password"
                                  label="Пароль"
                                  type="text"
                    ></v-text-field>
                    <v-text-field id="login"
                                  prepend-icon="person"
                                  v-model="login"
                                  name="login"
                                  label="Логин"
                                  type="text"
                    ></v-text-field>
                    <v-text-field id="email"
                                  prepend-icon="email"
                                  name="email"
                                  v-model="email"
                                  label="Email"
                                  type="text"
                    ></v-text-field>
                    <input ref="fileInputUpload" @change="fileUpload" type="file" accept="image/*" class="d-none">
                    <img :loading="loading" class="d-block ma-auto mb-4" width="80%" :src="imageSrc" v-if="imageSrc">
                    <v-btn
                            @click="triggerUpload"
                            color="indigo"
                            block
                            class="white--text ml-0 mr-0 mt-0 mb-0"
                            large
                            :loading="loading"
                    >
                        Загрузить
                        <v-icon right dark>cloud_upload</v-icon>
                    </v-btn>

                </v-form>
                <v-card-actions class="pl-0 pr-0 mt-2">
                    <v-btn block large
                           color="error white--text"
                           @click="savePost"
                           large
                           :loading="loading"
                    >
                        <i class="material-icons mr-2">
                            save
                        </i>
                        Сохранить
                    </v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }

    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>


<script>
    export default {
        data() {
            return {
                service: '',
                pass: '',
                login: '',
                email: '',
                image: null,
                imageSrc: '',
                valid: false

            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading;
            },
        },
        methods: {
            triggerUpload() {
                this.$refs.fileInputUpload.click()
            },
            fileUpload(event) {
                const file = event.target.files[0];
                const reader = new FileReader()
                reader.onload = e => {
                    this.imageSrc = reader.result
                }
                reader.readAsDataURL(file)
                this.image = file

            },
            savePost() {
                const onePost = {
                    service: this.service || '',
                    pass: this.pass || '',
                    login: this.login || '',
                    email: this.email || '',
                    image: this.image || "https://itc.ua/wp-content/uploads/2018/01/GooglePay_Lockup.max_1000x1000.0.png"
                }
                this.$store.dispatch('createPost', onePost)
                    .then(() => {
                        this.$refs.form.reset()
                        this.imageSrc = '';
                        this.$router.push('/')
                    }).catch(() => {
                })
            }
        },
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