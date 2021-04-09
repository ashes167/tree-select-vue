<template>
  <div id="app">
    <tree 
      v-model="checked"
      :treeData="list"
      :filterCheckedNodes="filterCheckedNodes"
      :formatTag="formatTag"
    ></tree>
  </div>
</template>

<script>
import tree from './components/tree.vue'
import { generateData } from './data.js'

export default {
  components: {
    tree
  },
  data() {
    return {
      list: [],
      checked: []
    }
  },
  methods: {
    init(v) {
      this.list = generateData(100)
    },
    filterCheckedNodes(checked) {
      // 只保留level为3的节点
      return checked.filter(c => c.level === 3)
    },
    formatTag(tag) {
      // 格式化展示的tag
      return tag.label + ' - ' + tag.level
    }
  },
  mounted() {
    this.init()
  }
}
</script>
