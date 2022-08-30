import React from 'react';
import * as storybook from '@storybook/react';
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';
import { Popover as RawPopover, Button } from 'components';

class Popover extends React.PureComponent {
  state = {
    isVisible: false,
  }

  closePopover = () => {
    this.setState({ isVisible: false });
  }

  openPopover = () => {
    this.setState({ isVisible: true });
  }

  render() {
    const { isVisible } = this.state;
    const centerStyles = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    };

    const popoverContent = (
      <div>
        <h1 style={{ marginTop: 0, marginBottom: 5, width: 238459795 }}>Some title text</h1>
        <em>any JSX here</em>
      </div>
    );
    return (
      <>
        <div style={centerStyles}>
          <RawPopover
            onHidden={() => (this.closePopover())}
            visible={isVisible} // undefined for auto mode
            content={popoverContent}
            arrow
            placement="bottom"
          >
            <p>trigger</p>
          </RawPopover>
          <Button onClick={this.openPopover}>open</Button>
          <Button onClick={this.closePopover}>close</Button>
        </div>
      </>
    );
  }
}

export default storybook
  .storiesOf('components/Popover', module)
  .addDecorator(withKnobs)
  .add('Popover', () => (
    <>
      <Popover
        hideOnClick={boolean('Hide on click', true)}
        trigger={select('Trigger', {
          Mouseenter: 'mouseenter',
          Click: 'click',
          Manual: 'manual',
          Focus: 'focus',
        }, 'click')}
        maxWidth={number('Max width', 350)}
      />
    </>
  ));
