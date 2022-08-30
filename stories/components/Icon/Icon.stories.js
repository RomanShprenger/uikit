import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, color, number } from '@storybook/addon-knobs';

import { Icon as RawIcon } from 'components';

const Icon = props => (
  <div style={{ marginRight: 5, display: 'inline-block', border: '1px solid gray', padding: 10 }}>
    <RawIcon {...props} />
  </div>
);

export default storybook
  .storiesOf('components/Icon', module)
  .addDecorator(withInfo({ propTables: [RawIcon], propTablesExclude: [Icon] }))
  .addDecorator(withKnobs)
  .add('Icon', () => (
    <>
      <Icon name="exit" />
      <Icon name={text('Icon name', 'eye')} color={color('Color', '#000000')} size={number('Size', 24)} />
    </>
  ));
