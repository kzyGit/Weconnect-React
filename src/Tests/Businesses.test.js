import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateBusiness from '../Components/CreateBusiness';
import EditBusiness from '../Components/EditBusiness';
import Businesses from '../Components/Businesses';
import Business from '../Components/Business';
import Dashboard from '../Components/Dashboard';
import BackNav from '../Components/BackNav';
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

    it('handles searchByName', () => {
        let searchByName = sinon.spy();
        let wrapper = mount(<Businesses onSubmit={searchByName} />)
        wrapper.find('#searchform').simulate('submit');
        moxios.wait(() => {
        });
    });

    it('handles filter', () => {
        let filter = sinon.spy();
        let wrapper = mount(<Businesses onSubmit={filter} />)
        wrapper.find('#filterform').simulate('submit');
        moxios.wait(() => {
        });
    });

    it('handles changename', () => {
        let changename = sinon.spy();
        let wrapper = mount(<Businesses onSubmit={changename} />)
        wrapper.find('#searchname').simulate('change');
        moxios.wait(() => {
        });
    });

    it('handles changefilter', () => {
        let changefilter = sinon.spy();
        let wrapper = mount(<Businesses onSubmit={changefilter} />)
        wrapper.find('#searchfilter').simulate('change');
        moxios.wait(() => {
        });
    });
});

describe('Dashboard component', () => {

    const wrapper = shallow(<Dashboard />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});

describe('BackNav component', () => {
    const wrapper = shallow(<BackNav />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
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


