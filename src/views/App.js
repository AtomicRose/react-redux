import 'SCSS/framework.scss';
import React from 'react';

const App = ({children, location}) => {
    return (
        <div>
            {children}
        </div>
    );
};
window.IVYCollect.setOptions({
    appid: __PROD__
        ? __APP_ID__
        : __APP_ID__ + '-DEV'
});

export default App;
