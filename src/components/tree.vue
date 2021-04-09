<template>
  <div class="tsv-tree" :checked="checkedNodes" @click.stop>
    <div class="tsv-input">
      <div class="tagList">
        <el-tag
          :key="ind"
          v-for="(tag, ind) in checkedNodes"
          :closable="true"
          :disable-transitions="false"
          @close="handleTagClose(tag)"
          style="margin-right:3px;margin-bottom:3px;margin-top:3px"
        >
          <template>
            {{ formatTag ? formatTag(tag) : tag.label }}
          </template>
        </el-tag>
        <input
          @click="toggleOption"
          type="text"
          class="input-new-tag"
          v-model="filterText"
          size="small"
        >
        <i @click="clearSelect" class="el-icon-close clear-select-btn"></i>
      </div>
      <!-- <transition name="el-collapse-transition"> -->
      <el-collapse-transition>
        <div class="tsv-select" v-show="showOption">
          <div
            class="tsv-select-container infinite-list"
            :infinite-scroll-immediate="false"
            v-infinite-scroll="load"
          >
            <el-tree
              show-checkbox
              :data="dataAvailable"
              :props="defaultProps"
              node-key="value"
              default-expand-all
              ref="tree"
              @check-change="handleCheckChange"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <template>
                  {{ formatTreeNode ? formatTreeNode(data) : data.label }}
                </template>
              </span>
            </el-tree>
          </div>
        </div>
      </el-collapse-transition>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
// 这里引入会极大增加打包体积
// import Vue from 'vue'
// import { Tag, InfiniteScroll, Tree } from 'element-ui'
// Vue.use(InfiniteScroll)
// Vue.component(Scrollbar.name, Scrollbar)
// Vue.component(Tag.name, Tag)
// Vue.component(Input.name, Input)
// Vue.component(Tree.name, Tree)
import { deepCopy } from '../utils/deepCopy'

export default {
  name: 'tree-select-infinite',
  model: {
    prop: 'checked',
    event: 'change'
  },
  data() {
    return {
      filterText: '',
      checkedNodes: [],
      dataList: [],
      dataAvailable: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      copyData: [],
      showOption: false
    }
  },
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    formatTreeNode: {
      type: Function,
      default: null
    },
    formatTag: {
      type: Function,
      default: null
    },
    filterCheckedNodes: {
      type: Function,
      default: null
    }
  },
  watch: {
    treeData: {
      handler(n, o) {
        this.dataList = deepCopy(this.treeData)
        this.init()
      },
      immediate: true
    },
    checkedNodes: {
      handler(n, o) {
        // this.checkedNodes = n
        this.setTreeCheckedKeys()
      }
    },
    filterText(val) {
      // 找出含有匹配字符串的节点
      function filterChild(arr) {
        return arr.filter(r => {
          if(r.label.indexOf(val) > -1) {
            return true
          }
          if(r.children) {
            const children = filterChild(r.children)
            const hasChildren = children.length > 0
            if (hasChildren) {
              r.children = children
            }
            return hasChildren
          } else {
            return false
          }
        })
      }
      const temp = deepCopy(this.treeData)
      this.dataAvailable = []
      this.dataList = filterChild(temp)
      this.load()
      // 每次输入框发生变化，重新选中多选框
      this.setTreeCheckedKeys()
    }
  },
  methods: {
    init() {
      this.checkedNodes = []
      this.setTreeCheckedKeys()
      this.load()
    },
    load() {
      const item = (this.dataList || []).splice(0, 5)
      this.dataAvailable.push(...item)
    },
    toggleOption() {
      this.showOption = !this.showOption
    },
    setTreeCheckedKeys() {
      // 使用setCheckedNodes会选中失败,使用setCheckedKeys
      const checkedKeys = this.checkedNodes.map(m => m.value)
      if(checkedKeys.length && checkedKeys.length > 0) {
        this.$refs.tree.setCheckedKeys(checkedKeys)
      }
    },
    clearSelect() {
      this.filterText = ''
      this.checkedNodes = []
      this.setTreeCheckedKeys()
    },
    showFilterNodes() {
      const allChecked = this.$refs.tree.getCheckedNodes()
      this.checkedNodes = this.filterCheckedNodes ? this.filterCheckedNodes(allChecked || []) : allChecked
    },
    handleTagClose(tag) {
      const ind = this.checkedNodes.findIndex(f => f.value === tag.value)
      this.checkedNodes.splice(ind, 1)
      this.setTreeCheckedKeys()
      this.emit()
    },
    handleCheckChange(data, isChecked) {
      this.showFilterNodes()
      this.emit()
    },
    emit() {
      this.$emit('change', this.checkedNodes)
    },
    handleOutsideClick() {
      this.showOption = false
    }
  },
  created() {
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
  }
}
</script>

<style scoped>
.tsv-select {
  /* height: 300px; */
  width: 100%;
  opacity: 1;
  position: absolute;
  z-index: 8888;
  /* margin-top: 10px; */
}
.infinite-list {
  height: 250px;
  padding: 10px;
  overflow-y: auto;
}
.input-new-tag {
  display: inline-flex;
  flex: 1;
  width: 100%;
  height: 32px;
  outline: none;
  border: none;
}
.tagList{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 3px 10px;
  box-sizing: border-box;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  position: relative;
}
.clear-select-btn {
  margin-top: -6px;
  position: absolute;
  right: 2px;
  top: 50%;
}
.clear-select-btn:hover {
  cursor: pointer
}
</style>
