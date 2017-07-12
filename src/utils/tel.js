
const tel=()=>{
  let now = new Date().getTime();
  let morning = new Date().setHours('9','00','00','00');
  let evening = new Date().setHours('18','00','00','00');
  if(now > morning && now < evening ){
    location.href="tel://4006277120";
    return true;
  }else {
    return false; //每日9:00～18:00名医助手随时恭候您的召唤～现在正在休息中～
  }
}

export default tel;