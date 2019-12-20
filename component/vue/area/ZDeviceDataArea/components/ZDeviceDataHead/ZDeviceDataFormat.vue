<template>
  <el-dialog
    title="下载格式"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="500px">
    <el-radio-group v-model="format">
      <el-radio label="excel">excel</el-radio>
      <el-radio label="csv">csv</el-radio>
    </el-radio-group>
    <span slot="footer" class="dialog-footer">
      <v-button @cancel="cancel" @confirm="confirm"></v-button>
    </span>
  </el-dialog>
</template>
<script>
import VButton from '../../../CommonArea/ZDialogButton.vue'
export default {
  props: {
    formatVisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    VButton
  },
  data () {
    return {
      format: 'excel'
    }
  },
  methods: {
    cancel () {
      this.dialogVisible = false
    },
    confirm () {
      this.$emit('getFormat', this.format)
      this.dialogVisible = false
    }
  },
  computed: {
    dialogVisible: {
      set (val) {
        this.$emit('getFormatVisible', val)
      },
      get () {
        return this.formatVisible
      }
    }
  }
}
</script>
