<template>
  <div class="z-search-ctrl">
    <el-input  :placeholder="inputPlaceholder" v-model="input" :size="size" :clearable="clearable" @keyup.enter.native="search">
      <el-select v-if="showBeforeSelect" v-model="select" slot="prepend" :placeholder="selectPlaceholder">
        <el-option :label="item.label" :value="item.value" v-for="(item, index) in selectOptions" :key="index"></el-option>
      </el-select>
      <el-button v-if="showIcon" :slot="iconPosi" :icon="icon" @click="search"></el-button>
    </el-input>
    <el-button :size="size" @click="search" v-if="showBtn" class="search-btn" type="primary">{{btnText}}</el-button>
  </div>
</template>
<script>
export default {
  props: {
    showBtn: {
      type: Boolean,
      default: true
    },
    btnText: {
      type: String,
      default: '搜索'
    },
    icon: {
      type: String,
      default: 'el-icon-search'
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    showBeforeSelect: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String,
      default: 'prepend'
    },
    selectOptions: {
      type: Array,
      default: () => []
    },
    selectPlaceholder: {
      type: String,
      default: '请选择'
    },
    inputPlaceholder: {
      type: String,
      default: '请输入'
    },
    size: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      select: '',
      input: ''
    }
  },
  computed: {
    iconPosi () {
      return this.showBeforeSelect ? 'append' : this.iconPosition
    }
  },
  methods: {
    search () {
      let filter = {$regex: this.transferenceStr(this.input), $options: 'i'}
      this.$emit('getFilter', filter)
    },
    transferenceStr (str) {
      if (typeof str !== 'string') {
        return str
      }
      // eslint-disable-next-line
      let regex = new RegExp("[*'.?+$^\\[\\](){}|/%@!#\\\\]", 'gim')
      let $str = str.replace(regex, '\\$&')
      return $str.replace(/^\s+|\s+$/g, '')
    }
  }
}
</script>
<style lang="scss" scoped>
// @import "./commonStyle/ZVar.scss";
.z-search-ctrl {
  display: flex;
  .search-btn {
    margin-left: 8px;
  }
}
</style>

<style>
.z-search-ctrl .el-select .el-input {
  width: 130px !important;
}
</style>
