<template>
  <div class="z-list-ctrl">
    <ul :class="{'list-wrap': true, 'list-image': showImgLeft, 'list-border-bottom': showBorderBottom}">
      <li v-for="(item, index) in listData" :key="index">
        <div class="first-title" @click="toggleContentVisible(index)">{{item.title}}</div>
        <img class="first-list-image" v-show="item.src" :src="item.src" alt="">
        <ul :class="{'second-list': true}" v-show="showList[index]">
          <li v-for="(v, i) in item.children" :key="i">
            <div class="second-content">
              <img v-show="v.src"  class="icon_" :src="v.src" alt="">
              <span class="clearfix" @click="setClickItem(v)">{{v.content}}</span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    showImgLeft: {
      type: Boolean,
      default: true
    },
    showBorderBottom: {
      type: Boolean,
      default: false
    },
    isExpandAll: {
      type: Boolean,
      default: true
    },
    isAccordion: {
      type: Boolean,
      default: false
    },
    initExpandIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      showList: []
    }
  },
  created () {
    this.setShowList()
  },
  methods: {
    setShowList () {
      if (this.isExpandAll) {
        this.showList = new Array(this.listData.length).fill(true)
      } else if (this.initExpandIndex > -1) {
        this.showList = new Array(this.listData.length).fill(false)
        this.showList.splice(this.initExpandIndex, 1, true)
      } else {
        this.showList = new Array(this.listData.length).fill(false)
      }
    },
    toggleContentVisible (index) {
      if (this.isAccordion) {
        let isShow = this.showList[index]
        this.showList = new Array(this.listData.length).fill(false)
        this.showList.splice(index, 1, !isShow)
      } else {
        this.showList.splice(index, 1, !this.showList[index])
      }
    },
    setClickItem (item) {
      this.$emit('getCheckedItem', item)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './commonStyle/ZVar.scss';
.list-wrap {
  width: 100%;
  border: 1px solid $--z-color-text-secondary;
  padding: $--z-list-padding;
  > li {
    position: relative;
    border-bottom: 1px solid $--z-color-text-secondary;
    // padding-bottom: 6px;
    .first-list-image {
      position: absolute;
      width: $--z-list-second-image-size;
      height: $--z-list-second-image-size;
      left: $--z-list-second-position-left;
      top: 12px;
    }
  }
  & > li:last-child {
    border-bottom: none;
  }
  li {
    line-height: $--z-list-first-height;
    cursor: pointer;
    overflow: hidden;
    .first-title {
      padding-left: $--z-list-second-padding-left;
      font-size: $--z-size-text--secondary;
      color: $--z-color-text-primary;
      &:hover {
        background-color: $--z-list-hover-bgc;
      }
    }
    .second-list {
      font-size: $--z-size-text--secondary;
      color: $--z-color-text-third;
      li {
        line-height: $--z-list-second-height;
      }
      .second-content {
        position: relative;
        padding-left: $--z-list-second-padding-left;
        &:hover {
          background-color: $--z-list-hover-bgc;
        }
        .icon_ {
          position: absolute;
          width: $--z-list-second-image-size;
          height: $--z-list-second-image-size;
          left: $--z-list-second-position-left;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.list-border-bottom li, .list-border-bottom .first-title {
  border-bottom: 1px solid $--z-color-text-secondary;
}
.list-image {
  & > li {
    padding-left: $--z-list-first-padding-left;
    .first-title {
      padding-left: 0;
    }
    .first-list-image {
      width: $--z-list-first-image-size-width;
      height: $--z-list-first-image-size-height;
      top: 9px;
      left: 14px;
    }
  }
}
.clearfix::after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}

</style>
