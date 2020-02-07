import React from 'react';
import UserList from './UserList';
import { MockedProvider } from '@apollo/react-testing';

import { render, waitForElement } from '@testing-library/react'

import {USERS_QUERY} from './UserList';
import testData from './UserList.testdata.json';

const waitForExpect = require("wait-for-expect")

waitForExpect.defaults.timeout = 10000;

const mocks = [
  {
    request: {
      query: USERS_QUERY
    },
    result: {
      data:  testData.data
    }
  }
];

test('UserList shows first user\'s name', async () => {

    const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserList />
    </MockedProvider>)

  await waitForElement(() => getByText(mocks[0].result.data.users[0].name, {exact: false}))

}, 12000
);
