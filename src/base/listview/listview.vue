<template>
  <scroll ref="listview" :probe-type="3" :listen-scroll="true" class="listview" @scroll="handelscroll">
    <ul>
      <li class="list-group" v-for="(group,index) in data" ref="listGroup">
        <h2 class="list-group-title">{{group.name}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="item in group.list" class="list-group-item">
            <img class="avatar" v-lazy="item.pic" alt="">
            <span class="name">{{item.singer_name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut"
         @touchmove.prevent="onShortcutTouchMove"
         @touchstart="onShortcutTouchStart">
      <ul>
        <li v-for="(item,index) in shortCutList"
            :class="{'current':currentIndex == index}"
            :data-index="index" class="item">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'

  const ANCHOR_HEIGHT = 16;
  const TITLE_HEIGHT = 30;

  export default {
    props:{
      data:{
        type:Array,
        default:[],
      }
    },
    created(){
      this.touch = {}
      this.listHeight = []
    },
    data(){
      return {
        scrollY : -1,
        currentIndex:0,
        diff:-1
      }
    },
    computed:{
      shortCutList(){
        return this.data.map((group)=>{
          return group.name.substring(0,1);
        })
      },
      fixedTitle(){
        if(this.scrollY > 0){
          return '';
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].name : '';
      }
    },
    methods:{
      selectItem(item){
        this.$emit('select',item);
      },
      refresh(){
        this.$refs.listview.refresh();
      },
      onShortcutTouchStart(e){
        let anchorIndex = getData(e.target,'index');
        let firstTouch = e.touches[0];
        this.touch.y1 = firstTouch.pageY;
        this.touch.anchorIndex = anchorIndex;
        this._scrollTo(anchorIndex);
        this.currentIndex = anchorIndex;
      },
      onShortcutTouchMove(e){
        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.pageY;
        let delta = Math.floor((this.touch.y2 - this.touch.y1)/ANCHOR_HEIGHT);
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
        if(anchorIndex < 0){
          anchorIndex = 0;
        }
        if(anchorIndex > this.shortCutList.length -1){
          anchorIndex = this.shortCutList.length-1;
        }
        this._scrollTo(anchorIndex);
        this.currentIndex = anchorIndex;
      },
      handelscroll(pos){
        this.scrollY = pos.y;
      },
      _scrollTo(index){
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0);
      },
      _calculateHeight(){
        this.listHeight = [];
        const list = this.$refs.listGroup;
        let height = 0;
        this.listHeight.push(height);
        for(let i=0;i<list.length;i++){
          let item = list[i];
          height+=item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    watch:{
      data(){
        setTimeout(() =>{
          this._calculateHeight()
        },20)
      },
      scrollY(newY){
        const listHeight = this.listHeight;
        for(let i=0;i<listHeight.length;i++){
          let height1 = listHeight[i];
          let height2 = listHeight[i+1];
          if((((-newY)>height1) && ((-newY)<height2))){
            this.currentIndex = i;
            this.diff = height2 + newY;
            return
          }
          if(newY >= 0){
            this.currentIndex = 0;
            return;
          }
        }
        this.currentIndex = listHeight.length -1;
      },
      diff(newVal){
        let fixedTop = (newVal > 0 && newVal <TITLE_HEIGHT)? newVal - TITLE_HEIGHT : 0;
        if(this.fixedTop === fixedTop){
          return
        }
        this.fixedTop = fixedTop;
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components:{
      Scroll
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .listview{
    position:relative;
    width:100%;
    height:100%;
    overflow:hidden;
    background:$color-background;
    .list-group{
      padding-bottom:30px;
      .list-group-title{
        height:30px;
        line-height:30px;
        padding-left:20px;
        font-size:$font-size-small;
        color:$color-text-l;
        background:$color-highlight-background;
      }
      .list-group-item{
        display:flex;
        align-items:center;
        padding:20px 0 0 30px;
        .avatar{
          width:50px;
          height:50px;
          border-radius:50%;
        }
        .name{
          margin-left:20px;
          color:$color-text-l;
          font-size:$font-size-medium;
        }
      }
    }
    .list-shortcut{
      position:absolute;
      z-index:30;
      right:0;
      top:50%;
      transform:translateY(-50%);
      width:20px;
      text-align:center;
      background :$color-background-d;
      font-family:Helvetica;
      .item{
        padding:2px;
        line-height:1;
        color:$color-text-l;
        font-size:$font-size-small;
        &.current{
          color:$color-theme;
        }
      }
    }
    .list-fixed{
      position:absolute;
      top:0;
      left:0;
      right:0;
      .fixed-title{
        height:30px;
        line-height:30px;
        padding-left:20px;
        font-size:$font-size-small;
        color:$color-text-l;
        background:$color-highlight-background;
      }
    }
  }
</style>
