<template>
  <div id="app">
    <tree :data="data"></tree>
  </div>
</template>

<script>
import tree from './components/tree.vue'

export default {
  components: {
    tree
  },
  data() {
    const item = {
      id: 1,
      label: 1,
      value: 1,
      children: [
        {
          id: 2,
          label: 2,
          value: 2
        }
      ]
    }
    let data = []
    for (let i = 0; i < 1000; i++) {
      data.push(item)
    }
    return {
      data
    }
  }
}
</script>
