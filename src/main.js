import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

//导入全局样式表
import './assets/css/global.css'

// highlight.js代码高亮指令
import Highlight from './assets/js/highlight';

Vue.use(Highlight);

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
