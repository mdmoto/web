import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import storage from '@/plugins/storage.js'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    navList: [], // 首页快捷导航
    cartNum: storage.getItem('cartNum') || 0,
    // ✅ 关键修改：强制使用本地logo，忽略localStorage中的远程logo
    logoImg: require('@/assets/images/logo2.png'),
    // ✅ 如果您也想固定网站名称，可以这样修改：
    siteName: storage.getItem('siteName') || 'Maollar',
    // ✅ 或者完全固定网站名称：
    // siteName: '您的网站名称',
    hotWordsList: storage.getItem('hotWordsList'),
    category: JSON.parse(localStorage.getItem('category'))
  },
  getters,
  actions,
  mutations
});
