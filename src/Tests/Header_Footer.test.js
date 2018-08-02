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
});

