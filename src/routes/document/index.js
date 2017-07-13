import createLazyViewLoader from '../createLazyViewLoader';
const r = {
    path: 'document',
    indexRoute: {
        component: createLazyViewLoader(cb => {
            require.ensure([], require => cb(require('VIEW/Document')));
        })
    },

    childRoutes: []
};
export default r;