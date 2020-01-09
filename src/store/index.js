import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accounts: []
  },
  mutations: {
    addAccount(state, account){
      state.accounts.push(account)
    }
  },
  actions: {
  },
  modules: {
  }
})
