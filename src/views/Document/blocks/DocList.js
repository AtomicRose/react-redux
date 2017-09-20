import React from 'react';
import getDocList from 'ACTION/Document/getDocList';

class Doc extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    handelClickGetDocList() {
        getDocList();
    }
    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={() => this.handelClickGetDocList()}>GET DOC LIST</button>
                this is
            </div>
        );
    }
}
export default Doc;