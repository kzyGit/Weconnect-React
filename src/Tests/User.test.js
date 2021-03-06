import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Editpassword from '../Components/Editpassword';
import Resetpassword from '../Components/Resetpassword';
import Resetpwd from '../Components/Resetpwd';
import My404Component from '../Components/My404Component';
import ActivateAccount from '../Components/ActivateAccount';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import moxios from 'moxios';

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


describe('Signup component', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });
    let wrapper = shallow(<Signup />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles submit', () => {
        let signUp = sinon.spy();
        wrapper = mount(<Signup onSubmit={signUp} />);
        wrapper.find('form').simulate('submit');
        moxios.wait(() => { });
    });
});

describe('Resetpassword component', () => {
    const wrapper = shallow(<Resetpassword />);
    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});

describe('Resetpwd component', () => {
    const params = {
        params: {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mjc1OTM3NDgsImlhdCI6MTUyNzU5MzQ0OCwic3ViIjozMH0.euWDeyRidSOrHKEHZGdPmedDg7yHyhrgla0IJbUV2Qo',
        },
    };
    const wrapper = shallow(<Resetpwd params={{ params }} />);
    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});

describe('Editpassword component', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    let wrapper = shallow(<Editpassword />);
    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles editpass onsubmit', () => {
        let editpass = sinon.spy();
        wrapper = mount(<Editpassword onSubmit={editpass} />);
        wrapper.find('form').simulate('submit');
        moxios.wait(() => {
        });
    });

});
describe('ActivateAccount component', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    const params = {
        params: {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzM0NTg4OTEsImlhdCI6MTUzMzQ1Nzk5MSwic3ViIjoxfQ.kyBs0i9IdYL1g0mTZkmBRkDJBjI0dnXii5MebQrRmE8',
        },
    };
    
    it('renders properly', () => {
        let wrapper = shallow(<ActivateAccount params={{ params }} />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});

describe('My404Component component', () => {
    let wrapper = shallow(<My404Component />);
    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('handles redirect onbuttonclick', () => {
        let redirect = sinon.spy();
        wrapper = mount(<My404Component onClick={redirect} />);
        wrapper.find('button').simulate('click');
        moxios.wait(() => {
        });
    });
});