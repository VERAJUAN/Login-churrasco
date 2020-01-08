<template>

<v-form v-model="valid">
    <v-container>
        <v-row>
            <v-col
            cols="12"
            md="4">
                <v-text-field
                        v-model="email"
                        label="Correo electrónico"
                        outlined
                >

                </v-text-field>
                <v-text-field
                        v-model="password"
                        label="Contraseña"
                        outlined
                >

                </v-text-field>

                <v-btn class="float-right" small rounded color="primary" dark @click="submit">Siguiente</v-btn>
            </v-col>
        </v-row>


    <!--   <v-navigation-drawer
                absolute
                src="../assets/img/login-bg.svg"
                width="100%"
                permanent
        >        </v-navigation-drawer>-->




    </v-container>
</v-form>
</template>

<script>
    import { required, email, minLength } from 'vuelidate/lib/validators';
    import qs from 'qs';
    import axios from 'axios';

    export default {
        name: 'Login',
        data(){
            return{
                email: '',
                password: '',
                info: null,
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
            submit(){
                this.$v.$touch()
                if(!this.$v.$invalid){
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
                        this.$router.push({ name: 'account' });
                    })
                        .catch(e => {
                            console.log("e")
                        });

                }else{
                    console.log("formulario invalid")
                }
            }
        }
    }
</script>