import jsonp from 'common/js/jsonp'

let singerList = [];
let map = [];
const url="https://u.y.qq.com/cgi-bin/musicu.fcg";

const getSingerByChart = function(type){
  let index = map.filter((item)=>{
    if(item.name == type){
      return true;
    }
  })[0].id;
  return new Promise((resolve,reject) => {
    jsonp(url,getData(index)).then((res)=>{
      if(res.code == 0){
        let data = res.singerList.data.singerlist;
        if(data.length) {
          for (let i = 0; i < singerList.length; i++) {
            if (singerList[i].name == type) {
              for (let j = 0; j < 20; j++) {
                let picUrl = data[j].singer_pic;
                picUrl = picUrl.substring(0,picUrl.length-5);
                singerList[i].list.push({
                  singer_name: data[j].singer_name,
                  id: data[j].singer_id,
                  pic: picUrl+'.jpg?max_age=2592000',
                  singer_mid:data[j].singer_mid
                })
              }
            }
          }
          for(let i=0;i<map.length;i++){
            if(map[i].id == index){
              map.splice(i,1);
              break;
            }
          }
        }
        resolve();
      }else{
        reject();
      }
    })
  })
}

let singerPromiseArr = [];

const getSingerPromiseArr = function(){
  singerPromiseArr = [];
  for(let i=0;i<map.length;i++){
    singerPromiseArr.push(getSingerByChart(map[i].name));
  }
  return Promise.all(singerPromiseArr)
}

const getMap = function (url){
  return new Promise((resolve,reject) => {
    jsonp(url,getData(-100)).then((res)=>{
      if(res.code == 0){
        map = res.singerList.data.tags.index;
        singerList = [];
        for(let i=0;i<map.length;i++){
          singerList.push({
            name:map[i].name,
            list:[]
          })
        }
        let arr = getSingerPromiseArr();
        resolve(arr);
      }else{
        reject();
      }
    })
  })
}

function getData(index){
  return {
    callback: "getUCGI2966208652746951",
    g_tk: 1161782283,
    jsonpCallback:"getUCGI2966208652746951",
    loginUin: 502724802,
    hostUin: 0,
    format: "jsonp",
    inCharset: "utf8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq",
    needNewCode: 0,
    data: JSON.stringify({"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":index,"sin":0,"cur_page":1}}})
  }
}

export function getSingerList (){
  function getlist() {
    return new Promise ((resolve,reject)=>{
      getMap(url).then(() => {
        if(map.length){
          reject()
        }else {
          resolve();
        }
      }).catch(() => {
        reject();
      })
    })
  }
  return new Promise((resolve,reject)=>{
    getlist().then(()=>{
      resolve(singerList)
    }).catch(()=>{
      getSingerPromiseArr().then(()=>{
        resolve(singerList)
      })
    })
  })
}
