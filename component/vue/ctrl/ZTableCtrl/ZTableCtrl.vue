<template>
  <div class="z-table-ctrl">
    <el-table v-if="isToggle" border :data="tableData" :empty-text="'暂无数据'" style="width: 100%" @sort-change="sortChange" :default-sort="{prop: 'date', order: 'ascending'}">
      <el-table-column v-if="showIndex" type="index" width="60" label="序号" :index="indexMethod" :fixed="true" align="center"></el-table-column>
      <el-table-column v-for="(item, index) in tableTitle" v-if="item.prop" :key="index" :fixed="item.fixed" :min-width="item.width" :prop="item.prop" align="center">
        <template slot-scope="scope" slot="header">
          <v-cell v-if="customTitle && item.isCustom" :isRealTimeSearch="isRealTimeSearch" :moduleName="moduleName" :itemField="item" :isshowDesc="isshowDesc" :isClear="isClear" :configPositon="configPositon" :showIcon="showIcon" :showConfig="showConfig" :sortField="sortField" :iconKey="iconKey" @getPageOffset="getPageOffset" @getDescInfo="getDescInfo" @selectChange="selectChange"></v-cell>
          <span v-else :title="item.label" class="head-label text-overflow">{{item.label}}</span>
        </template>
        <template slot-scope="scope">
          <i style="cursor: pointer;" v-if="showIcon && item.prop === iconKey" @click="iconEvent(scope.row[item.prop])" :class="icon" ></i>
          <p v-else class="text-overflow" :title="scope.row[item.prop]">{{scope.row[item.prop]}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="showTime" fixed="right" align="center" prop="date" label="时间" width="180" :sortable="moduleName === 'history' ? 'custom' : true">
      </el-table-column>
      <el-table-column v-if="showOperate" prop="" label="操作" :width="operateWidth" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button :icon="v.icon" size="mini" :type="v.type" style="padding: 8px 6px;" :plain="v.plain" @click="v.click(scope)"  v-for="(v, i) in buttonList" :key="i">{{v.text}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table v-show="!isToggle" border :data="tableData" :empty-text="'暂无数据'" style="width: 100%" @sort-change="sortChange" :default-sort="{prop: 'date', order: 'ascending'}">
      <el-table-column v-if="showIndex" type="index" width="60" label="序号" :index="indexMethod" :fixed="true" align="center"></el-table-column>
      <el-table-column v-for="(item, index) in tableTitle" v-if="item.prop" :key="index" :fixed="item.fixed" :min-width="item.width" :prop="item.prop" align="center">
        <template slot-scope="scope" slot="header">
          <v-cell v-if="customTitle && item.isCustom" :isRealTimeSearch="isRealTimeSearch" :moduleName="moduleName" :itemField="item" :isshowDesc="isshowDesc" :isClear="isClear" :configPositon="configPositon" :showIcon="showIcon" :showConfig="showConfig" :sortField="sortField" :iconKey="iconKey" @getPageOffset="getPageOffset" @getDescInfo="getDescInfo" @selectChange="selectChange"></v-cell>
          <span v-else :title="item.label" class="head-label text-overflow">{{item.label}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showTime" fixed="right" align="center" prop="date" label="时间" width="180" :sortable="moduleName === 'history' ? 'custom' : true">
      </el-table-column>
      <el-table-column v-if="showOperate" prop="" label="操作" :width="operateWidth" align="center" fixed="right">
      </el-table-column>
    </el-table>
    <div class="pagenation-table" v-if="showPage">
      <el-pagination :total='total' :page-sizes="sizes" :page-size="size" :current-page="currentPage"  @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
    <i v-show="showTableConfig && customTitle && configPositon === 'out'" class="el-icon-caret-bottom" @click.stop="showConfig = true"></i>
    <v-schema :showConfig="showConfig" :moduleName="moduleName" :isCustomConfigTitle="showTableConfig" :selectValueInfo="selectValueInfo" :configPositon="configPositon" @getConfigVisible="getConfigVisible" :allTitle="allTitle" @getTableTitle="getTableTitle" :left="left" :top="top"></v-schema>
  </div>
</template>
<script>
import VCell from './components/VCell.vue'
import VSchema from './components/VSchema.vue'
export default {
  props: {
    allTitle: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    buttonList: {
      type: Array,
      default: () => []
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    showOperate: {
      type: Boolean,
      default: false
    },
    operateWidth: {
      type: Number,
      default: 120
    },
    icon: {
      type: String,
      default: 'el-icon-document'
    },
    iconKey: {
      type: String,
      default: 'inconKey'
    },
    iconEvent: {
      type: Function
    },
    showPage: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    },
    sizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50, 100]
    },
    customTitle: {
      type: Boolean,
      default: false
    },
    isshowDesc: {
      type: Boolean,
      default: false
    },
    configPositon: {
      type: String,
      default: 'out'
    },
    storageConfig: {
      type: Array,
      default: () => []
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    showTableConfig: {
      type: Boolean,
      default: true
    },
    showTime: {
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
    },
    selectValueInfo: {
      type: Object,
      default: () => {
        return {devtype: 'zlg_cloud_area', devid: 'zlg_test'}
      }
    },
    isToggle: {
      type: Boolean,
      default: true
    }
  },
  components: {
    VCell,
    VSchema
  },
  created () {
    this.tableTitle = this.allTitle
    // this.fixedWidth = this.tableTitle.filter(v => v.fixed).map(v => Number(v.width.slice(0, -2))).reduce((a, b) => a + b)
  },
  data () {
    return {
      fixedWidth: 0,
      width: 0,
      size: 10,
      currentPage: 1,
      sortField: '',
      allFilter: [],
      isClear: false,
      showConfig: false,
      tableTitle: [],
      left: 0,
      top: 0,
      isDesc: true
    }
  },
  methods: {
    sortChange (val) {
      if (this.total > 10) {
        this.isDesc = val.order === 'descending'
        this.$emit('getSort', this.isDesc)
      }
    },
    indexMethod (index) {
      return (this.currentPage - 1) * this.size + index + 1
    },
    getStorageConfig (config) {
      this.$emit('getStorageConfig', config)
    },
    getPageOffset (offset) {
      this.showConfig = true
      this.left = offset.left
      this.top = offset.top + 16
    },
    getDescInfo (info) {
      this.sortField = info.schema
      this.$emit('getDesc', info.sort)
    },
    selectChange (val) {
      let $index = this.allFilter.findIndex(v => (v.$or || v.$and)[0][val.schema] !== undefined)
      if ($index > -1) {
        if ((val.condition.$or || val.condition.$and).length > 0) {
          this.allFilter.splice($index, 1, val.condition)
        } else {
          this.allFilter.splice($index, 1)
        }
      } else if ((val.condition.$or || val.condition.$and).length > 0) {
        this.allFilter.push(val.condition)
      }
      this.currentPage = 1
      this.$emit('getFilter', {filter: {$and: this.allFilter}, isEnter: val.isEnter})
    },
    getConfigVisible (val) {
      this.showConfig = val
    },
    handleSizeChange (size) {
      this.size = size
      let totalPage = Math.ceil(this.total / this.size)
      if (this.currentPage > totalPage) {
        this.currentPage = totalPage
      }
      this.$emit('changeSize', size)
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.$emit('changePage', page)
    },
    getTableTitle (title) {
      this.tableTitle = title
      this.$emit('getCustomTitle', title)
    }
  },
  mounted () {
    const node = document.querySelector('.z-table-ctrl')
    if (node) {
      this.width = node.offsetWidth
    }
  },
  computed: {
    getAdaptWidth () {
      let isAdapt = this.fixedWidth < this.width
      return isAdapt
    }
  },
  watch: {
    tableTitle (val) {
      this.isClear = !this.isClear
      this.allFilter = []
      let fixedTitle = this.tableTitle.filter(v => v.fixed)
      this.fixedWidth = fixedTitle.length > 0 ? fixedTitle.map(v => Number(v.width.slice(0, -2))).reduce((a, b) => a + b) : 0
    }
  }
}
</script>
<style lang="scss">
@import "../commonStyle/ZVar.scss";
.pagenation-table {
  text-align: $--z-table-page-align;
  margin-top: 10px;
}
.z-table-ctrl {
  position: relative;
  background-color: #fff;
  .el-table--border, .el-table--border th, .el-table--border td {
    border-color: $--z-table-border-color;
  }
  .el-icon-caret-bottom {
    position: absolute;
    top: 3px;
    left: 5px;
    color: $--z-table-config-font-color;
    z-index: 99;
    cursor: pointer;
    &:hover {
      color: $--z-color-primary;
    }
  }
  .head-label {
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }
}
.z-table-ctrl .el-table th {
  background-color: $--z-table-title-color !important;
}
.z-table-ctrl .el-table th div {
  padding: 0 !important;
}
.z-table-ctrl .el-table th .headerVal {
  padding: 0 $--z-table-title-padding !important;
}
.el-table--border th:first-child .cell {
  text-align: center;
}
.z-table-ctrl .el-table thead th  {
  padding: 0 !important;
}
.z-table-ctrl .el-table--border th:first-child .cell, .z-table-ctrl .el-table--border td:first-child .cell {
  padding-left: 0 !important;
}
.z-table-ctrl .el-input-number.is-without-controls .el-input__inner {
  text-align: left;
}
.el-select__tags {
  left: 0px;
  text-align: left;
}
.text-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
