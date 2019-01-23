<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <slider v-if="recommends.length">
            <div v-for="item in recommends">
              <a :href="item.jump_info.url">
                <img @load="loadImage" :src="item.pic_info.url" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in diskList" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.cover">
              </div>
              <div class="text">
                <h2 class="name">{{item.title}}</h2>
                <p class="desc">{{item.username}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-if="!diskList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios'
  import Scroll from 'base/scroll/scroll.vue'
  import Jsonp from 'common/js/jsonp.js'
  import Slider from 'base/slider/slider.vue'
  import Loading from 'base/loading/loading'
  import {playlistMixin} from "common/js/mixin";
  import {mapMutations} from 'vuex'

  export default {
    mixins:[playlistMixin],
    data (){
      return{
        recommends : [],
        diskList : [],
        checkLoaded : false
      }
    },
    components:{
      Slider,
      Scroll,
      Loading
    },
    methods :{
      getRecommendData(){
        Jsonp('https://u.y.qq.com/cgi-bin/musicu.fcg',{
          callback: "recom21597773335470527",
          g_tk: 1161782283,
          jsonpCallback: "recom21597773335470527",
          loginUin: 502724802,
          hostUin: 0,
          format: "jsonp",
          inCharset: "utf8",
          outCharset: "utf-8",
          notice: 0,
          platform: "yqq",
          needNewCode: 0,
          data: JSON.stringify({
            "comm":{
              "ct":24
            },
            "focus":{
              "module":"QQMusic.MusichallServer",
              "method":"GetFocus",
              "param":{}
            }
          })
        }).then((res)=>{
          if(res.code == 0){
            this.recommends = res.focus.data.content;
          }
        })
        // axios.get('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1535506540109')
        //   .then((response) => {
        //     if(response.data.code == 0){
        //       this.recommends = response.data.data.slider;
        //     }
        //
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      },
      getDiskList (){
        Jsonp('https://u.y.qq.com/cgi-bin/musicu.fcg',{
          callback: 'recom41303987789701857',
          g_tk: 5381,
          jsonpCallback: 'recom41303987789701857',
          loginUin: 0,
          hostUin: 0,
          format: 'jsonp',
          inCharset: 'utf8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'yqq',
          needNewCode: 0,
          data: JSON.stringify({"comm":{"ct":24},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"}})
        }).then((res)=>{
          if(res.code == 0){
            this.diskList = res.recomPlaylist.data.v_hot;
          }
        })
      },
      loadImage(){
        if(!this.checkLoaded) {
          this.$refs.scroll.refresh();
          this.checkLoaded = true;
        }
      },
      handelPlaylist(playlist){
        const bottom = playlist.length ? '60px' : '';
        this.$refs.recommend.style.bottom = bottom;
        this.$refs.scroll.refresh();
      },
      selectItem(item){
        this.$router.push({
          path: `/recommend/${item.content_id}`
        })
        this.setDisc(item);
      },
      ...mapMutations({
        setDisc:'SET_DISC'
      })
    },
    mounted (){
      this.getRecommendData();
      this.getDiskList ();
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .recommend{
    position:fixed;
    width:100%;
    top:88px;
    bottom:0;
    .recommend-content{
      height:100%;
      overflow:hidden;
      .slider-wrapper{
        position:relative;
        width:100%;
        overflow :hidden;
      }
      .recommend-list{
        .list-title{
          height:65px;
          line-height:65px;
          text-align:center;
          font-size:$font-size-medium;
          color:$color-theme;
        }
        .item{
          display:flex;
          box-sizing:border-box;
          align-items:center;
          padding:0 20px 20px 20px;
          .icon{
            flex:0 0 60px;
            width:60px;
            padding-right:20px;
          }
          .text{
            display:flex;
            flex-direction:column;
            justify-content :center;
            flex:1;
            line-height 20px;
            overflow:hidden;
            font-size:$font-size-medium;
            .name{
              margin-bottom:10px;
              color:$color-text;
            }
            .desc{
              color:$color-text-d;
            }
          }
        }
      }
      .loading-container{
        position:absolute;
        width:100%;
        top:50%;
        transform:translateY(-50%);
      }
    }
  }
</style>
