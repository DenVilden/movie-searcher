import React from 'react';
import ErrorMessage from '../ErrorMessage';
import { render } from '@testing-library/react';

describe('ErrorMessage', () => {
  it('should return server side error', async () => {
    const mockError: any = {
      graphQLErrors: [
        { extensions: { response: { status: 500, statusText: 'an error' } } },
      ],
    };

    const { findByText, debug } = render(<ErrorMessage error={mockError} />);

    await findByText(/an error/i);
    await findByText('500');
  });

  it('should return client side error', async () => {
    const mockError: any = {
      networkError: {
        statusCode: 401,
        message: 'an error',
      },
    };

    const { findByText } = render(<ErrorMessage error={mockError} />);

    await findByText(/an error/i);
    await findByText('401');
  });
});
