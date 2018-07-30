import React from 'react';
import { shallow } from 'enzyme';
import EditBusiness from '../Components/EditBusiness';
import { shallowToJson } from 'enzyme-to-json';


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

    it('contains divs', () => {
        expect(wrapper.find('div')).toHaveLength(9);
    });

    it('contains button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it('contains input fields', () => {
        expect(wrapper.find('input')).toHaveLength(2);
    });

    it('contains select fields', () => {
        expect(wrapper.find('select')).toHaveLength(1);
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

