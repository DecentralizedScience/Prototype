import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import NameCell from './NameCell'
import React from 'react';
import faker from 'faker';

configure({adapter: new Adapter()});

describe('<NameCell />', () => {
  it('Renders the name of the user', () => {
    const name = faker.name.findName()
    const nameCell = shallow(<NameCell name={name} />);
    console.log(nameCell);
    expect(nameCell.text()).to.include(name);
  })

})
