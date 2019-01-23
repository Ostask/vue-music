import * as types from './mutation-type'
import {playMode} from "common/js/config";
import {shuffle} from "common/js/util";

function findIndex(list,song){
  let index = list.findIndex((item)=>{
    return item.id === song.id
  })
  return index
}

export const selectPlay = function({commit,state},{list,index}){
  commit(types.SET_SEQUENCE_LIST,list);
  if(state.mode === playMode.random){
    let randomlist = shuffle(list);
    commit(types.SET_PLAYLIST,randomlist);
    let i = findIndex(randomlist,list[index]);
    commit(types.SET_CURRENT_INDEX,i);
  }else{
    commit(types.SET_PLAYLIST,list);
    commit(types.SET_CURRENT_INDEX,index);
  }
  commit(types.SET_FULL_SCREEN,true);
  commit(types.SET_PLAYING_STATE,true);
}

export const randomPlay = function({commit},{list}){
  commit(types.SET_PLAY_MODE,playMode.random);
  commit(types.SET_SEQUENCE_LIST,list);
  let randomlist = shuffle(list);
  commit(types.SET_PLAYLIST,randomlist);
  commit(types.SET_CURRENT_INDEX,0);
  commit(types.SET_FULL_SCREEN,true);
  commit(types.SET_PLAYING_STATE,true);
}
