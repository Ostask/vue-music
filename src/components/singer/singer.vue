<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" ref="scrollList" :data="singers"></list-view>
    <div v-show="!singers.length" class="loading-container">
      <loading></loading>
    </div>
    <router-view />
  </div>
</template>

<script>
  import {getSingerList} from 'api/singer'
  import ListView from 'base/listview/listview'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from "common/js/mixin";

  export default {
    mixins:[playlistMixin],
    data(){
      return {
        singers : []
      }
    },
    components:{
      ListView,
      Loading
    },
    created(){
      this._getSingerList()
    },
    methods:{
      selectSinger(singer){
        this.$router.push({
          path:'/singer/'+singer.singer_mid
        });
        this.setSinger(singer);
      },
      _getSingerList(){
        getSingerList().then((res)=>{
          this.singers = res;
        })
      },
      handelPlaylist(playlist){
        const bottom = playlist.length ? '60px' : '';
        this.$refs.singer.style.bottom = bottom;
        this.$refs.scrollList.refresh();
      },
      ...mapMutations({
        setSinger:'SET_SINGER'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .singer{
    position:fixed;
    top:88px;
    bottom:0;
    width:100%;
    .loading-container{
      position:absolute;
      width:100%;
      top:50%;
      transform:translateY(-50%);
    }
  }
</style>
