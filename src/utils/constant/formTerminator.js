import _ from 'lodash';
// 判断必填
const requireTer = (requireObj, data) => {
  let result = '';
  Object.keys(requireObj).some(key=>{
    let arr = key.split('.');
    let num = 0;
    const checkLoop = (k, o) => {
      if(_.isObject(o[k])) {
        num++;
        return checkLoop(arr[num], o[k]);
      } else {
        if(_.isNumber(o[k])){
          return false;
        }
        return _.isEmpty(o[k]);
      }
    }
    if(checkLoop(arr[num], data)) {
      result = requireObj[key];
      return true;
    }
  });
  return result;
}
export { requireTer };