import jsonp from 'common/js/jsonp.js'
import axios from 'axios'

export function getDiscList(id){
  const url = '/other/music/api/getCdInfo';
  let data = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    disstid: id,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  }

  return new Promise((resolve,reject) => {
    axios.get(url, {
      params: data
    })
    .then(function (response) {
      const data = response.data;
      if(data.code == 0){
        resolve(data.cdlist[0].songlist);
      }else{
        reject(data);
      }
    })
    .catch(function (error) {
      reject(error);
    });
  })
}
