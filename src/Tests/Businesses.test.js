import React from 'react';
import { shallow } from 'enzyme';
import Businesses from '../Components/Businesses';
import CreateBusiness from '../Components/CreateBusiness';
import EditBusiness from '../Components/EditBusiness';
import Business from '../Components/Business';
import Header from '../Components/Header';
import Dashboard from '../Components/Dashboard';
import { shallowToJson } from 'enzyme-to-json';
import ReactDOM from 'react-dom';


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

describe('Business component', () => {
    const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn()
    };
    global.localStorage = localStorageMock;

    it('renders properly', () => {
        const div = document.createElement('Business');
      ReactDOM.render(<Business />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

});

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
        expect(wrapper.state().name).toEqual('');
        expect(wrapper.state().location).toEqual('');
        expect(wrapper.state().category).toEqual('');
        expect(wrapper.state().about).toEqual('');
    });

});

describe('Dashboard component', () => {

    const wrapper = shallow(<Dashboard />);

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