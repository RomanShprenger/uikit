import React from 'react';
import * as storybook from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { DatePicker as RawDatePicker, Button } from 'components';

const mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

class DatePicker extends React.PureComponent {
  state = {
    opened: false,
    initialStartDate: null,
    initialEndDate: null,
  }

  openDatePicker = () => {
    this.setState({
      opened: true,
    });
  }

  closeDatePicker = () => {
    this.setState({
      opened: false,
    });
  }

  applyDatePicker = (props) => {
    this.setState({
      opened: false,
      initialStartDate: props.startDate,
      initialEndDate: props.endDate,
    });
  }

  render() {
    const { opened, initialStartDate, initialEndDate } = this.state;
    return (
      <>
        <Button kind="outline" size="l" onClick={this.openDatePicker}>
          Show datePicker
        </Button>
        {opened && (
        <RawDatePicker
          applyDatePicker={this.applyDatePicker}
          closeDatePicker={this.closeDatePicker}
          applyText={text('Apply button', 'Apply')}
          resetText={text('Reset button', 'Reset')}
          placeholder={text('Placeholder', 'dd.mm.yyyy')}
          displayFormat={text('Display format', 'DD.MM.YYYY')}
          daySize={number('Day size', 40)}
          initialStartDate={initialStartDate}
          initialEndDate={initialEndDate}
          mask={mask}
        />
        )}
      </>
    );
  }
}

export default storybook
  .storiesOf('components/DatePicker', module)
  .addDecorator(withKnobs)
  .add('DatePicker', () => (
    <DatePicker />
  ));
