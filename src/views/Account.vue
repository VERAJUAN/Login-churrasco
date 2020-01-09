<template>


    <v-container>
        <v-row>
            <v-col class="mt-8">
                <HeaderView/>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                    cols="12"
            >
                <h1 class="blue--text">Agregar nueva cuenta</h1>

            </v-col>

            <v-col
                    cols="12"
                    md="6"
                    class="mt-2">


                <v-form
                        ref="form"
                        v-model="valid">

                    <v-text-field
                            v-model="email"
                            label="Email"
                            outlined
                    ></v-text-field>
                    <div class="red--text mb-6" v-if="!$v.email.required">El email es requerido.</div>
                    <div class="red--text mb-6" v-if="!$v.email.email">Ingrese un mail válido.</div>

                    <v-text-field
                            v-model="lastName"
                            label="Apellido"
                            outlined
                    ></v-text-field>
                    <div class="red--text mb-6" v-if="!$v.lastName.required">El apellido es requerido.</div>

                    <v-text-field
                            v-model="firstName"
                            label="Nombre"
                            outlined
                    ></v-text-field>
                    <div class="red--text mb-6" v-if="!$v.firstName.required">El nombre es requerido.</div>
                    {{$v.firstName.required}}

                    <v-text-field
                            v-model="avatar"
                            label="URL Avatar (opcional)"
                            outlined
                    ></v-text-field>
                    <div class="red--text mb-6" v-if="!$v.avatar.url">Url inválida.</div>
                    <div class="white--text red mb-5" v-if="error" >Error al crear cuenta. Campos inválidos</div>

                    <v-btn class="" small rounded color="primary" dark @click.stop="dialog = true">Resetear</v-btn>
                    <v-btn class="float-right" small rounded color="primary" dark @click="addAccount">Guardar</v-btn>

                </v-form>

            </v-col>
            <v-col
                    cols="12"
                    md="6"
                    class="mt-2">
                <v-card
                        class="mx-auto"
                        cols="12"
                        md="6"
                        tile
                >
                    <v-subheader>CUENTAS</v-subheader>
                    <v-list-item two-line v-for="account in accounts">
                        <v-list-item-avatar>
                            <v-img
                                    :src="account.avatar == '' || typeof account.avatar === 'undefined' ? 'avatar-default.png' : account.avatar"
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ account.email }}</v-list-item-title>
                            <v-list-item-subtitle>{{ account.lastName }}, {{ account.firstName }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                </v-card>

            </v-col>
        </v-row>

        <v-row>
            <v-col
                    cols="12"
                    md="4"
                    class="mt-8">
                <FooterView/>
            </v-col>
        </v-row>

        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <v-card>
                <v-card-title class="headline">¿Resetear formulario?</v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                    >
                        Cancelar
                    </v-btn>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="resetForm"
                    >
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>


</template>


<script>
    import HeaderView from "../components/HeaderView";
    import FooterView from "../components/FooterView";
    import {mapState} from 'vuex'
    import {email, required, url} from "vuelidate/lib/validators";

    export default {
        name: 'Account',
        data() {
            return {
                email: '',
                firstName: '',
                lastName: '',
                avatar: '',
                valid: null,
                dialog: false,
                error: false
            }
        },
        validations: {
            email: {
                required,
                email
            },
            firstName: {
                required,
            },
            lastName: {
                required,
            },
            avatar: {
                url
            }
        },
        components: {
            HeaderView,
            FooterView
        },
        computed: {
            ...mapState(['accounts'])
        },
        methods: {
            addAccount() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.$store.commit('addAccount',
                        {
                            email: this.email, firstName: this.firstName,
                            lastName: this.lastName, avatar: this.avatar
                        })
                } else {
                    this.error = true
                }
            },
            resetForm() {
                this.dialog = false
                this.error = false
                this.$refs.form.reset()
            }
        }
    }
</script>