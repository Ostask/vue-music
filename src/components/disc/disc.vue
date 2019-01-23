<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {createSong} from "common/js/song"
  import {getDiscList} from 'api/disc.js'

  export default {
    components:{
      MusicList
    },
    computed:{
      title(){
        return this.disc.title
      },
      ...mapGetters([
        'disc'
      ])
    },
    data(){
      return{
        songs:[],
        bgImage:''
      }
    },
    methods:{
      getDiscListData(){
        this.discID = this.$route.params.id;
        if(!this.disc.content_id) {
          this.$router.push('/recommend');
          return
        }
        getDiscList(this.discID).then((res)=>{
          this.songs = this._normalizeSongs(res);
        })
      },
      _normalizeSongs(list){
        let ret = [];
        list.forEach((item) => {
          ret.push(createSong(item));
        })
        return ret
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.bgImage = this.disc.cover;
        this.getDiscListData();
      })
    }
  }
</script>

<style scoped lang="stylus">
  .slide-enter-active,.slide-leave-active{
    transition:all 0.3s;
  }
  .slide-enter, .slide-leave-to{
    transform :translate3d(100%,0,0)
  }
</style>
