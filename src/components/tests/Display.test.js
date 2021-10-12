import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from '../Display';
import fetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const testDisplay = {
    //add in approprate test data structure here.
    name: 'Show Name',
    summary: 'Show summary',
    seasons: [
        { id: 0, name: 'Season Name1', episodes: [] },
        { id: 1, name: 'Season Name2', episodes: [] },
        { id: 2, name: 'Season Name3', episodes: [] }
    ]
}

test('renders Display without error', () => {
    render(<Display />);

    const image = screen.queryByAltText('header image');
    expect(image).toBeInTheDocument();

});

test('renders button is pressed, the show component will display', async () => {
    render(<Display />);
    fetchShow.mockResolvedValueOnce(testDisplay);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findAllByTestId('show-container');
    expect(show).toHaveLength(1);

});

test('renders fetch button is pressed, select options rendered is equal to test data', async () => {
    render(<Display />);
    fetchShow.mockResolvedValueOnce(testDisplay);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const selectOptions = await screen.findAllByTestId("season-option");

    expect(selectOptions.length).toEqual(testDisplay.seasons.length);
})

test('renders fetch button is pressed, optional function is called', async () => {
    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc} />);
    fetchShow.mockResolvedValueOnce(testDisplay);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor( () => expect(displayFunc).toHaveBeenCalledTimes(1));

})












///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.