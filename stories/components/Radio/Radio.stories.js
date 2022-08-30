import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { Radio as RawRadio } from 'components';

class Radio extends React.PureComponent {
  render() {
    return (
      <span style={{ marginRight: 20, paddingTop: 20 }}>
        <RawRadio
          {...this.props}
        />
      </span>
    );
  }
}

export default storybook
  .storiesOf('components/Radio', module)
  .addDecorator(withInfo({ propTables: [RawRadio], propTablesExclude: [Radio] }))
  .addDecorator(withKnobs)
  .add('Radio', () => (
    <>
      <Radio id="first" name="test">Default</Radio>
      <Radio id="second" name="test">Default</Radio>
      <Radio id="third" disabled={boolean('Disabled', true)}>Disabled</Radio>
    </>
  ));
