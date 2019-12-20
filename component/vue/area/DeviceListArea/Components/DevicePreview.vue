<template>
  <div class="device-preview">
    <el-row>
        <div class='left'>
          <div class='summary' ref="rightMap">
            <div class='select-user mini-header'>
              <p class='title'>设备概况</p>
            </div>
            <div class='show-map clearfix' :style="{maxWidth: maxWidth + 'px'}">
              <div class='left-map'>
                <div :id="`stateCircle${id}`" :style="{width: '400px', height: '220px', margin: '10px 0 0 10px'}"></div>
                <div class="device-rate">
                  <span>
                    <i>{{this.rate}}</i>%</span>
                  <p class="line"></p>
                  <span>在线率</span>
                </div>
                <ul class="map-items" style="padding-top: 50px;">
                  <li>设备总数：
                    <span>{{stateData[0].value + stateData[1].value + stateData[2].value}}</span>
                  </li>
                  <li v-for="(item, index) in stateData" :key="index">{{item.name}}：
                    <span>{{item.value}}</span>
                  </li>
                </ul>
              </div>
              <div class='right-map' :style="rightMapStyle">
              <!-- <div class='right-map'> -->
                <div :id='`seriesCircleId${id}`' :style="{width: '466px', height: '220px', margin: '10px 0 0 10px'}"></div>
                <div class="device-type">
                  <span>{{seriesData.length}}</span>
                  <i>类</i>
                  <p class="line"></p>
                  <span>设备类型</span>
                </div>
                <template v-if="showTypeList">
                  <ul class="map-items" v-for="count in showTypeList" :key="count">
                    <template v-for="(item, index) in seriesData">
                      <li v-if="index <= (colNum * count - 1) && index >= ((count - 1) * colNum)" :key="index" :title="`${item.name}：${item.value}`" class="clearfix">
                        <span class="typeListLeft">{{item.name}}</span>
                        <span class="typeListCenter">：</span>
                        <span class="typeListRight">{{item.value}}</span>
                      </li>
                    </template>
                  </ul>
                </template>
              </div>
            </div>
          </div>
        </div>
      </el-row>
  </div>
