import React from 'react';
import ReactDOM from 'react-dom';
import MusicPlayer from './musicplayer';


var divStyle = {
    'marginLeft': '300px',
    'marginRight': '100px'
};

var musicList = [
    {
        url:"http://localhost:3000/music/rhcp",
        name: "RHCP - Under the Bridge",
        time: 564065
    },
    {
        url:"http://localhost:3000/music/hives",
        name: "The Hives - Hate to say I told you so",
        time: 464065
    },
    {
        url:"http://localhost:3000/music/pz",
        name: "Paralelní Zapojení - Pěna",
        time: 664065
    },
    {
        url:"http://localhost:3000/music/vagina",
        name: "Vagína - Las Chubas",
        time: 264065
    }
];

ReactDOM.render(<div style={divStyle}><MusicPlayer musicList={musicList}/></div>, document.getElementById("app"));