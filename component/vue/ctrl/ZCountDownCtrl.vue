<template>
  <div :class="{'z-countDown-ctrl': true, 'label-horizontal': !vertical}">
    <div class="z-countDown-label">{{label}}</div>
    <div :class="{'z-countDown-time': true, 'medium-size': size === 'medium', 'small-size': size === 'small', 'mini-size': size === 'mini'}">
      <div class="time-format" v-for="(item, index) in timeFormat" :key="index">
        <span class="time-content" v-if="!split" :style="{backgroundColor: timeBGC, color: timeColor}">{{item.times}}</span>
        <span class="time-content" :style="{'margin-right': split ? '4px' : 0}" v-if="split" v-for="(v, i) in item.times" :key="i">{{v}}</span>
        <span class="time-label" v-if="showTimeLabel">{{item.label}}</span>
        <span class="time-symbol" v-if="!showTimeLabel" v-show="index !== timeFormat.length - 1">{{item.label === '天' ? '-' : ':'}}</span>
      </div>
    </div>
    <div class="z-countDown-endtime" v-show="showEndTime">(截止时间：{{endTime}})</div>
  </div>
</template>
<script>
import ZVar from './commonStyle/ZVar.scss'
export default {
  props: {
    vertical: {
      type: Boolean,
      default: true
    },
    split: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '距离截止还剩：'
    },
    showTimeLabel: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    endTimestamp: {
      type: Number,
      default: new Date() - 0 + 3600
    },
    showMs: {
      type: Boolean,
      default: false
    },
    showEndTime: {
      type: Boolean,
      default: false
    },
    timeBGC: {
      type: String,
      default: '#000'
    },
    timeColor: {
      type: String,
      default: '#fff'
    }
  },
  data () {
    return {
      timer: null,
      timeFormat: [
        {times: '00', label: '时'},
        {times: '00', label: '分'},
        {times: '00', label: '秒'}
      ],
      endTime: ''
    }
  },
  created () {
    this.antitime()
    if (this.showEndTime) {
      this.endTime = this.timestampToTime(this.endTimestamp)
    }
  },
  methods: {
    antitime () {
      this.timer = setInterval(() => {
        let startTimestamp = new Date() - 0
        // let endTimestamp = new Date (2019, 10, 21, 15, 17, 0) - 0
        let deltaTime = this.endTimestamp - startTimestamp
        if (deltaTime <= 0) {
          this.timeFormat = [
            {times: '00', label: '时'},
            {times: '00', label: '分'},
            {times: '00', label: '秒'}
          ]
          if (this.showMs) {
            this.timeFormat.push({times: '000', label: '毫秒'})
          }
          window.clearInterval(this.timer)
          this.$emit('endCountDown')
          return
        }
        this.timeFormat = []
        let Dnum = Math.floor(deltaTime / (24 * 60 * 60 * 1000))
        let singleD = {times: Dnum + '', label: '天'}
        if (Dnum > 0) {
          this.timeFormat.push(singleD)
        }
        let singleH = {times: this.addZero((Math.floor(deltaTime / (60 * 60 * 1000))) % 24), label: '时'}
        this.timeFormat.push(singleH)
        let singleM = {times: this.addZero((Math.floor(deltaTime / (60 * 1000))) % 60), label: '分'}
        this.timeFormat.push(singleM)
        let singleS = {times: this.addZero((Math.floor(deltaTime / 1000 % 60)) % 60), label: '秒'}
        this.timeFormat.push(singleS)
        if (this.showMs) {
          let ms = Math.floor(deltaTime % 1000)
          ms = ms < 10 ? '00' + ms : ms < 100 ? '0' + ms : ms + ''
          let singleMS = {times: ms, label: '毫秒'}
          this.timeFormat.push(singleMS)
        }
      }, this.showMs ? 303 : 1000)
    },
    addZero (m) {
      return m < 10 ? '0' + m : m + ''
    },
    timestampToTime (timestamp) {
      let date = 0
      if ((timestamp + '').length == 10) {
        date = new Date(timestamp * 1000)
      } else {
        date = new Date(timestamp)
      }
      const Y = date.getFullYear() + '-'
      const M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      const D =
        date.getDate() < 10
          ? '0' + date.getDate() + '  '
          : date.getDate() + '  '
      const H =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ':'
      const Minute =
        (date.getMinutes() < 10
          ? '0' + date.getMinutes()
          : date.getMinutes()) + ':'
      const S =
        date.getSeconds() < 10
          ? '0' + date.getSeconds()
          : date.getSeconds()
      return Y + M + D + H + Minute + S
    }
  },
  beforeDestroy () {
    this.timer && window.clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
@import './commonStyle/ZVar.scss';
.z-countDown-ctrl {
  display: inline-block;
  text-align: center;
  padding: 0 20px;
  .z-countDown-label {
    height: 30px;
    line-height: 30px;
    color: $--z-color-text-four;
    font-size: $--z-size-text--third;
  }
  .z-countDown-time {
    height: 40px;
    line-height: 40px;
    .time-format {
      display: inline-block;
      .time-content {
        display: inline-block;
        height: 100%;
        padding: 0 12px;
      }
      .time-label {
        font-size: $--z-size-text--secondary;
        margin-right: 4px;
      }
      .time-symbol {
        margin-right: 4px;
      }
    }
  }
  .z-countDown-endtime {
    font-size: $--z-size-text--secondary;
    color: $--z-color-text-four;
    height: 24px;
    line-height: 24px;
  }
  .medium-size .time-format .time-content {
    height: 36px;
    line-height: 36px;
    .time-format .time-content {
      padding: 0 10px;
    }
  }
  .small-size {
    height: 32px;
    line-height: 32px;
    .time-format .time-content {
      padding: 0 8px;
    }
  }
  .mini-size {
    height: 28px;
    line-height: 28px;
    .time-format .time-content {
      padding: 0 6px;
    }
  }
}
.label-horizontal {
  .z-countDown-label, .z-countDown-time, .z-countDown-endtime {
    display: inline-block;
  }
}
</style>


