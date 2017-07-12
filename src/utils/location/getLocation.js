
import getUserLocation from 'ACTION/common/getUserLocation';
import getCityList from 'ACTION/common/getCityList';

const getLocation = (data) =>  {
    console.log('getLocation data', data);
    // if (!data || !data.locationCity) {
    getUserLocation(); // 异步获取当前用户定位action
    getCityList(); // 异步获取所有城市列表
    // }
}

export default getLocation;