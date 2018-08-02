import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateBusiness from '../Components/CreateBusiness';
import EditBusiness from '../Components/EditBusiness';
import Businesses from '../Components/Businesses';
import Dashboard from '../Components/Dashboard';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon'
import moxios from 'moxios';

describe('CreateBusinesses component', () => {
    const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn()
    };
    global.localStorage = localStorageMock;


    const wrapper = shallow(<CreateBusiness />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('has initial state', () => {
        expect(wrapper.state().businesses).toEqual([]);
    });

    it('handles submit', () => {
        let createBusiness = sinon.spy();
        let wrapper = mount(<CreateBusiness onSubmit={createBusiness} />)
        wrapper.find('form').simulate('submit');
        moxios.wait(() => {
        });
    });

});

describe('Businesses component', () => {

    const wrapper = shallow(<Businesses />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});

describe('Dashboard component', () => {

    const wrapper = shallow(<Dashboard />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('handles delete', () => {
        let deleteBusiness = sinon.spy();
        let wrapper = mount(<Dashboard onSubmit={deleteBusiness} />)


        wrapper.find('button').simulate('click');
        moxios.wait(() => {
        });
    });

});

describe('EditBusiness component', () => {

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
    
    const wrapper = shallow(<EditBusiness params={{ params }} />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    
    it('has initial state', () => {
        expect(wrapper.state().id).toEqual('');
        expect(wrapper.state().businesses).toEqual([]);
        expect(wrapper.state().name).toEqual('');
        expect(wrapper.state().location).toEqual('');
        expect(wrapper.state().category).toEqual('');
        expect(wrapper.state().about).toEqual('');
    });

    it('changes state', () => {
        wrapper.setState({ name: 'Andela', location: 'TRM', category: 'tech', about: 'Awesome' });
        expect(wrapper.find('[name="name"]').props().value).toEqual('Andela');
        expect(wrapper.find('[name="location"]').props().value).toEqual('TRM');
        expect(wrapper.find('[name="about"]').props().value).toEqual('Awesome');
    });

    it('has the correct form fields', () => {
        expect(wrapper.find('[name="name"]')).toHaveLength(1);
        expect(wrapper.find('[name="location"]')).toHaveLength(1);
        expect(wrapper.find('[name="about"]')).toHaveLength(1);
        expect(wrapper.find('[name="category"]')).toHaveLength(1);
      });
});   


