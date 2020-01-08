<template>
    <v-container>

    <HeaderView/>
    <FooterView/>

    </v-container>

</template>


<script>
    import HeaderView from "../components/HeaderView";
    import FooterView from "../components/FooterView";

    export default {
        name: 'Account',

        components: {
            HeaderView,
            FooterView
        },
    }
</script>