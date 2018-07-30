import React from 'react';
import { shallow } from 'enzyme';
import Businesses from '../Components/Businesses';
import { shallowToJson } from 'enzyme-to-json';


describe('Businesses component', () => {

    const wrapper = shallow(<Businesses />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('contains divs', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });
    it('contains Header', () => {
        expect(wrapper.find('Header')).toHaveLength(1);
    });
    it('contains HomeContent', () => {
        expect(wrapper.find('HomeContent')).toHaveLength(1);
    });
    it('contains Footer', () => {
        expect(wrapper.find('Footer')).toHaveLength(1);
    });


});

