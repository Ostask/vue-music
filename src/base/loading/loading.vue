<template>
  <div class="loading">
    <div class="loader"></div>
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  export default {
    props:{
      title:{
        type:String,
        default:'正在载入...'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .loading{
    width:100%;
    text-align:center;
    .loader{
      width: 45px;
      height: 45px;
      display: inline-block;
      padding: 0px;
      border-radius: 100%;
      border: 5px solid;
      border-top-color: $color-theme;
      border-bottom-color: rgba(0,0,0, 0.1);
      border-left-color: $color-theme;
      border-right-color: rgba(0,0,0, 0.1);
      -webkit-animation: loader 1s ease-in-out infinite;
      animation: loader 1s ease-in-out infinite;
    }
    .desc{
      line-height:20px;
      font-size:$font-size-small;
      color:$color-text-l;
    }
  }
  @keyframes loader {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }
  @-webkit-keyframes loader {
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
  }
</style>
