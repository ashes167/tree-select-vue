import Vue from 'vue'
import App from './App.vue'
import { Tag, InfiniteScroll, Tree } from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
 
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(InfiniteScroll)
Vue.use(Tag)
Vue.use(Tree)

new Vue({
  el: '#app',
  render: h => h(App)
})
