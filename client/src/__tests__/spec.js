import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import MainFrame from '../components/mainframe';

jest.unmock('../components/mainframe');

describe('MainFrame', () => {
    it('AudioService should be initialized', () => {

        const mainframe = TestUtils.renderIntoDocument(
            <MainFrame/>
        );

        const checkboxNode = ReactDOM.findDOMNode(mainframe);

        expect(mainframe.audioService).not.toBeNull();
        expect(mainframe.xx).toBe(undefined);

    });
});