</template>
<script>
/* import {colors} from '@/assets/js/common/utils.js' */
import {colors} from '../js/data/utils.js'
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'devicePreview',
  props: {
    seriesData: {
      type: Array,
      required: true
    },
    stateData: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    rate () {
      if (this.stateData.length < 1) {
        return 0
      }
      let total = this.stateData.reduce((total, item) => {
        return total + item.value
      }, 0)
      let rate = 0
      if (total !== 0) {
        rate = ((this.stateData[0].value + this.stateData[1].value) / total * 100).toFixed(0)
      }
      return rate
    },
    showTypeList () {
      let showTypeList = []
      for (let i = 1; i <= this.seriesDataLength; i++) {
        showTypeList.push(i)
      }
      return showTypeList
    },
    rightMapStyle () {
      if (this.seriesDataLength) {
        return {minWidth: (this.seriesDataLength * 220 + 340) + 'px'}
      } else {
        return {}
      }
    }
  },
  mounted () {
    this.drawSeriesCircle(this.seriesData)
    this.drawStateCircle(this.stateData)
    this.maxWidth = this.$refs.rightMap && this.$refs.rightMap.clientWidth
  },
  data () {
    return {
      colNum: 6,
      maxWidth: 0,
      seriesCircle: null,
      stateCircle: null,
      seriesDataLength: this.seriesData ? (this.seriesData.length % this.colNum == 0 ? this.seriesData.length / this.colNum : (Math.round(this.seriesData.length / this.colNum) + 1)) : 0
    }
  },
  methods: {
    seteEchartsOptions (object) {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        color: object.seriesColor || [],
        series: [
          {
            name: object.seriesName || '默认',
            type: object.seriesType || 'pie',
            radius: object.seriesRadius || ['50%', '60%'],
            avoidLabelOverlap: false,
            data: object.seriesData.map(value => {
              return {...value, label: {show: value.value !== 0}, labelLine: {show: value.value !== 0}}
            }) || [],
            selectedMode: 'single',
            labelLine: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              color: function (params) {
                // 自定义颜色
                return object.seriesColor[params.dataIndex]
              }
            }
          }
        ]
      }
    },
    drawSeriesCircle (seriesData) {
      this.seriesDataLength = seriesData.length % this.colNum == 0 ? seriesData.length / 4 : Math.ceil(seriesData.length / this.colNum)
      this.seriesCircle = echarts.init(
        document.getElementById(`seriesCircleId${this.id}`),
        'light'
      )
      let options = {
        color: colors,
        seriesColor: colors,
        seriesName: '设备分类',
        seriesType: 'pie',
        seriesData: seriesData.length ? seriesData : [{name: '', value: 0}]
      }
      this.seriesCircle.setOption(this.seteEchartsOptions(options), true)
    },
    drawStateCircle (stateData) {
      this.stateCircle = echarts.init(
        document.getElementById(`stateCircle${this.id}`),
        'light'
      )
      let options = {
        color: ['#65C13C', '#F56C6C', '#c6ccd1'],
        seriesColor: ['#65C13C', '#F56C6C', '#c6ccd1'],
        seriesName: '设备概况',
        seriesType: 'pie',
        seriesData: stateData
      }
      this.stateCircle.setOption(this.seteEchartsOptions(options), true)
    }
  },
  updated () {
    this.drawSeriesCircle(this.seriesData)
    this.drawStateCircle(this.stateData)
  },
  watch: {
    'seriesData': {
      handler: function (newVal) {
        this.drawSeriesCircle(newVal)
      },
      deep: true
    },
    'stateData': {
      handler: function (newVal) {
        this.drawStateCircle(newVal)
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.device-preview {
    margin-bottom: 6px;
    overflow: hidden;
    background-color: #fff;
    .map-items {
      padding-top: 14px;
      background-color: #f5f7fa;
    }
    .left {
      // border: 1px solid #DEE4EF;
      width: 100%;
      float: left;
      box-sizing: border-box;
      padding-right: 14px;
      padding-left: 14px;
      .summary {
        background-color: #ffffff;
        overflow-x: auto;
        overflow-y: hidden;
        .select-user {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          .title {
            float: left;
          }
          .right-icon {
            line-height: 40px;
            margin-right: 20px;
            float: right;
            margin-top: -4px;
          }
          .select-box {
            margin-left: 31%;
            display: inline-block;
            .label {
              font-size: 14px;
            }
          }
        }
        .show-map {
          display: flex;
          flex-direction: row;
          width: 100%; 
          margin-top: 34px;
          box-sizing: border-box;
          .left-map {
            width: 50%;
            max-width: 480px;
            min-width: 536px;
            display: flex;
            margin: 12px 14px 12px 0;
            background-color: #f5f7fa;
            position: relative;
            .device-rate {
              color: #6c6e72;
              display: inline-block;
              width: 64px;
              height: 100px;
              position: absolute;
              left: 178px;
              top: 100px;
              text-align: center;
              font-size: 12px;
              span {
                &:nth-child(1) {
                  font-size: 12px;
                  color: #6c6e72;
                  i {
                    font-size: 20px;
                    color: #2196f3;
                    display: inline-block;
                    margin-right: 4px;
                  }
                }
              }
              p {
                display: inline-block;
                border-top: 2px solid #c9c9c9;
                // margin: 6px 0;
                margin-bottom: 4px;
                width: 100%;
              }
            }
            .map-items {
              max-width: 220px;
              flex: 1;
              line-height: 30px;
              font-size: 14px;
              color: #6c6e72;
              li {
                span {
                  color: #3e3a39;
                  font-size: 18px;
                }
              }
            }
          }
          .right-map {
            min-width: 850px;
            flex: 1;
            display: flex;
            width: 60%;
            position: relative;
            margin: 12px 0 12px 0;
            box-sizing: border-box;
            background-color: #f5f7fa;
            .device-type {
              display: inline-block;
              width: 60px;
              height: 100px;
              position: absolute;
              left: 212px;
              top: 100px;
              text-align: center;
              font-size: 12px;
              color: #6c6e72;
              span {
                &:nth-child(1) {
                  font-size: 20px;
                  color: #2196f3;
                  display: inline-block;
                  // margin-right: 4px;
                }
              }
              i {
                font-size: 12px;
                color: #6c6e72;
              }
              p {
                display: inline-block;
                border-top: 2px solid #c9c9c9;
                margin-bottom: 4px;
                width: 100%;
              }
            }
            .map-items {
              flex: 1;
              line-height: 30px;
              font-size: 14px;
              color: #6c6e72;
              margin-left: 20px;
              max-width: 200px;
              &:last-child {
                padding-right: 14px;
              }
              li {
                width: 220px;
                .typeListLeft {
                  text-align: left;
                  max-width: 180px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  font-size: 14px;
                  float: left;
                }
                .typeListCenter {
                  float: left;
                }
                .typeListRight {
                  float: left;
                }
                span {
                  color: #3e3a39;
                  font-size: 18px;
                }
              }
            }
          }
        }
      }
    }
    .right {
      width: 30%;
      margin-top: 10px;
      float: right;
      padding-right: 10px;
      box-sizing: border-box;
      .subuser {
        box-sizing: border-box;
        overflow: hidden;
        .sub-user {
          background-color: #ccc;
          cursor: pointer;
          height: 40px;
          font-size: 14px;
          border-bottom: 1px solid #c0c0c0;
          line-height: 40px;
          padding-left: 20px;
          p {
            float: left;
          }
          .right-icon {
            float: right;
            line-height: 40px;
            margin-right: 20px;
            cursor: pointer;
          }
        }
        .user-list {
          height: 240px;
          box-sizing: border-box;
          li {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ccc;
            .list-num {
              width: 50px;
              display: inline-block;
              text-align: center;
              background-color: #f4f4f4;
            }
            .list-user {
              width: 430px;
              box-sizing: border-box;
              padding-left: 20px;
            }
          }
        }
      }
    }
  }
</style>
