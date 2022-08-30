import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import { ProgressBar as RawProgressBar } from 'components';

const ProgressBar = props => (
  <div>
    <RawProgressBar {...props} />
  </div>
);

export default storybook
  .storiesOf('components/ProgressBar', module)
  .addDecorator(withInfo({ propTables: [RawProgressBar], propTablesExclude: [ProgressBar] }))
  .addDecorator(withKnobs)
  .add('ProgressBar', () => (
    <div style={{ background: '#E5E5E5', padding: '20px' }}>
      <ProgressBar
        progress={57}
        from="2,150"
        to="2,850"
        helper="57% received"
      />
    </div>
  ));
