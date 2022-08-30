import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';

import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { TextField as RawTextField, Icon, Button } from 'components';

const TextField = (props) => (
  <div style={{ display: 'inline-block', maxWidth: '250px', marginRight: '10px' }}><RawTextField {...props} /></div>
);

const numberMask = createNumberMask({
  prefix: '$ ',
  suffix: '',
  includeThousandsSeparator: false,
  allowDecimal: true,
  integerLimit: 2,
});

export default storybook
  .storiesOf('components/TextField', module)
  .addDecorator(withInfo({ propTables: [TextField] }))
  .addDecorator(withKnobs)
  .add('TextField', () => (
    <div style={{ marginTop: 25 }}>
      <TextField
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        elementAfter={(
          <Button kind="inside" size="l" format="icon">
            <Icon name="eye" />
          </Button>
        )}
        label={text('Label text', '(000) 000-0000')}
        helper={text('Helper text 1', 'Masked input')}
        defaultValue={10000000}
      />
      <TextField
        mask={numberMask}
        label={text('Label text', '$ 00.00')}
        helper={text('Helper text 1', 'Masked input')}
      />
      <TextField
        disabled={boolean('Disabled', false)}
        label={text('Label text', 'Label text here')}
        helper={text('Helper text 2', 'Optional fields. You can set only a start or only a stop time.')}
        invalid={boolean('Invalid', false)}
        type="number"
        defaultValue={0}
      />
      <TextField
        disabled={boolean('Disabled', false)}
        label={text('Label text', 'Label text here')}
        helper={text('Helper text 2', 'Optional fields. You can set only a start or only a stop time.')}
        invalid={boolean('Invalid', false)}
        type="text"
        // defaultValue={text('text', '  ')}
      />
      <TextField
        disabled={boolean('Disabled', false)}
        label={text('Label text', 'Label text here')}
        helper={text('Helper text 2', 'Optional fields. You can set only a start or only a stop time.')}
        invalid={boolean('Invalid', false)}
        readOnly={boolean('readOnly', true)}
        elementAfter={(
          <Button kind="inside" size="l" format="icon">
            <Icon name="eye" />
          </Button>
        )}
        defaultValue={text('Value', 'Simple text')}
      />
      <TextField
        disabled={boolean('Disabled', false)}
        label={text('Label text', 'Label text here')}
        helper={text('Helper text 2', 'Optional fields. You can set only a start or only a stop time.')}
        placeholder={text('Placeholder', 'Please enter value')}
        invalid={boolean('Invalid', false)}
      />
      <div style={{ padding: '0 10px', display: 'inline-block', background: '#f2f5f6', marginRight: '5px' }}>
        <TextField
          elementBefore={(
            <Button kind="inside" size="m" format="icon">
              <Icon name="arrow-left" />
            </Button>
          )}
          kind="white"
          disabled={boolean('Disabled', false)}
          label={text('Label text', 'Label text here')}
          helper={text('Helper text 2', 'Optional fields. You can set only a start or only a stop time.')}
          placeholder={text('Placeholder', 'Please enter value')}
          invalid={boolean('Invalid', false)}
        />
      </div>
      <TextField
        disabled={boolean('Disabled', false)}
        label={text('Label text', 'Label text here')}
        placeholder={text('Placeholder', 'Please enter value')}
        invalid={boolean('Invalid', false)}
        counter
        maxLength={number('MaxLength', 32)}
      />
    </div>
  ));
