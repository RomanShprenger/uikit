import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';

import { TextArea as RawTextArea } from 'components';

const TextArea = props => (
  <div style={{ display: 'inline-block', maxWidth: '250px', marginRight: '10px' }}><RawTextArea {...props} /></div>
);

export default storybook
  .storiesOf('components/TextArea', module)
  .addDecorator(withInfo({ propTables: [TextArea] }))
  .addDecorator(withKnobs)
  .add('TextArea', () => (
    <div style={{ marginTop: 25, padding: '20px', background: '#F2F5F7' }}>
      <TextArea
        disabled={boolean('Disabled', false)}
        label={text('Label text', 'Label text here')}
        helper={text('Helper text 2', 'Optional fields. You can set only a start or only a stop time.')}
        invalid={boolean('Invalid', false)}
        defaultValue={text('Value', 'Textarea autosize')}
        autosize
      />
      <TextArea
        disabled={boolean('Disabled', false)}
        label={text('Label text', 'Label text here')}
        helper={text('Helper text 2', 'Optional fields. You can set only a start or only a stop time.')}
        placeholder={text('Placeholder', 'Default textarea')}
        invalid={boolean('Invalid', false)}
        rows={3}
      />
      <div style={{ padding: '0 10px', display: 'inline-block', background: '#f2f5f6', marginRight: '5px' }}>
        <TextArea
          kind="white"
          disabled={boolean('Disabled', false)}
          label={text('Label text', 'Label text here')}
          helper={text('Helper text 2', 'Optional fields. You can set only a start or only a stop time.')}
          placeholder={text('Placeholder', 'Please enter value')}
          invalid={boolean('Invalid', false)}
          rows={3}
        />
      </div>
      <TextArea
        disabled={boolean('Disabled', false)}
        label={text('Label text', 'Label text here')}
        placeholder={text('Placeholder', 'Please enter value')}
        invalid={boolean('Invalid', false)}
        counter
        maxLength={number('MaxLength', 32)}
        rows={3}
      />
    </div>
  ));
