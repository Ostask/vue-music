import jsonp from 'common/js/jsonp'
import axios from 'axios'

const url="/api/v8/fcg-bin/fcg_myqq_toplist.fcg";
const data = {
  g_tk: 5381,
  uin: 0,
  format: "json",
  inCharset: "utf-8",
  outCharset: "utf-8",
  notice: 0,
  platform: "h5",
  needNewCode: 1,
  _: 1539310372386
}

export function getTopList(){
  return new Promise((resolve,reject)=>{
    axios.get(url, {
      params: data
    })
    .then(function (response) {
      if(response.data.code == 0){
        resolve(response.data.data);
      }else{
        reject(response);
      }
    })
    .catch(function (error) {
      reject(error);
    });
  })
}

export function getMusicList(topid){
  return new Promise((resolve,reject)=> {
    axios.get("/api/v8/fcg-bin/fcg_v8_toplist_cp.fcg", {
      params: {
        g_tk: 5381,
        uin: 0,
        format: "json",
        inCharset: "utf-8",
        outCharset: "utf-8",
        notice: 0,
        platform: "h5",
        needNewCode: 1,
        tpl: 3,
        page: "detail",
        type: "top",
        topid: topid,
        _: 1540781244444
      }
    }).then((res) => {
      if (res.data.code == 0) {
        resolve(res.data.songlist);
      } else {
        reject();
      }
    })
  })
}
