import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Editpassword from '../Components/Editpassword';
import Resetpassword from '../Components/Resetpassword';
import ActivateAccount from '../Components/ActivateAccount';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon'
import axios from 'axios'
import moxios from 'moxios'

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
});

describe('Activate account component', () => {

    const wrapper = shallow(<ActivateAccount />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});

describe('Signup component', () => {

    beforeEach(() => {
        moxios.install(axios)
    })

    afterEach(() => {
        moxios.uninstall(axios)
    })

    const wrapper = shallow(<Signup />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles submit', () => {
        let signUp = sinon.spy();
        let wrapper = mount(<Signup onSubmit={signUp} />)
        wrapper.find('form').simulate('submit');
        moxios.wait(() => { });
    });

    it('works', () => {
        let wrapper = shallow(<Signup />);
        expect(wrapper.find('form')).toHaveLength(1);
    });

});

describe('Resetpassword component', () => {
    const wrapper = shallow(<Resetpassword />);
    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})

describe('Editpassword component', () => {
    const wrapper = shallow(<Editpassword />);
    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})