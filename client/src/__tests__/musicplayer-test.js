import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import MusicPlayer from '../musicplayer';

jest.unmock('../musicplayer');

var musicList = [
    {
        url:"someurl",
        name: "song1",
        time: 564065
    },
    {
        url:"someurl",
        name: "song2",
        time: 564065
    },
    {
        url:"someurl",
        name: "song3",
        time: 564065
    }
];

describe('MusicPlayer', () => {
    it('AudioService should be initialized', () => {



        const mainframe = TestUtils.renderIntoDocument(
            <MusicPlayer musicList={musicList}/>
        );

        //const node = ReactDOM.findDOMNode(mainframe);

        expect(mainframe.audioService).not.toBeNull();
        expect(mainframe.xx).toBe(undefined);

    });

    it('Function timeToRead should map time in miliseconds to human readable form', () => {

        const player = TestUtils.renderIntoDocument(
            <MusicPlayer musicList={musicList} />
        );


        expect(player.timeToRead(1000)).toEqual("0:01");
        expect(player.timeToRead(1001)).toEqual("0:01");
        expect(player.timeToRead(356000)).toEqual("5:56");
        expect(player.timeToRead(356020)).toEqual("5:56");
        expect(player.timeToRead(302000)).toEqual("5:02");


    });
});