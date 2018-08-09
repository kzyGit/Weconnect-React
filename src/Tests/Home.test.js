import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Components/Home';
import { shallowToJson } from 'enzyme-to-json';
import ReactDOM from 'react-dom';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Home component', () => {
    const wrapper = shallow(<Home />);

    it('renders properly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});

