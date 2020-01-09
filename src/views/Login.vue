<template>
    <v-container fluid fill-height class="bg">
        <v-row >
            <v-col
                    class="offset-md-1"
                    cols="12"
                    md="4">

                <h1 class="font-weight-bold blue--text">Iniciar sesión</h1>
                <p>Ingresa tu Correo Electrónico y Contraseña</p>
                <v-form v-model="valid">

                    <v-text-field
                            v-model="email"
                            label="Correo electrónico"
                            outlined
                    ></v-text-field>
                    <div class="red--text mb-6" v-if="!$v.email.required">El email es requerido.</div>
                    <div class="red--text mb-6" v-if="!$v.email.email">Ingrese un mail válido.</div>

                    <v-text-field
                            v-model="password"
                            label="Contraseña"
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass ? 'text' : 'password'"
                            @click:append="showPass = !showPass"
                            outlined
                    ></v-text-field>
                    <div class="red--text mb-6" v-if="!$v.password.required">La contraseña es requerido.</div>
                    <div class="red--text mb-6" v-if="!$v.password.minLength">Al menos 8 caracteres.</div>
                    <div class="white--text red mb-5" v-if="error" >Error de autenticación. Se ha ingresado un usuario y/o contraseña incorrecta.</div>

                    <v-btn class="float-right" small rounded color="primary" dark @click="submit">Siguiente</v-btn>

                </v-form>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    import {required, email, minLength} from 'vuelidate/lib/validators';
    import qs from 'qs';
    import axios from 'axios';

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: '',
                info: null,
                valid: null,
                showPass: null,
                error: false
            }
        },
        validations: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8)
            }
        },
        methods: {
            submit() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    axios({
                        method: 'post',
                        url: 'https://reqres.in/api/login',
                        data: qs.stringify({
                            email: this.email,
                            password: this.password
                        }),
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                        }
                    }).then(response => {
                        sessionStorage.Email = this.email;
                        sessionStorage.Token = response.data.token;
                        this.$router.push({name: 'account'});
                    }).catch(e => {
                        this.error = true;
                        this.$refs.form.reset();
                    });
                }
            }
        }
    }
</script>

<style>
    .bg {
        background: url('../assets/img/login-bg.svg') no-repeat ;
        background-size: cover;
        background-color: white;
    }
</style>