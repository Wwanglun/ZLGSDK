<template>
  <div class="edit-input">
    <div class="editBox clearfix">
      <div>
        <span class="list">{{ name }}：</span>
        <span class="listValue" v-if="!editStatus" :title="value">{{value}}</span>
      </div>
      <span class="editLogo"  @click="editStatus = !editStatus" v-if="!editStatus"></span>
      <div class="edit" v-if="editStatus">
        <el-select v-model="newValue" filterable :placeholder="placeholderDes" style="width: 200px;" size="medium">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :title="item.label">
          </el-option>
        </el-select>
        <span class="confirmEdit" @click="changeValue">√</span>
        <span class="cancel" @click="cancel">×</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      require: true
    },
    value: {
      type: String,
      require: true
    },
    placeholderDes: {
      type: String,
      default: ''
    },
    selectOptions: {
      type: Array
    }
  },
  data () {
    return {
      newValue: this.value || '',
      editStatus: false
    }
  },
  methods: {
    changeValue () {
      this.$emit('valueChange', this.newValue)
    },
    cancel () {
      this.editStatus = !this.editStatus
      this.newValue = this.value
    }
  }
}
</script>

<style lang="less" scoped>
.edit-input {
  .editBox {
    display: flex;
    margin-top: 10px;
    text-align: center;
    .list {
      color: #909399;
      font-size: 14px;
      line-height: 40px;
      float: left;
    }
    .listValue {
      color: #303133;
      font-size: 14px;
      line-height: 40px;
      max-width: 230px;
      overflow: hidden;
      text-overflow: ellipsis;
      float: left;
    }
    .editLogo {
      color: #2695e4;
      display: inline-block;
      background: url('../Images/sprit.png') -80px -40px;
      width: 20px;
      height: 20px;
      margin-left: 10px;
      margin-top: 10px;
      cursor: pointer;
    }
    .edit {
      height: 50px;
      width: 260px;
      .confirmEdit {
        margin-left: 4px;
        width: 20px;
        height: 36px;
        display: inline-block;
        color: #67c23a;
        font-size: 20px;
        cursor: pointer;
        line-height: 40px;
      }
      .cancel {
        color: #929398;
        font-size: 20px;
        margin-left: 6px;
        cursor: pointer;
        width: 20px;
        height: 36px;
        display: inline-block;
        font-size: 26px;
        line-height: 40px;
        &:hover {
          color: #fa5555;
        }
      }
      .el-input {
        width: 200px;
      }
    }
  }
}
</style>
