// eslint-disable-next-line max-classes-per-file
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TextField } from '../components/TextField';
import withCounter from './withCounter';

Enzyme.configure({
  adapter: new Adapter(),
});

describe('Test: withEmptyState HOC', () => {
  class ComponentWithCounter extends React.PureComponent {
    render() {
      return (
        <TextField counter maxLength={32} value="test" />
      );
    }
  }

  class ComponentWithCounterAndNoValue extends React.PureComponent {
    render() {
      return (
        <TextField counter maxLength={32} />
      );
    }
  }

  class ComponentWithNoCounterButMaxLength extends React.PureComponent {
    render() {
      return (
        <TextField maxLength={32} />
      );
    }
  }

  class ComponentWithNoMaxLengthButCounter extends React.PureComponent {
    render() {
      return (
        <TextField counter />
      );
    }
  }

  class ComponentWithoutCounter extends React.PureComponent {
    render() {
      return (
        <TextField counter={false} />
      );
    }
  }

  it('should render the component without counterText', () => {
    const ConditionalComponent = withCounter(TextField);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find('.yui-input__helper--counter')).toHaveLength(0);
  });

  it('should render the component and change the state after adding text', () => {
    const ConditionalComponent = withCounter(ComponentWithCounter);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find('.yui-input__helper--counter')
      .props().children)
      .toEqual('28/32');

    wrapper.find('input')
      .simulate('change', {
        target: {
          value: 'test text',
        },
      });

    expect(wrapper.find('.yui-input__helper--counter')
      .props().children)
      .toEqual('23/32');
  });

  it('should render the component and not change the state after adding empty text', () => {
    const ConditionalComponent = withCounter(ComponentWithCounterAndNoValue);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find('.yui-input__helper--counter')
      .props().children)
      .toEqual('32/32');

    wrapper.find('input')
      .simulate('change', {
        target: {
          value: '',
        },
      });

    expect(wrapper.find('.yui-input__helper--counter')
      .props().children)
      .toEqual('32/32');
  });

  it('should render the component without counterText, but with maxLength and not to set counterText', () => {
    const ConditionalComponent = withCounter(ComponentWithNoCounterButMaxLength);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find('.yui-input__helper--counter')).toHaveLength(0);
  });

  it('should render the component without maxLength, but with counter and not change counterText', () => {
    const ConditionalComponent = withCounter(ComponentWithNoMaxLengthButCounter);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find('.yui-input__helper--counter')
      .props().children)
      .toEqual('');

    wrapper.find('input')
      .simulate('change', {
        target: {
          value: 'test text',
        },
      });

    expect(wrapper.find('.yui-input__helper--counter')
      .props().children)
      .toEqual('');
  });

  it('should render the component without counter and not to set counterText', () => {
    const ConditionalComponent = withCounter(ComponentWithoutCounter);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find('.yui-input__helper--counter')).toHaveLength(0);
  });
});
