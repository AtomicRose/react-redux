import createLazyViewLoader from '../createLazyViewLoader';
const r = {
    path: 'doctor',
    indexRoute: {
        component: createLazyViewLoader(cb => {
            require.ensure([], require => cb(require('VIEW/Home')));
        })
    },

    childRoutes: []
};
export default r;