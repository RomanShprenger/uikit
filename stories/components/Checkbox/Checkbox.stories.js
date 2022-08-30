import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { Checkbox as RawCheckbox } from 'components';

const Checkbox = props => (
  <span style={{ marginRight: 20, paddingTop: 20 }}>
    <RawCheckbox {...props} />
  </span>
);

class CheckboxWithState extends React.PureComponent {
  state = {
    checked: false,
  };

  onChange = (e) => {
    const { checked } = this.state;
    this.setState({ checked: e.target.checked }, () => console.log(checked));
  };

  render() {
    const { checked } = this.state;

    return (
      <span style={{ marginRight: 20, paddingTop: 20 }}>
        <RawCheckbox {...this.props} checked={checked} onChange={this.onChange} />
      </span>
    );
  }
}

export default storybook
  .storiesOf('components/Checkbox', module)
  .addDecorator(withInfo({ propTables: [RawCheckbox], propTablesExclude: [Checkbox] }))
  .addDecorator(withKnobs)
  .add('Checkbox', () => (
    <>
      <Checkbox id="first">Default</Checkbox>
      <Checkbox id="second" checked>True checked</Checkbox>
      <CheckboxWithState id="third">With state</CheckboxWithState>
      <Checkbox id="fourth" onChange={() => console.log('change')} />
      <Checkbox id="fifth" disabled={boolean('Disabled', true)}>Disabled</Checkbox>
      <Checkbox id="sixth" indeterminate>Indeterminate</Checkbox>
    </>
  ));
