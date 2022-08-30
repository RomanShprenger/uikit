// eslint-disable-next-line max-classes-per-file
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TextField } from '../components/TextField';
import withFocusedState from './withFocusedState';

Enzyme.configure({
  adapter: new Adapter(),
});

describe('Test: withEmptyState HOC', () => {
  class ComponentWithFocus extends React.PureComponent {
    render() {
      return (
        <TextField focused />
      );
    }
  }

  class ComponentDisabled extends React.PureComponent {
    render() {
      return (
        <TextField disabled />
      );
    }
  }

  it('should render the component and not to change the state (default - false)', () => {
    const ConditionalComponent = withFocusedState(TextField);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(TextField)
      .props().focused)
      .toEqual(false);
  });

  it('should render the component and not to change the state (default - true)', () => {
    const ConditionalComponent = withFocusedState(ComponentWithFocus);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(ComponentWithFocus)
      .props().focused)
      .toEqual(true);
  });

  it('should render the component and change the state', () => {
    const ConditionalComponent = withFocusedState(TextField);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(TextField)
      .props().focused)
      .toEqual(false);

    wrapper.find('input')
      .simulate('focus');

    expect(wrapper.find(TextField)
      .props().focused)
      .toEqual(true);

    wrapper.find('input')
      .simulate('blur');

    expect(wrapper.find(TextField)
      .props().focused)
      .toEqual(false);
  });

  it('should render the component and save the state', () => {
    const ConditionalComponent = withFocusedState(TextField);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(TextField)
      .props().focused)
      .toEqual(false);

    wrapper.find('input')
      .simulate('blur');

    expect(wrapper.find(TextField)
      .props().focused)
      .toEqual(false);
  });

  it('should render disabled component and not change the state', () => {
    const ConditionalComponent = withFocusedState(ComponentDisabled);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(ComponentDisabled)
      .props().focused)
      .toEqual(false);

    wrapper.find('input')
      .simulate('focus');

    expect(wrapper.find(TextField)
      .props().focused)
      .toEqual(false);

    wrapper.find('input')
      .simulate('blur');

    expect(wrapper.find(TextField)
      .props().focused)
      .toEqual(false);
  });
});
