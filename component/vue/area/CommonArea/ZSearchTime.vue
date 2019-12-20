<template>
  <div>
    <span style="" v-show="showTimeText">时间</span>
    <el-date-picker
      v-model="value"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="center"
      @change="getTime"
      :unlink-panels="true"
      style="width: 380px;"
      size="medium">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    storageTime: {
      type: Array,
      default: () => [] // 本地存储时间
    },
    cleartime: {}, // 是否清空时间
    showTimeText: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一小时',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '当天',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            let years = end.getFullYear()
            let months = end.getMonth()
            let days = end.getDate()
            start.setTime(new Date(years, months, days, 0, 0, 0))
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一周',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * this.currentMonthDays)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * this.threeMonthsDays)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近半年',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * this.halfYearDays)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '近一年',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * this.yearsDays)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value: '',
      monthsDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      currentMonthDays: 30,
      threeMonthsDays: 90,
      halfYearDays: 180,
      yearsDays: 365
    }
  },
  created () {
    this.getDays()
  },
  methods: {
    getTime (val) {
      if (val) {
        this.sendTime(val)
      } else {
        this.$emit('getSearchTime', [])
      }
    },
    sendTime (val) {
      let starttime = parseInt(new Date(val[0]).getTime() / 1000)
      let endtime = parseInt(new Date(val[1]).getTime() / 1000)
      this.$emit('getSearchTime', [starttime, endtime])
    },
    getDays () {
      let date = new Date()
      let M = date.getMonth()
      let Y = date.getFullYear()
      if (((Y % 4 === 0 && Y % 100 !== 0) || Y % 400 === 0)) {
        this.monthsDay[1] = 29
        this.yearsDays = 366
      }
      this.currentMonthDays = this.monthsDay[M]
      this.threeMonthsDays = this.monthsDay[M - 1 < 0 ? M + 11 : M - 1] + this.monthsDay[M - 2 < 0 ? M + 10 : M - 2] + this.monthsDay[M - 3 < 0 ? M + 9 : M - 3]
      this.halfYearDays = this.threeMonthsDays +
        this.monthsDay[M - 4 < 0 ? M + 8 : M - 4] +
        this.monthsDay[M - 5 < 0 ? M + 7 : M - 5] +
        this.monthsDay[M - 6 < 0 ? M + 6 : M - 6]
    }
  },
  watch: {
    storageTime (val) {
      let starttime = new Date(val[0] * 1000)
      let endtime = new Date(val[1] * 1000)
      this.value = [starttime, endtime]
      this.sendTime(this.value)
    },
    cleartime () {
      this.value = ''
      this.$emit('getSearchTime', [])
    }
  }
}
</script>
<style lang="less" scoped>
span {
  color: #606266;
  font-size: 14px;
  margin-right: 6px;
}
</style>
