import React from 'react';
import * as storybook from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Modal, Button, TextField } from 'components';

class ModalStory extends React.PureComponent {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  }


  render() {
    const { modalIsOpen } = this.state;

    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          header="Discard changes?"
          body={(<TextField label="Label text here" />)}
          footer={(<Button kind="secondary" onClick={this.closeModal}>Close</Button>)}
        />
      </div>
    );
  }
}

export default storybook
  .storiesOf('components/Modal', module)
  .addDecorator(withKnobs)
  .add('Modal', () => (<ModalStory />));
