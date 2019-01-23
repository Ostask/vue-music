export function shuffle(list){
  let ret = [];
  for(let i = 0;i < list.length; i++){
    ret[i] = list[i];
  }
  for(let i = 0;i < ret.length; i++){
    let temp = ret[i];
    let index = Math.floor(Math.random()*list.length);
    ret[i] = ret[index];
    ret[index] = temp;
  }
  return ret;
}
