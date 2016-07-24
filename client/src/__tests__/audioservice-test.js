import AudioService from '../audio';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import MusicPlayer from '../musicplayer';

jest.unmock('../musicplayer');
jest.unmock('../audio');

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

describe('AudioService', () => {
    it('AudioService should throw an error when initialized without music list', () => {

        expect(() => {
            const mainframe = TestUtils.renderIntoDocument(
                <MusicPlayer/>
            );

            const node = ReactDOM.findDOMNode(mainframe);
        }).toThrowError("Music list must be provided");


    });

});