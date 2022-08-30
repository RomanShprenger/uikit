import React from 'react';
import * as storybook from '@storybook/react';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { Tooltip as RawTooltip } from 'components';

class Tooltip extends React.PureComponent {
  render() {
    const centerStyles = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    };

    const tooltipContent = (
      <span>any JSX here (simple string is ok too)</span>
    );

    return (
      <div style={centerStyles}>
        <RawTooltip
          content={tooltipContent}
          {...this.props}
        >
          <p>trigger</p>
        </RawTooltip>
      </div>
    );
  }
}

export default storybook
  .storiesOf('components/Tooltip', module)
  .addDecorator(withKnobs)
  .add('Tooltip', () => (
    <Tooltip
      placement={select('Placement', {
        Top: 'top',
        Bottom: 'bottom',
        Left: 'left',
        Right: 'right',
      }, 'top')}
      trigger={select('Trigger', {
        Mouseenter: 'mouseenter',
        Click: 'click',
        Manual: 'manual',
        Focus: 'focus',
      }, 'mouseenter')}
      maxWidth={number('Max width', 350)}
    />
  ));
