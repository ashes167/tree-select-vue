<template>
  <div class="tsv-tree">
    <div class="tsv-input">
      <el-input
        v-model="selected"
        placeholder="请选择"
      >
      </el-input>

      <div class="tsv-select">
        <div
          class="tsv-select-container infinite-list"
          v-infinite-scroll="load"
        >
          <el-tree
            show-checkbox
            :data="dataAvailable"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree">
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Input, Tag, Scrollbar, InfiniteScroll, Tree } from 'element-ui'

Vue.use(InfiniteScroll)
Vue.component(Scrollbar.name, Scrollbar)
Vue.component(Tag.name, Tag)
Vue.component(Input.name, Input)
Vue.component(Tree.name, Tree)

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: '',
      dataAvailable: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.dataAvailable = (this.data || []).splice(0, 5)
  },
  methods: {
    load () {
      const item = (this.data || []).splice(0, 5)
      this.dataAvailable = this.dataAvailable.concat(item)
    },
    filterNode() {

    }
  }
}
</script>

<style scoped>
.infinite-list {
  height: 250px;
  overflow-y: auto;
}
</style>
