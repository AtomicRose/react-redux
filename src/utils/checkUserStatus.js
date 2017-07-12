import { browserHistory } from 'react-router';
import getProfile from 'ACTION/profile/getProfile';

const checkUserStatus = (profile) => {
  if (!profile.loading && !profile.data) {
    getProfile();
    return false;
  }
  if (profile.loading && !profile.data) {
    return false;
  }
  if (profile.error && !profile.data) {
    alert('获取用户信息失败！请退出重试！');
    return false;
  }
  let data = profile.data.doctor;
  if (data.is_required == 1) { // 如果未填写完善信息，跳转完善信息页
    browserHistory.push('/doctor/detail');
    return false;
  }
  if (data.is_verified == 1 || (data.is_verified == 2 && data.inviter_no)) {
    return true;
  }
  if ((data.is_verified == 2 && !data.inviter_no)|| data.is_verified == -1 || data.is_verified == 0 ){
    browserHistory.push('/doctor');
    return false;
  }
}

export default checkUserStatus;