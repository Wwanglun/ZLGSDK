<template>
  <div class="z-skeleton-ctrl" v-if="showSkeleton">
    <div class="skeleton-element">
      <div class="skeleton-image">
        <img v-if="showImage" :src="imgSrc" alt="">
      </div>
      <div v-if="showText" class="skeleton-text" :style="{'text-align': textAlign}">{{textSymbol}}</div>
      <div v-if="showProgress" class="progress-single" :style="{
          'background-color': progressBGC,
          'width': progressWidth,
          'height': progressHeight,
          'border-radius': progressRadius
        }" v-for="item in progressCount" :key="item">
        <div :class="['mask', animation ? 'animation-class' : '']"
          :style="{
            'background-image': gradient,
            'background-color': maskColor,
            'animation-duration': animationDuration + 's',
            'animation-timing-function': animationTiming,
            'animation-iteration-count': animationCount,
            'border-radius': progressRadius
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showSkeleton: {
      type: Boolean,
      default: false
    },
    showImage: {
      type: Boolean,
      default: true
    },
    showText: {
      type: Boolean,
      default: true
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    imgSrc: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: '请等待，正在加载'
    },
    textAlign: {
      type: String,
      default: 'center'
    },
    progressCount: {
      type: Number,
      default: 1
    },
    progressBGC: {
      type: String,
      default: '#f2f2f2'
    },
    progressWidth: {
      type: String,
      default: '100%'
    },
    progressHeight: {
      type: String,
      default: '20px'
    },
    progressRadius: {
      type: String,
      default: '10px'
    },
    maskColor: {
      type: String,
      default: '#ECE6E6'
    },
    animation: {
      type: Boolean,
      default: false
    },
    animationDuration: {
      type: Number,
      default: 2
    },
    animationTiming: {
      type: String,
      default: 'linear'
    },
    animationCount: {
      type: String,
      default: 'infinite'
    },
    gradient: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      timer: null,
      textSymbol: ''
    }
  },
  created () {
    this.showText && this.getText()
  },
  methods: {
    getText () {
      let symbol = ''
      this.timer = setInterval(() => {
        symbol += '.'
        if (symbol.length > 6) {
          symbol = ''
        }
        this.textSymbol = this.text + symbol
      }, 1000)
    }
  },
  beforeDestroy () {
    this.timer && clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
@import './commonStyle/ZVar.scss';
.z-skeleton-ctrl {
  width: $--z-skeleton-width;
  height: $--z-skeleton-height;
  background-color: #fff;
  position: relative;
  .skeleton-element {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    cursor: pointer;
    .skeleton-image {
      text-align: center;
      margin-bottom: 10px;
    }
    .skeleton-text {
      size: $--z-skeleton-text-size;
      color: $--z-skeleton-text-color;
      font-weight: $--z-skeleton-text-font-weight;
      line-height: $--z-skeleton-text-line-height;
      height: $--z-skeleton-text-height;
      margin-bottom: $--z-skeleton-text-margin-bottom;
    }
    .progress-single {
      margin: 0 auto;
      margin-bottom: $--z-skeleton-progress-margin-bottom;
      position: relative;
      &:last-child {
        margin-bottom: 0;
      }
      .mask {
        position: absolute;
        top: 0;
        left: 0px;
        width: 0px;
        height: 100%;
        &.animation-class {
          animation-name: mymove;
        }
      }
    }
  }
}
@keyframes mymove
{
  0% {width: 0px;};
  100% {width: 100%};
}
</style>
