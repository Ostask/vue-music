export default class Lyric {
  constructor(info,currentTime,lyclist){
    this.info = info;
    this.currentTime = currentTime;
    this.lyclist = lyclist;
    this.interval = null;
    this.playing = false;
    this.currentLine = 0;
  }

  play(time){
    clearInterval(this.interval);
    this.playing = true;
    this.currentTime = parseInt(time*100)*10;
    this.interval = setInterval(()=>{
      if(this.playing) {
        this.currentTime += 10;
        this.getCurrentLine();
      }
    },10)
  }

  getCurrentLine(){
    for(let i=0;i<this.lyclist.length;i++){
      if(this.lyclist[i].time == this.currentTime){
        this.currentLine = i;
      }
    }
  }

  pause(){
    this.playing = false;
  }

  end(){
    clearInterval(this.interval);
    this.currentTime = 0;
    this.currentLine = 0;
  }

}

function filterLyric(lyricstr){
  let ret = {
    info:{

    },
    lyric:[

    ]
  };
  let lyricarr = lyricstr.split('\n');
  let regInfo = /\[(\D+\:.*)\](.*)/i;
  let regLyc = /\[(\d{1,2}\:\d{1,2}\.\d{1,2})\](.*)$/i
  let regNoLyc = /\[(\d{1,2}\:\d{1,2}\:\d{1,2})\](.*)$/i
  for(let i=0;i<lyricarr.length;i++){
    let temp = regInfo.exec(lyricarr[i]);
    if(temp){
      let infoarr = temp[1].split(':');
      if(infoarr[0]=='ti'){
        ret.info.title = infoarr[1]||'';
      }else if(infoarr[0]=='ar'){
        ret.info.singer = infoarr[1]||'';
      }else if(infoarr[0]=='al'){
        ret.info.album = infoarr[1]||'';
      }else if(infoarr[0]=='by'){
        ret.info.by = infoarr[1]||'';
      }
    }else{
      let nolrc = regNoLyc.exec(lyricarr[i]);
      if(nolrc){
        ret.lyric.push({
          time:0,
          lrc:nolrc[2]
        })
        break;
      }
      let lrc = regLyc.exec(lyricarr[i]);
      let time = lrc[1];
      time = parseInt(time.slice(0,5).split(':')[0])*60*1000 + parseInt(time.slice(0,5).split(':')[1])*1000 + parseFloat('0.'+time.split('.')[1])*1000;
      ret.lyric.push({
        time:time,
        lrc:lrc[2]
      })
    }
  }
  return ret
}

export function createLyric(str){
  const lyc = filterLyric(str);
  return new Lyric(lyc.info,0,lyc.lyric)
}
