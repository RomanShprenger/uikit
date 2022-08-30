import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withCheckedState from './withCheckedState';
import { Checkbox } from '../components/Checkbox';

Enzyme.configure({
  adapter: new Adapter(),
});

describe('Test: withCheckedState HOC', () => {
  class Component extends React.PureComponent {
    render() {
      return (
        <Checkbox id="0" checked={false} type="checkbox" />
      );
    }
  }

  it('should render the component and not to change the state (default)', () => {
    const ConditionalComponent = withCheckedState(Component);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find('.yui-checkbox--active')).toHaveLength(0);
  });

  it('should render the component and change the state', () => {
    const ConditionalComponent = withCheckedState(Component);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find('.yui-checkbox--active')).toHaveLength(0);

    wrapper.find('input')
      .simulate('change', {
        target: {
          id: '0',
          checked: true,
        },
      });

    expect(wrapper.find('.yui-checkbox--active')).toHaveLength(1);
  });

  it('should render the component and save the state', () => {
    const ConditionalComponent = withCheckedState(Component);
    const wrapper = mount(<ConditionalComponent />);

    expect(wrapper.find('.yui-checkbox--active')).toHaveLength(0);

    wrapper.find('input')
      .simulate('change', {
        target: {
          id: '0',
          checked: false,
        },
      });

    expect(wrapper.find('.yui-checkbox--active')).toHaveLength(0);
  });
});
