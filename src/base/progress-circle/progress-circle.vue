<template>
  <div class="progress-circle" ref="wrapper">
    <canvas ref="progressCircle"></canvas>
  </div>
</template>

<script>
  const LINEWIDTH = 3;
  export default {
    props:{
      width:{
        type:Number,
        default:100
      },
      height:{
        type:Number,
        default:100
      },
      percent:{
        type:Number,
        default:0
      }
    },
    mounted(){
      this.init();
    },
    watch:{
      width(){
        this.canvas.width = this.width;
      },
      height(){
        this.canvas.height = this.height;
      },
      percent(newVal){
        this.drawCircle(newVal);
      }
    },
    methods:{
      init(){
        this.canvas = this.$refs.progressCircle;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.drawCircle(this.percent);
      },
      drawCircle(percent){
        this.ctx.clearRect(0,0,this.width,this.height);
        this.ctx.beginPath();
        //画进度条底色
        this.ctx.strokeStyle="rgba(0,0,0,0.3)";
        this.ctx.lineWidth=LINEWIDTH;
        this.ctx.arc(this.width/2,this.height/2,this.width/2-LINEWIDTH/2,0,2*Math.PI);
        this.ctx.stroke();
        this.ctx.save();
        //画高亮进度条
        this.ctx.translate(this.width/2,this.height/2);
        this.ctx.rotate(-90*Math.PI/180);
        this.ctx.beginPath();
        this.ctx.strokeStyle="#ffcd32";
        this.ctx.lineWidth=LINEWIDTH;
        this.ctx.arc(0,0,this.width/2-LINEWIDTH/2,0,2*Math.PI*this.percent);
        this.ctx.stroke();
        this.ctx.restore();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .progress-circle{
    width:100%;
    height:100%;
  }
</style>
