import React from 'react';
import ReactDOM from 'react-dom';
import MainFrame from './components/mainframe';


var divStyle = {
    'marginLeft': '300px',
    'marginRight': '100px'
};

ReactDOM.render(<div style={divStyle}><MainFrame/></div>, document.getElementById("app"));