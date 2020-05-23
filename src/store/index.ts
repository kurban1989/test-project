import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/store/modules/user';
import Auth from '@/store/modules/auth';
import Msg from '@/store/modules/msg';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    User,
    Auth,
    Msg,
  },
});
export default store;
