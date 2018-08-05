import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Editpassword from '../Components/Editpassword';
import Resetpassword from '../Components/Resetpassword';
import Resetpwd from '../Components/Resetpwd';
import My404Component from '../Components/My404Component';
// import ActivateAccount from '../Components/ActivateAccount';
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

    // it('handles login', () => {
    //     let login = sinon.spy();
    //     let wrapper = mount(<Login onSubmit={login} />)
    //     wrapper.find('form').simulate('submit');
    //     moxios.wait(() => {
    //     });
    // });
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
});

describe('Resetpassword component', () => {
    const wrapper = shallow(<Resetpassword />);
    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    // it('handles requestResetPass', () => {
    //     let requestResetPass = sinon.spy();
    //     let wrapper = mount(<Resetpassword onSubmit={requestResetPass} />)
    //     wrapper.find('form').simulate('submit');
    //     moxios.wait(() => { });
    // });
})

// describe('Resetwd component', () => {
//     const wrapper = shallow(<Resetpwd />);
//     xit('renders properly', () => {
//         expect(shallowToJson(wrapper)).toMatchSnapshot();
//     });
//     xit('handles requestResetPass', () => {
//         let requestResetPass = sinon.spy();
//         let wrapper = mount(<Resetpassword onSubmit={requestResetPass} />)
//         wrapper.find('form').simulate('submit');
//         moxios.wait(() => { });
//     });
// })

describe('Editpassword component', () => {
    const wrapper = shallow(<Editpassword />);
    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    // it('handles editpass onsubmit', () => {
    //     let editpass = sinon.spy();
    //     let wrapper = mount(<Editpassword onSubmit={editpass} />)
    //     wrapper.find('form').simulate('submit');
    //     moxios.wait(() => {
    //     });
    // });

})
// describe('ActivateAccount component', () => {
//     const wrapper = shallow(<ActivateAccount />);
//     it('renders properly', () => {
//         expect(shallowToJson(wrapper)).toMatchSnapshot();
//     });
// })

describe('My404Component component', () => {
    const wrapper = shallow(<My404Component />);
    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})