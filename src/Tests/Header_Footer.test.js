import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { shallowToJson } from 'enzyme-to-json';


describe('Footer component', () => {

    const wrapper = shallow(<Footer />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('contains a div', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });

    it('contains Link', () => {
        expect(wrapper.find('Link')).toHaveLength(1);
    });

});

describe('Header component', () => {

    const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn()
    };
    global.localStorage = localStorageMock;

    const params = {
        params: {
            id: 1,
        },
    };

    const wrapper = shallow(<Header params={{ params }} />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('contains divs', () => {
        expect(wrapper.find('div')).toHaveLength(4);
    });

    it('contains Link', () => {
        expect(wrapper.find('Link')).toHaveLength(5);
    });
    it('contains Buttons', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('contains Navigation ', () => {
        expect(wrapper.find('nav')).toHaveLength(1);
    });
    it('contains Lists ', () => {
        expect(wrapper.find('ul')).toHaveLength(1);
    });

});

