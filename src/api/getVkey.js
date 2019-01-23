import jsonp from 'common/js/jsonp.js'

export function getvkey(songmid){
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  let data = {
    g_tk: 289492722,
    jsonpCallback: "MusicJsonCallback7172035700133739",
    loginUin: 502724802,
    hostUin: 0,
    format: "json",
    inCharset: "utf8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq",
    needNewCode: 0,
    cid: 205361747,
    callback: "MusicJsonCallback7172035700133739",
    uin: 502724802,
    songmid: songmid,
    filename: "C400"+songmid+".m4a",
    guid: 7603950979
  }
  return new Promise((resolve,reject)=>{
    jsonp(url,data).then((res)=>{
      if(res.code == 0){
        resolve(res.data.items[0].vkey);
      }else{
        reject();
      }
    })
  })
}

export function getSongUrl(songmid){
  return new Promise((resolve,reject)=> {
    getvkey(songmid).then((vkey) => {
      let url = 'http://isure.stream.qqmusic.qq.com/C400' + songmid + '.m4a?vkey=' + vkey + '&guid=7603950979&uin=502724802&fromtag=66';
      resolve(url);
    })
  })
}
