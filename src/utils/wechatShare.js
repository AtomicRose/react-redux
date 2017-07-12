// import WechatJSSDK from 'weixin-js-sdk';
import WechatService from 'SERVICE/WechatService';
import env from 'CONFIG/envs';
// import CommonStorage from 'STORAGE/CommonStorage';
// var wx = require('weixin-js-sdk');

// let wxObj;
let shareObj = {
  // title: '名医主刀VIP专属预约通道', 
  // link: env.static.vip,
  imgUrl: env.static.doctor + '/static/share-icon.png'
  // desc: '汇集国内外最顶尖名医资源，快速灵活高效实现对接！让天下没有难看的病！'
};
const _shareInfo = (share) => {
  wx.onMenuShareAppMessage({
    title: share.title, // 分享标题 名医主刀VIP专属预约通道
    link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致, env.static.vip
    imgUrl: share.imgUrl, // 分享图标
    desc: share.desc, // 分享描述
    type: 'link'
  });
  wx.onMenuShareTimeline({
    title: share.title, // 分享标题
    link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: share.imgUrl, // 分享图标
    desc: share.desc, // 分享描述
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
      console.log('success');
    },
    cancel: function () {
      console.log('cancel');
    }
  });
};
const _init = () => {
  return new Promise((resolve, reject) => {
    let params = {
      url: window.location.href //env.static.doctor
    };
    WechatService.getWechatSign(params).then(
      (res) => {
        let _config = res.data;
        let wechatConfig = {
          // debug: true,
          appId: _config.app_id, // 必填，公众号的唯一标识
          timestamp: _config.timestamp, // 必填，生成签名的时间戳
          nonceStr: _config.noncestr, // 必填，生成签名的随机串
          signature: _config.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        };
        window.wechatConfig = wechatConfig;
        resolve(wechatConfig);
      },
      (res) => {
        reject();
        console.log('err: 微信初始化失败！', res);
      }
    );
  });
};
const shareInfo = (shareInfo) => {
  let newObj = Object.assign({}, shareObj, shareInfo);
  _init().then((config) => {
    wx.config(config);
    wx.ready(function () {
      _shareInfo(newObj);
    });
  }, () => {
    console.log('get wechat signature error.');
  });
}
// const initWechatShare = _init;
export {
  shareInfo
};