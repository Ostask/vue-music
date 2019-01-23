import jsonp from 'common/js/jsonp.js'
import axios from "axios";
import {Base64} from 'js-base64'
import {createLyric} from "common/js/lyric";

function MusicJsonCallback_lrc(data){
  return data;
}



export function getLyric(songmid){
  let url = 'other/music/api/lyric'
  let data = {
    callback: "MusicJsonCallback_lrc",
    pcachetime: +new Date(),
    songmid: songmid,
    g_tk: 1366301734,
    jsonpCallback: "MusicJsonCallback_lrc",
    loginUin: 502724802,
    hostUin: 0,
    format: "jsonp",
    inCharset: "utf8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq",
    needNewCode: 0
  }
  return new Promise((resolve,reject)=>{
    axios.get(url, {
      headers: {
        authority: "c.y.qq.com",
        method: "GET",
        referer: "https://y.qq.com/portal/player.html"
      },
      params: data
    }).then((res)=>{
      if(res.data.code === 0) {
        let lyric = Base64.decode(res.data.lyric);
        let ret = createLyric(lyric);

        resolve(ret);
      }
    })
  })
}
