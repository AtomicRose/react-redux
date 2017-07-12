const path = require('path');

const rootPath = path.resolve(__dirname, '..');
const src = path.join(rootPath, 'src');

const common = {
    DEPLOY_SERVICE_PATH: '/doctor',
    APP_ID: 'MYZD-DOCTOR-H5',
    path: {
        rootPath: rootPath,
        src: path.join(rootPath, 'src'),
        dist: path.join(rootPath, 'dist'),
        indexHTML: path.join(src, 'index.html'),
        staticDir: path.join(rootPath, 'static')
    }
}

module.exports = common;