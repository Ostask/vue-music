import {mapGetters} from 'vuex'

export const playlistMixin = {
  computed:{
    ...mapGetters([
      'playlist'
    ])
  },

  mounted (){
    this.handelPlaylist(this.playlist)
  },
  activated(){
    this.handelPlaylist(this.playlist)
  },
  watch:{
    playlist(newVal){
      this.handelPlaylist(newVal)
    }
  },
  methods:{
    handelPlaylist(){
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
