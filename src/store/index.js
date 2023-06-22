import { createStore } from "vuex";


import loginModule from './modules/auth/login/index.js';
import registerModule from './modules/auth/register/index.js';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: loginModule,
    register: registerModule
  },
});
