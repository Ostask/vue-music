<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from 'api/rank'
  import {createSong} from "common/js/song"

  export default {
    components:{
      MusicList
    },
    data(){
      return {
        bgImage:'',
        songs:[]
      }
    },
    computed:{
      title(){
        return this.topList.topTitle
      },
      ...mapGetters([
        'topList'
      ])
    },
    methods:{
      getList(){
        if(!this.topList.id) {
          this.$router.push('/rank');
          return
        }
        getMusicList(this.$route.params.id).then(res=>{
          this.songs = this._normalizeSongs(res);
          this.bgImage = this.songs[0].image;
        })
      },
      _normalizeSongs(list){
        let ret = [];
        list.forEach((item) => {
          ret.push(createSong(item.data));
        })
        return ret
      }
    },
    mounted(){
      this.$nextTick(()=> {
        this.getList()
      })
    }
  }
</script>

<style scope lang="stylus">
  .slide-enter-active, .slide-leave-active{
    transition:all 0.3s ease;
  }
  .slide-enter, .slide-leave-to{
    transform:translate3d(100%,0,0);
  }
</style>
