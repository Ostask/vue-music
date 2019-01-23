<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
           ref="progressBtn">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {prefixStyle} from 'common/js/dom.js'

  const progressBtnWitdh = 16;
  const transform = prefixStyle('transform');

  export default {
    props:{
      percent:{
        type:Number,
        default:0
      }
    },
    created(){
      this.touches = {};
    },
    methods:{
      progressTouchStart(e){
        //获取到初始的x坐标，改变一下标志位
        this.touches.isTouch = true;
        this.touches.startX = e.touches[0].pageX;
        this.touches.left = this.$refs.progress.clientWidth;
      },
      progressTouchMove(e){
        //实时改变btn的translateX和progress的width
        this.touches.currentX = e.touches[0].pageX;
        this.touches.offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWitdh,Math.max(0,this.touches.left + this.touches.currentX - this.touches.startX));
        this._offset(this.touches.offsetWidth);
      },
      progressTouchEnd(){
        //改变标志位，向父级派发事件传递当前percent
        this.touches.isTouch = false;
        let percent = this.$refs.progress.clientWidth / (this.$refs.progressBar.clientWidth - progressBtnWitdh);
        this.$emit('percentChange',percent);
      },
      progressClick(e){
        let offsetWidth = e.offsetX - progressBtnWitdh;
        this._offset(offsetWidth);
        let percent = this.$refs.progress.clientWidth / (this.$refs.progressBar.clientWidth - progressBtnWitdh);
        this.$emit('percentChange',percent);
      },
      _offset(offsetWidth){
        this.$refs.progress.style.width = `${offsetWidth}px`;
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      }
    },
    watch:{
      percent(newPercent){
        if(newPercent >= 0 && !this.touches.isTouch){
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWitdh;
          const offsetWidth = newPercent * barWidth;
          this._offset(offsetWidth);
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .progress-bar{
    height:30px;
    .bar-inner{
      position:relative;
      top:13px;
      height:4px;
      background :rgba(0,0,0,0.3);
      .progress{
        position:absolute;
        height:100%;
        background:$color-theme;
      }
      .progress-btn-wrapper{
        position:absolute;
        left:-8px;
        top:-13px;
        width:30px;
        height:30px;
        .progress-btn{
          position:relative;
          top:7px;
          left:7px;
          box-sizing:border-box;
          width:16px;
          height:16px;
          border:3px solid $color-text;
          border-radius:50%;
          background:$color-theme;
        }
      }
    }
  }
</style>
