import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Components/Home';
import { shallowToJson } from 'enzyme-to-json';

describe('Home component', () => {
    const wrapper = shallow(<Home />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});

