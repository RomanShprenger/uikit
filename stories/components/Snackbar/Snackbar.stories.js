import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import { Snackbar as RawSnackbar, Button } from 'components';

class SnackbarStory extends React.Component {
  queue = [];

  state = {
    open: false,
    message: null,
    key: null,
  };

  // CUSTOM EVENT
  action = () => {
    console.info('fire action');
  }

  // ACTIONS
  processQueue = () => {
    if (this.queue.length > 0) {
      const item = this.queue.shift();
      this.setState({
        message: item.message,
        key: item.key,
        open: true,
      });
    }
  };

  handleClick = message => () => {
    const { open } = this.state;
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (open) {
      this.action();
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'timeout' || reason === 'unmount') {
      this.action();
      this.setState({ open: false });
    } else if (reason !== 'clickaway') {
      this.setState({ open: false });
    }
  };

  handleExited = () => {
    this.processQueue();
  };
  // END OF ACTIONS

  render() {
    const { message, key, open } = this.state;

    const action = (
      <Button key="undo" kind="inverse" size="m" onClick={this.handleClose}>
        UNDO
      </Button>
    );

    return (
      <div>
        <Button
          size="m"
          kind="primary"
          onClick={this.handleClick('Campaigns have been launched Campaigns have been launched')}
        >
          Show message A
        </Button>
        <Button size="m" kind="secondary" onClick={this.handleClick('Message B')}>Show message B</Button>
        <RawSnackbar
          message={message}
          key={key}
          open={open}
          onClose={this.handleClose}
          onExited={this.handleExited}
          action={action}
        />
      </div>
    );
  }
}

export default storybook
  .storiesOf('components/Snackbar', module)
  .addDecorator(withInfo({ propTables: [RawSnackbar], propTablesExclude: [SnackbarStory] }))
  .addDecorator(withKnobs)
  .add('Snackbar', () => (<SnackbarStory />));
