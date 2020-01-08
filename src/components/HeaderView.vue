<template>

    <v-app-bar
            app
            color="blue"
            dark
    >
        <v-row>
    <v-col
    cols="4"
    class="justify-end">
        {{ email }} | <a @click="logout" class="white--text">Cerrar sesión</a>
    </v-col>
</v-row>

    </v-app-bar>

</template>

<script>
    export default {
        name: 'HeaderView',
        data(){
            return{
                email: sessionStorage.Email
            }
        },
        methods: {
            logout(){
                sessionStorage.clear();
                this.$router.push({ name: 'login' });
            }
        }
    }
</script>