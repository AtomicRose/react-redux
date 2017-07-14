import createLazyViewLoader from '../createLazyViewLoader';
export default {
  path: 'document',
  indexRoute: {
    component: createLazyViewLoader(cb => {
      require.ensure([], require => cb(require('VIEW/Document')));
    })
  },
  childRoutes: []
};