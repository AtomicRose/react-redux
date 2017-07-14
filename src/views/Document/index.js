import 'SCSS/document/index.scss';
import React from 'react';

import img from 'IMAGE/test.jpg';

class Doc extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log(3333);
    }
    render() {
        return (
            <div>
                <img src={img} width="200" alt=""/>
                <div className="ivy-doc"></div>
            </div>
        );

    }
}

export default Doc;