// import {   injectReducer } from 'REDUCER'; import createContainer from
// 'UTIL/createContainer'
import createLazyViewLoader from './createLazyViewLoader';

import docRoute from './Document/index';
// 引入需要模块的路由
import homeRoute from './Home/index';

export default {
  path: 'doctor',
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
      component: createLazyViewLoader(cb => {
        require.ensure([], require => cb(require('VIEW/Redirect')));
      })
    },

    // 无路由匹配的情况一定要放到最后，否则会拦截所有路由
    {
      path: '*',
      component: createLazyViewLoader(cb => {
        require.ensure([], require => cb(require('VIEW/404')));
      })
    }
  ]
};
