import refreshToken from 'REQUEST/refreshToken';
import {goToLogin} from 'REQUEST';
/**
 * 用户访问权限拦截器
 * @export {Function} onEnter，详见以下文档：
 * https://github.com/reactjs/react-router/blob/master/docs/API.md#onEnter
 */

export default function hasToken(nextState, replace, next) {
	refreshToken().then(
        (res) => {next();}, 
        (res) => {goToLogin();}
    );
}
