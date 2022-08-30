import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import { Select as RawSelect } from 'components';

const Select = props => (
  <div style={{ marginRight: 5, width: '200px', display: 'inline-block' }}><RawSelect {...props} /></div>
);


export default storybook
  .storiesOf('components/Select', module)
  .addDecorator(withInfo({ propTables: [Select] }))
  .addDecorator(withKnobs)
  .add('Select', () => (
    <>
      <Select caretIcon={text('Caret', 'arrow-compact-down')} />
      <Select
        icon={text('Icon', 'exit')}
        iconSize={20}
        label={text('Label text', 'Label text here')}
        disabled={boolean('Disabled', false)}
        helper={text('Helper text', 'Helper message')}
        invalid={boolean('Invalid', false)}
        options={[{ value: 'option1', label: 'Option 1' }, { value: 'option2', label: 'Option 2' }]}
      />
      <div style={{ padding: '0 10px', width: '200px', display: 'inline-block', background: '#f2f5f6' }}>
        <Select
          kind="white"
          label={text('Label text', 'Label text here')}
          disabled={boolean('Disabled', false)}
          helper={text('Helper text', 'Helper message')}
          invalid={boolean('Invalid', false)}
          options={[{ value: 'option1', label: 'Option 1' }, { value: 'option2', label: 'Option 2' }]}
        />
      </div>
    </>
  ));
