import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Resetpassword from '../Components/Resetpassword';
import Resetpwd from '../Components/Resetpwd';
import { shallowToJson } from 'enzyme-to-json';


describe('Login component', () => {

    const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn()
    };
    global.localStorage = localStorageMock;

    const wrapper = shallow(<Login />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('contains Header', () => {
        expect(wrapper.find('Header')).toHaveLength(1);
    });
    it('contains Footer', () => {
        expect(wrapper.find('Footer')).toHaveLength(1);
    });

    it('contains divs', () => {
        expect(wrapper.find('div')).toHaveLength(8);
    });

    it('contains headers', () => {
        expect(wrapper.find('h3')).toHaveLength(1);
    });

    it('contains Forms', () => {
        expect(wrapper.find('form')).toHaveLength(1);
    });

    it('contains button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('contains Link', () => {
        expect(wrapper.find('Link')).toHaveLength(2);
    });
});


describe('Signup component', () => {

    const wrapper = shallow(<Signup />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('contains Header', () => {
        expect(wrapper.find('Header')).toHaveLength(1);
    });
    it('contains Footer', () => {
        expect(wrapper.find('Footer')).toHaveLength(1);
    });

    it('contains divs', () => {
        expect(wrapper.find('div')).toHaveLength(10);
    });

    it('contains headers', () => {
        expect(wrapper.find('h3')).toHaveLength(1);
    });

    it('contains Forms', () => {
        expect(wrapper.find('form')).toHaveLength(1);
    });

    it('contains button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });
});

describe('Resetpassword component', () => {

    const wrapper = shallow(<Resetpassword />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})

