// eslint-disable-next-line max-classes-per-file
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TextField } from '../components/TextField';
import withEmptyState from './withEmptyState';

Enzyme.configure({
  adapter: new Adapter(),
});

describe('Test: withEmptyState HOC', () => {
  class ComponentNotEmpty extends React.PureComponent {
    render() {
      return (
        <TextField empty={false} />
      );
    }
  }

  class ComponentWithValue extends React.PureComponent {
    render() {
      return (
        <TextField value="test" />
      );
    }
  }

  class ComponentWithDefaultValue extends React.PureComponent {
    render() {
      return (
        <TextField defaultValue="test" />
      );
    }
  }

  it('should render the component and not to change the state (default - true)', () => {
    const ConditionalComponent = withEmptyState(TextField);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(TextField)
      .props().empty)
      .toEqual(true);
  });

  it('should render the component and not to change the state (default - false)', () => {
    const ConditionalComponent = withEmptyState(ComponentNotEmpty);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(ComponentNotEmpty)
      .props().empty)
      .toEqual(true);
  });

  it('should render the component and change the state', () => {
    const ConditionalComponent = withEmptyState(TextField);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(TextField)
      .props().empty)
      .toEqual(true);

    wrapper.find('input')
      .simulate('change', {
        target: {
          value: 'test text',
        },
      });

    expect(wrapper.find(TextField)
      .props().empty)
      .toEqual(false);
  });

  it('should render the component and save the state', () => {
    const ConditionalComponent = withEmptyState(TextField);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(TextField)
      .props().empty)
      .toEqual(true);

    wrapper.find('input')
      .simulate('change', {
        target: {
          value: ' ',
        },
      });

    expect(wrapper.find(TextField)
      .props().empty)
      .toEqual(false);
  });

  it('should render the component with value and change the state', () => {
    const ConditionalComponent = withEmptyState(ComponentWithValue);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(TextField)
      .props().empty)
      .toEqual(false);

    wrapper.find('input')
      .simulate('change', {
        target: {
          value: 'test text',
        },
      });

    expect(wrapper.find(TextField)
      .props().empty)
      .toEqual(false);
  });

  it('should render the component with default value and change the state', () => {
    const ConditionalComponent = withEmptyState(ComponentWithDefaultValue);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find(TextField)
      .props().empty)
      .toEqual(false);

    wrapper.find('input')
      .simulate('change', {
        target: {
          value: 'test text',
        },
      });

    expect(wrapper.find(TextField)
      .props().empty)
      .toEqual(false);
  });
});
