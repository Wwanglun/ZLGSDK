<template>
  <div :class="['table-head-ctrl', itemField.prop === iconKey ? 'SVNURI-key' : '']">
    <div class="headerName">
      <span :title="itemField.label" class="head-label text-overflow">{{itemField.label}}</span>
      <span class="table-sort" v-show="itemField.prop !== iconKey && isshowDesc">
        <i :class="{'el-icon-caret-top': true, 'current-checked': sortInfo === 'asc' && sortField === itemField.prop}" @click="AscField"></i>
        <i :class="{'el-icon-caret-bottom': true, 'current-checked': sortInfo === 'desc' && sortField === itemField.prop}" @click="DescField"></i>
      </span>
      <span v-show="configPositon === 'in'" :class="{'bottom-icon': true, 'show-right-btn': isChecked}" @click.stop="getClickPosition($event)">
        <i class="el-icon-caret-bottom"></i>
      </span>
    </div>
    <div v-show="itemField.prop !== iconKey" :class="{'headerVal': true, 'select-enums-table': selectValue.length > 0}">
      <el-input v-if="itemField.type === 'string' && !itemField.enums" size="medium" v-model="inputValue" @blur="selectOption(inputValue)" @keyup.enter.native="selectOption(inputValue, true)"></el-input>
      <el-select class="enums-select" ref="enumsSelect" size="medium" v-if="(itemField.type === 'string' && itemField.enums) || itemField.type === 'array'" multiple collapse-tags v-model="selectValue"  @change="selectOption(selectValue, true, true)">
        <el-option v-for="(item, index) in itemField.enums" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <v-num ref="numSchema" v-if="itemField.type === 'number'" :unitEnums="itemField.unitEnums || {}" @getNumParam="getNumParam"></v-num>
    </div>
  </div>
</template>
<script>
import VNum from './VNum.vue'
export default {
  components: {
    VNum
  },
  props: {
    itemField: {
      type: Object,
      default: () => {}
    },
    sortField: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    },
    showConfig: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    iconKey: {
      type: String,
      default: 'iconKey'
    },
    configPositon: {
      type: String,
      default: 'out'
    },
    isshowDesc: {
      type: Boolean,
      default: false
    },
    moduleName: {
      type: String,
      default: 'now'
    },
    isRealTimeSearch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputValue: '',
      selectValue: [],
      sortInfo: '',
      timer: null,
      isChecked: false
    }
  },
  methods: {
    getClickPosition (e) {
      this.isChecked = true
      this.$emit('getPageOffset', {left: e.pageX, top: e.pageY})
    },
    selectOption (val, method, isSelect) {
      if (!this.isRealTimeSearch && !isSelect) {
        return false
      }
      let filterCondition = {$or: []}
      let $val = (typeof val === 'string' ? val.split('||') : val).filter(v => v !== '')
      $val.forEach(item => {
        let single = {
          [this.itemField.prop]: isSelect ? {item} : {$regex: this.moduleName === 'history' ? this.transferenceStr(item) : item, $options: 'i'}
        }
        filterCondition.$or.push(single)
      })
      this.$emit('selectChange', {condition: filterCondition, schema: this.itemField.prop, isEnter: method})
    },
    getNumParam (val) {
      if (!this.isRealTimeSearch && !val.isLoad) {
        return false
      }
      let filterCondition = {$and: []}
      if (val.max || val.max === 0) {
        let computedValue = typeof val.standarunit === 'string' ? val.max - 0 : val.max * val.standarunit
        filterCondition.$and.push({[this.itemField.prop]: {$lte: computedValue}})
      }
      if (val.min || val.min === 0) {
        let computedValue = typeof val.standarunit === 'string' ? val.min - 0 : val.min * val.standarunit
        filterCondition.$and.push({[this.itemField.prop]: {$gte: computedValue}})
      }
      this.$emit('selectChange', {condition: filterCondition, schema: this.itemField.prop, isEnter: val.isLoad})
    },
    DescField () {
      this.$emit('getDescInfo', {sort: {[this.itemField.prop]: -1}, schema: this.itemField.prop})
      this.sortInfo = 'desc'
    },
    AscField () {
      this.$emit('getDescInfo', {sort: {[this.itemField.prop]: 1}, schema: this.itemField.prop})
      this.sortInfo = 'asc'
    },
    initHead () {
      this.inputValue = ''
      this.selectValue = []
      this.sortInfo = ''
      if (this.itemField.type === 'number' && this.$refs.numSchema) {
        this.$refs.numSchema.numParam = {
          min: undefined,
          max: undefined,
          standarunit: 1
        }
      }
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
  },
  watch: {
    itemField () {
      this.initHead()
    },
    isClear (val) {
      this.initHead()
    },
    showConfig (val) {
      if (!val && this.isChecked) {
        this.isChecked = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.table-head-ctrl {
  width: 100% !important;
}
.headerName {
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  float: left;
  color: #5c5f66;
  border-bottom: 1px solid #D5DDE8;
}
.el-table__fixed-right {
  box-shadow: 0 0 10px rgba(0,0,0,.12) !important;
}
.headerVal {
  height: 40px;
  width: 100%;
  float: left;
  margin-top: 3px;
}
.headerName {
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
  &:hover {
    .bottom-icon {
      display: inline-block;
    }
  }
  .bottom-icon {
    width: 10px;
    height: 44px;
    line-height: 44px;
    position: absolute;
    right: 0;
    top: 0;
    display: none;
    background-color: #e6ebf2;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999999;
    }
  }
  .show-right-btn {
    display: inline-block;
  }
  .head-label {
    max-width: 100%;
    margin-right: -2px;
  }
  .table-sort {
    position: relative;
    width: 28px;
    i {
      width: 14px;
      height: 14px;
      position: absolute;
      left: 6px;
      cursor: pointer;
      z-index: 2;
      color: #C4C4CC;
    }
    .current-checked {
      z-index: 1;
    }
    .el-icon-caret-top {
      top: 10px;
    }
    .el-icon-caret-bottom {
      top: 17px;
    }
  }
}
.el-select {
  width: 100%;
}
.SVNURI-key .bottom-icon {
  height: 89px;
  line-height: 89px;
}
.table-head-ctrl.SVNURI-key .headerName {
  border-bottom: none;
  height: 89px;
  line-height: 89px;
  .head-label {
    height: 100%;
    line-height: 89px;
  }
}
</style>
<style lang="scss" scoped>
@import "../../commonStyle/ZVar.scss";
.current-checked {
  color: $--z-table-title-sort-color !important;
}
</style>

