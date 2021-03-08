<template>
  <div id="app">
    <tree 
      v-model="checked"
      :treeData="list"
      :filterCheckedNodes="filterCheckedNodes"
      :formatTreeNode="formatTreeNode"
      :formatTag="formatTag"
    ></tree>
  </div>
</template>

<script>
import tree from './components/tree.vue'
import data from './data.json'

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
      this.list = data
    },
    filterCheckedNodes(checked) {
      // 可以过滤checked
      return checked
    },
    formatTag(tag) {
      // 格式化展示的tag
      return tag.label + ' - ' + tag.level
    },
    formatTreeNode(node) {
      // 格式化展示的tree node
      return node.label + ' ' + node.value
    }
  },
  mounted() {
    this.init()
  }
}
</script>
