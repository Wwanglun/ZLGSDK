<template>
  <div class="type">
    <el-input style="width: 260px;margin-right: 2px;" :disabled="disabled" :placeholder="placeholder" v-model="searchValue" clearable size="medium" @keyup.enter.native="search"></el-input>
    <el-button type="primary" plain @click="search" :disabled="disabled">{{$t(`public.search`)}}</el-button>
  </div>
  <!-- 注：所有搜索内容都需要点击搜索按钮才能执行搜索操作 -->
</template>
<script>
import {debounce} from '../../js/data/util/utils.js'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    }
  },
  data () {
    return {
      searchValue: '',
      func: null
    }
  },
  created () {
    this.func = debounce(this.outPut, 200)
  },
  methods: {
    search () {
      this.func(this.searchValue)
    },
    outPut (val) {
      this.$emit('search', val)
    }
  }
}
</script>
