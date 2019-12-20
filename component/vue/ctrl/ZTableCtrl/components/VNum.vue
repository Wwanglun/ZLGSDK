<template>
  <div class="number-schema-table">
    <el-input-number class="num-input" :controls="false" v-model.trim="numParam.min" size="medium" @blur="$emit('getNumParam', numParam)" @keyup.enter.native="enterClick"></el-input-number >
    <span class="wave-symbol">~</span>
    <el-input-number class="num-input" :controls="false" v-model.trim="numParam.max" size="medium" @blur="$emit('getNumParam', numParam)" @keyup.enter.native="enterClick"></el-input-number >
    <el-select v-if="unitEnums.units" v-model="numParam.standarunit" size="medium" @change="$emit('getNumParam', numParam)">
      <el-option v-for="(value, key, index) in unitEnums.units || {}" :key="index" :label="key" :value="value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    unitEnums: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      numParam: {
        min: undefined,
        max: undefined,
        standarunit: 1
      }
    }
  },
  created () {
    this.$set(this.numParam, 'standarunit', this.unitEnums && this.unitEnums.units ? this.unitEnums.units[this.unitEnums.standarunit] : 1)
  },
  methods: {
    enterClick () {
      this.$emit('getNumParam', Object.assign({isLoad: true}, this.numParam))
    }
  }
}
</script>

<style lang="less" scoped>
.number-schema-table {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-around;
}
.el-input, .el-select {
  flex: 1;
}
.wave-symbol {
  display: inline-block;
  width: 14px;
  text-align: center;
}
.el-select {
  min-width: 70px;
  .el-input__inner {
    padding-left: 0 !important;
  }
}
.number-schema-table .el-input .el-input__inner {
  padding: 0 !important;
  text-align: left;
}
.number-schema-table .el-select .el-input__inner {
  padding: 0 15px 0 10px !important;
}
</style>
<style lang="less">
.number-schema-table {
  .el-input-number .el-input input {
    width: 100% !important;
    padding: 0 4px !important;
  }
  .el-select .el-input__inner {
    padding-left: 6px !important;
    padding-right: 20px !important;
  }
}
</style>
