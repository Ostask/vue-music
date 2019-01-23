<template>
  <transition name="slide">
    <music-list :bgImage="bgImage" :songs="songs" :title="title"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singerDetail.js'
  import {createSong} from "common/js/song"
  import MusicList from 'components/music-list/music-list'

  export default {
    computed:{
      title (){
        return this.singer.singer_name
      },
      ...mapGetters([
        'singer'
      ])
    },
    components:{
      MusicList
    },
    created(){
      this.getSingerData()
    },
    data(){
      return {
        singerID:'',
        songs:[],
        bgImage:''
      }
    },
    methods:{
      getSingerData(){
        this.singerID = this.$route.params.id;
        if(!this.singer.id) {
          this.$router.push('/singer');
          return
        }
        getSingerDetail(this.singerID).then((res)=>{
          this.bgImage = 'http://y.gtimg.cn/music/photo_new/T001R300x300M000'+res.singer_mid+'.jpg?max_age=2592000'
          this.songs = this._normalizeSongs(res.list);
        })
      },
      _normalizeSongs(list){
        let ret = [];
        list.forEach((item) => {
          let {musicData} = item;
          ret.push(createSong(musicData));
        })
        return ret
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .slide-enter-active,.slide-leave-active{
    transition :all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform :translate3d(100%,0,0);
  }
</style>
