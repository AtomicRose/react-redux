import createLazyViewLoader from '../createLazyViewLoader';
export default {
    path : 'doctor',
    indexRoute : {
        component: createLazyViewLoader(cb => {
            require.ensure([], require => cb(require('VIEW/Home')));
        })
    },

    childRoutes : []
};