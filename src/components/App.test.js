import { render } from '@testing-library/react';
import React from 'react';
import App from './App';
import { MockedProvider } from '@apollo/react-testing';

import {USERS_QUERY} from './UserList';


const mocks = [
  {
    request: {
      query: USERS_QUERY
    },
    result: {
      data: {
        users: { id: '1'},
      },
    },
  },
];

test('App component renders without crashing', async () => {
  render( <MockedProvider mocks={mocks} addTypename={false}>
    <App />
    </MockedProvider>)
  }
);
