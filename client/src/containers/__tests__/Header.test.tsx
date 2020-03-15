import React from 'react';
import { InMemoryCache } from '@apollo/client';
import { Header } from '../Header';
import {
  GetInputValueDocument,
  GetFavoritesDocument,
} from '../../generated/queries.generated';
import { renderApollo, fireEvent } from '../../setupTests';

describe('Header', () => {
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

    const { findByPlaceholderText } = renderApollo(<Header />, {
      cache,
    });

    const inputElement = await findByPlaceholderText('type a movie name...');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    const changedInputElement = await findByPlaceholderText(
      'type a movie name...'
    );

    expect(changedInputElement).toHaveProperty('value', 'test');
  });
});
