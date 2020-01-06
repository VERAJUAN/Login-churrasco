<template>
  <v-app>
<Login/>
      <Account/>
     <v-content>
       <v-flex xs12>


       </v-flex>
     </v-content>
  </v-app>
</template>

<script>
import Login from './views/Login';
import Account from './views/Account';

export default {
  name: 'App',

  components: {
    Login,
    Account
  },

  data: () => ({
    //
  }),
};
</script>
