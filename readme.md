# tree-select-vue

> vue2.X  Element 

## 说明
支持无限滚动、多级菜单、多选以及前端搜索的```tree-select```组件

## 使用方式
**注意⚠️:组件依赖于element-ui(版本需大于10.X)** <br/>

1、在src/components目录中找到```tree.vue```，复制到自己的项目中，然后引用，可以根据自己的需求自由更改。<br />
2、```npm install tree-select-infinite```
  >>> demo.vue
  ```
    <template>
      <div>
        <tree-select-infinite
          :treeData="list"
          v-model="value"
        ></tree-select-infinite>
      </div>
    </template>

    <script>
    import treeSelectInfinite from 'tree-select-infinite'
    export default {
      name: 'demo',
      components: {
        treeSelectInfinite
      },
      data() {
        return {
          list: [],
          value: ''
        }
      }
  ```
  >>> main.js
  ```
  import ElementUI from 'element-ui' //element-ui的全部组件
  import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
  Vue.use(ElementUI)
  ```


## 本地查看

1. ```git clone https://github.com/ashes167/tree-select-vue.git``` <br/>
2. ```cd tree-select-vue```
3. ```npm install```
4. ```npm run dev```
5. 构建：```npm run build```
