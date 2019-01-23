import jsonp from 'common/js/jsonp.js'
import axios from 'axios'

export function getSingerDetail(id){
    const url = '/api/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
    let data = {
      g_tk: 289492722,
      jsonpCallback:"MusicJsonCallbacksinger_track",
      loginUin: 502724802,
      hostUin: 0,
      format: "jsonp",
      inCharset: "utf8",
      outCharset: "utf-8",
      notice: 0,
      platform: "yqq",
      needNewCode: 0,
      singermid: id,
      order: "listen",
      begin: 0,
      num: 100,
      songstatus:1
    }

    return new Promise((resolve,reject) => {
        axios.get(url, {
          params: data
        })
        .then(function (response) {
          let data = eval(response.data);
          if(data.code == 0){
            resolve(data.data);
          }else{
            reject(data);
          }
        })
        .catch(function (error) {
          reject(error);
        });
    })

    function MusicJsonCallbacksinger_track(resultData){
      return resultData;
    }
}
