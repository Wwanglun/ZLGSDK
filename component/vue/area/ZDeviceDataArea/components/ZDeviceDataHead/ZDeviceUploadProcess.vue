<template>
  <el-dialog
    title="数据下载"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="500px">
    <div style="padding: 10px;">
        <el-progress style="white-space: nowrap;over-flow: hidden;" :percentage="saveDataPercent"></el-progress>
      </div>
      <ul style="max-height: 260px; overflow-y: auto; padding: 10px 14px;;border-bottom: 1px solid #dfe4ed;">
        <li>{{dataLogs + str}}</li>
      </ul>
      <el-button style="margin-bottom: 20px; margin-top: 20px;" @click="dialogVisible = false" plain>取消下载</el-button>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      saveDataPercent: 0,
      dataLogs: '数据下载中',
      dialogVisible: false,
      timer: null,
      str: ''
    }
  },
  methods: {
    setAnimation () {
      this.timer = setInterval(() => {
        this.str += '.'
        if (this.str === '....') this.str = '.'
      }, 1000)
    },
    resultAndProcessTip (info, saveData, paramObj) {
      if (info.type == 'progress') {
        this.saveDataPercent = saveData.saveDataPercent
        this.dataLogs = `${saveData.flagIndex * paramObj.maxSize > paramObj.num ? paramObj.num : saveData.flagIndex ? saveData.flagIndex * paramObj.maxSize : 0} / ${paramObj.num} 数据加载中`
      } else if (info.type == 'error') {
        var msg = '一次最多只能保存60万条数据, 请缩短查询时间！'
        this.$message.error(msg)
      } else if (info.type == 'disconnect') {
        this.dataLogs = `${saveData.flagNum ? saveData.flagNum : 0} / ${saveData.maxLength} ---数据请求失败，${saveData.flagIndex * paramObj.maxSize} / ${paramObj.num}，正在重试${saveData.errFlag ? saveData.errFlag : 1}次`
      } else if (info.type == 'fail') {
        let msg = '下载失败, 当前的网络不稳, 请检测网络!'
        this.$alert(msg, '提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.init()
          }
        })
      }
    },
    sureSave (save) {
      this.$message({message: save ? '保存成功' : '取消保存'})
    },
    init () {
      this.dialogVisible = false
      this.saveDataPercent = 0
      this.dataLogs = '数据下载中'
    }
  },
  watch: {
    dialogVisible (show) {
      if (!show) {
        clearInterval(this.timer)
        this.$emit('stopSave')
      } else {
        this.setAnimation()
      }
    }
  }
}
</script>
