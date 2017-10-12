import 'whatwg-fetch';
import envs from 'CONFIG/envs';
import queryParam from 'UTIL/base/queryParam';
const AppSetting = require('CONFIG/AppSetting');
import MD5 from 'UTIL/MD5';

let defaults = {
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    },
    credentials: 'same-origin',
    ignoreAuthorization: false
};
let getToDoObj = function (todo) {
    if (typeof todo === 'undefined') {
        return {
            successDo: (res) => {
                return res;
            },
            errorDo: (res) => {
                return res;
            }
        };
    }
    if (typeof todo === 'function') {
        return {
            successDo: todo,
            errorDo: todo
        };
    }
    if (typeof todo === 'object') {
        return {
            successDo: todo.successDo,
            errorDo: todo.errorDo
        };
    }
};
let goToLogin = () => {

};
function requestStatus(code) {
    if (code === 0 || code === '0') {
        return 'SUCCESS';
    }
    if (code === 900000 || code === '900000') {
        // TODO tips friendly.
        return 'UNKNOW_ERROR';
    }
    if (code === 900001 || code === '900001' || code === 900002 || code === '900002' || code === 900003 || code === '900003' || code === 900004 || code === '900004') {
        // TODO go to login
        return 'FAILED_AUTHORIZATION';
    }
    // other errors will reject to page.
    return false;
}
let doRequest = (url, options, todoObj) => {
    let promise = new Promise((resolve, reject) => {
        delete options.headers.Authorization;
        fetch(url, options).then(
            (response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        let status = requestStatus(data.Code);
                        if (status === 'SUCCESS') {
                            resolve(todoObj.successDo(data));
                        }
                        if (status === false) {
                            reject(todoObj.errorDo(data));
                        }
                    }, () => {
                        console.log('error');
                        // to json error
                        // friendly tips
                    });
                } else {
                    console.log('error');
                    // http status is not 200.
                    // TODO friendly tips 
                }
            },
            () => {
                console.log('error');
                // request error
                // TODO friendly tips
            }
        ).catch(() => {
            console.log('error');
            // fetch error
            // TODO friendly tips
        });
    });
    return promise;
};
function translatePostData(params) {
    let dataStr = JSON.stringify(params);
    let now = new Date();
    return {
        AppVer: AppSetting.AppVersion,
        TimeStamp: now.getTime(),
        Lang: 'CN',
        DeviceName: window.navigator.userAgent,
        DeviceType: 'web',
        Token: '',
        AppKey: AppSetting.AppKey,
        Sign: getSign(dataStr, now.getTime().toString()),
        Data: dataStr
    };
}
function getSign(dataStr, TimeStampStr) {
    if (typeof dataStr !== 'string' || typeof TimeStampStr !== 'string') {
        throw Error('Arguments type must be string. dataStr & timeStampStrt');
    }
    let AppKey = AppSetting.AppKey.toString();
    let AppSecret = AppSetting.AppSecret.toString();
    return console.log(MD5(AppKey + AppSecret + dataStr + TimeStampStr, 16));
}
let HttpRequest = {
    post: (requestObj, todo, opts) => {
        let options = Object.assign({}, defaults);
        Object.assign(options, opts);
        options.method = 'POST';
        if (!options.body) {
            options.body = translatePostData(requestObj.params);
        }
        let url = requestObj.url;
        return doRequest(url, options, getToDoObj(todo));
    },
    put: (requestObj, todo, opts) => {
        let options = Object.assign({}, defaults);
        Object.assign(options, opts);
        options.method = 'PUT';
        if (!options.body) {
            options.body = JSON.stringify(requestObj.params);
        }
        let url = requestObj.url;
        return doRequest(url, options, getToDoObj(todo));
    },
    get: (requestObj, todo, opts) => {
        let options = Object.assign({}, defaults);
        Object.assign(options, opts);
        options.method = 'GET';
        let url = requestObj.url;
        let keys = Object.keys(requestObj.params);
        for (var i = 0; i < keys.length; i++) {
            let currentKey = keys[i];
            if (i === 0 && url.indexOf('?') != -1) {
                url = url + '&' + currentKey + '=' + requestObj.params[currentKey];
            } else {
                url = url + (i === 0 ? '?' : '&') + currentKey + '=' + requestObj.params[currentKey];
            }
        }
        return doRequest(url, options, getToDoObj(todo));
    },
    delete: (requestObj, todo, opts) => {
        let options = Object.assign({}, defaults);
        Object.assign(options, opts);
        options.method = 'DELETE';
        if (!options.body) {
            options.body = JSON.stringify(requestObj.params);
        }
        let url = requestObj.url;
        return doRequest(url, options, getToDoObj(todo));
    }
};
export default HttpRequest;
export { goToLogin };