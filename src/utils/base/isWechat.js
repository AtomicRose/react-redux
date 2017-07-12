
let isWeixinBrowser = () => {
    return /micromessenger/.test(navigator.userAgent.toLowerCase());
};

export { isWeixinBrowser };