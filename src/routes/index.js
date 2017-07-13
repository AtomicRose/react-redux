// import {   injectReducer } from 'REDUCER'; import createContainer from
// 'UTIL/createContainer'
import createLazyViewLoader from './createLazyViewLoader';

import docRoute from './document/index';
// 引入需要模块的路由
import homeRoute from './pages/home';

let r = {
  path: '/',
  component: require('VIEW/App').default,
  indexRoute: {
    component: createLazyViewLoader(cb => {
      require.ensure([], require => cb(require('VIEW/App')));
    })
  },

  childRoutes: [
    // 加载子模块路由
    docRoute,
    homeRoute,
    // 重定向
    {
      path: 'redirect',
      component: require('VIEW/Redirect').default
    },

    // 无路由匹配的情况一定要放到最后，否则会拦截所有路由
    {
      path: '*',
      component: require('VIEW/404').default
    }
  ]
};

export default r;
