import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Components/Home';
import { shallowToJson } from 'enzyme-to-json';

describe('Home component', () => {

    const wrapper = shallow(<Home />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('contains divs', () => {
        expect(wrapper.find('div')).toHaveLength(3);
    });
    it('contains Header', () => {
        expect(wrapper.find('Header')).toHaveLength(1);
    });
    it('contains Headers', () => {
        expect(wrapper.find('h3')).toHaveLength(2);
    });
    it('contains Footer', () => {
        expect(wrapper.find('Footer')).toHaveLength(1);
    });

});
