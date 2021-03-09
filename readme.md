# tree-select-vue

## 说明
支持无限滚动、多级菜单、多选以及前端搜索的```tree-select```组件 <br/>
![image](https://github.com/ashes167/tree-select-vue/blob/master/screenshot.gif)

## 使用方式
**注意⚠️:组件依赖于element-ui(版本需大于2.9.2)** <br/>

1、在src/components目录中找到```tree.vue```，复制到自己的项目中，然后引用，可以根据自己的需求自由更改。<br />
2、```npm install tree-select-infinite```
  > demo.vue
  ```
    <template>
      <div>
        <tree-select-infinite
          :treeData="list"
          v-model="value"
        ></tree-select-infinite>
      </div>
    </template>
    ```

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
  > main.js
  ```
  import ElementUI from 'element-ui' //element-ui的全部组件
  import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
  Vue.use(ElementUI)
  ```
3、传值
 prop | example | type | 说明
| :----:| :----: | :----: | :----: |
| treeData | {value: 1, label: '1-1', children: [{value: 2, label: '2-1'}]} | Array | 传入的数据源 |
| filterCheckedNodes | (checked) => checked.filter(f => f.level > 2) | Function | 过滤输入框内展示的tag,如只level大于2的tag |
| formatTag | (tag) => tag.label + ' - ' + tag.level | Function | 格式化展示的tag |
| formatTreeNode | (node) => node.label + ' ' + node.value | Function | 格式化展示的tree node



## 本地查看

1. ```git clone 项目地址``` <br/>
2. ```cd tree-select-vue```
3. ```npm install```
4. ```npm run dev```
5. 构建：```npm run build```

  ```