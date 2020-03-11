import React from 'react';
import { InMemoryCache } from 'apollo-boost';
import Header from '../Header';
import {
  GetInputValueDocument,
  GetFavoritesDocument,
} from '../../__generated__';
import {
  renderApollo,
  cleanup,
  waitForElement,
  fireEvent,
  wait,
} from '../../setupTests';

describe('Header', () => {
  afterEach(cleanup);

  it('should update input with new value', async () => {
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GetInputValueDocument,
      data: { inputValue: '' },
    });
    cache.writeQuery({
      query: GetFavoritesDocument,
      data: { favorites: [] },
    });

    const { getByPlaceholderText } = renderApollo(<Header />, {
      cache,
    });

    const inputElement = await waitForElement(() =>
      getByPlaceholderText('type a movie name...')
    );

    const inputValue = 'test';

    fireEvent.change(inputElement, { target: { value: inputValue } });

    await wait();

    expect(inputElement).toHaveValue(inputValue);
  });
});
