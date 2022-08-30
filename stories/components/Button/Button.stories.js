import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import { withActions } from '@storybook/addon-actions';

import { Button as RawButton, Icon } from 'components';

const Button = props => (<div style={{ marginRight: 5, display: 'inline-block' }}><RawButton {...props} /></div>);

export default storybook
  .storiesOf('components/Button', module)
  .addDecorator(withInfo({ propTables: [RawButton], propTablesExclude: [Button] }))
  .addDecorator(withActions('focus', 'blur', 'mouseenter', 'mouseleave', 'mousedown', 'mouseup', 'click'))
  .addDecorator(withKnobs)
  .add('Button', () => (
    <>
      <div style={{ padding: '20px' }}>
        <Button>Default</Button>
        <Button disabled={boolean('Disabled', true)}>Primary</Button>
        <Button size="s" kind="primary">Primary Small</Button>
        <Button size="l" kind="primary">Primary Large</Button>
        <Button size="s" kind="secondary" disabled={boolean('Disabled Small', false)}>Secondary Small</Button>
        <Button size="m" kind="secondary" disabled={boolean('Disabled Medium', false)}>Secondary Medium</Button>
        <Button size="l" kind="secondary" disabled={boolean('Disabled Large', false)}>Secondary Large</Button>
        <Button size="m" kind="outline">Outline</Button>
        <Button size="s" kind="outline" disabled={boolean('Disabled Small', false)}>Outline Small</Button>
        <Button size="l" format="icon" kind="primary">
          <Icon name={text('Icon name', 'arrow-left')} size={number('Size', 24)} />
        </Button>
        <Button size="s" format="icon" kind="secondary">
          <Icon name={text('Icon name', 'arrow-left')} size={number('Size', 24)} />
        </Button>
        <Button size="s" format="icon" kind="inside">
          <Icon name={text('Icon name', 'eye')} size={number('Size', 24)} />
        </Button>
        <Button size="m" format="file" kind="outline">
          <input type="file" accept=".png, .jpg, .gif" />
          Upload image
        </Button>
      </div>
      <div style={{ background: '#494952', padding: '20px' }}>
        <Button kind="inverse">Inverse</Button>
        <Button kind="inverse" disabled={boolean('Disabled', true)}>Inverse</Button>
      </div>
    </>
  ));
