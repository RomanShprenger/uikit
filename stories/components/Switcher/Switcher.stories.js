import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { Switcher as RawSwitcher } from 'components';

class Switcher extends React.PureComponent {
  render() {
    return (
      <span style={{ marginRight: 20, paddingTop: 20 }}>
        <RawSwitcher
          {...this.props}
        />
      </span>
    );
  }
}

export default storybook
  .storiesOf('components/Switcher', module)
  .addDecorator(withInfo({ propTables: [RawSwitcher], propTablesExclude: [Switcher] }))
  .addDecorator(withKnobs)
  .add('Switcher', () => (
    <>
      <Switcher id="first">Default</Switcher>
      <Switcher id="second" />
      <Switcher id="third" disabled={boolean('Disabled', true)}>Disabled</Switcher>
    </>
  ));
