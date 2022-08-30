import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { resolveStyles } from 'utils';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import Media from 'react-media';
import { noop } from 'lodash';
import isAfterDay from './utils/isAfterDay';
import DatePickerHeader from './DatePickerHeader';

const stylePath = resolveStyles('DatePicker/styles');
import(`../${stylePath}`).then();

const DatePicker = (props) => {
  const {
    initialStartDate,
    initialEndDate,
    applyDatePicker,
    closeDatePicker,
    daySize,
    applyText,
    resetText,
    placeholder,
    displayFormat,
    mask,
  } = props;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState('startDate');

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  const changeFocus = (nextFocusedInput) => {
    setFocusedInput(nextFocusedInput || 'startDate');
  };

  const removeDate = () => {
    setStartDate(null);
    setEndDate(null);
    setFocusedInput('startDate');
  };

  const changeDate = ({ startDate: newStartDate, endDate: newEndDate }) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <div>
      <Media query="(max-width: 480px)">
        {(isMobile) =>
          (isMobile ? (
            <>
              <DayPickerRangeController
                startDate={startDate}
                endDate={endDate}
                onDatesChange={changeDate}
                focusedInput={focusedInput}
                initialVisibleMonth={() => initialStartDate || moment()}
                numberOfMonths={1}
                calendarInfoPosition="top"
                renderCalendarInfo={() => (
                  <DatePickerHeader
                    startDate={startDate}
                    endDate={endDate}
                    removeDate={removeDate}
                    applyDatePicker={() => applyDatePicker({ startDate, endDate })}
                    isMobile
                    placeholder={placeholder}
                    displayFormat={displayFormat}
                    closeDatePicker={() => closeDatePicker()}
                    onDatesChange={changeDate}
                    onFocusChange={changeFocus}
                    isOutsideRange={(day) => isAfterDay(day, moment())}
                    mask={mask}
                  />
                )}
                onFocusChange={changeFocus}
                navPrev={(
                  <Button className="DayPicker__button DayPicker__button--left" format="icon" kind="secondary">
                    <Icon name="arrow-compact-left" size={32} />
                  </Button>
                )}
                navNext={(
                  <Button className="DayPicker__button DayPicker__button--right" format="icon" kind="secondary">
                    <Icon name="arrow-compact-right" size={32} />
                  </Button>
                )}
                hideKeyboardShortcutsPanel
                horizontalMonthPadding={12}
                weekDayFormat="dd"
                isOutsideRange={(day) => isAfterDay(day, moment())}
                minimumNights={0}
                firstDayOfWeek={1}
                daySize={40}
                transitionDuration={0}
              />
              <div className="DayPicker__footer">
                <Button
                  className="DayPicker__header-button"
                  onClick={() => removeDate()}
                  kind="outline"
                  disabled={!startDate && !endDate}
                >
                  {resetText}
                </Button>
                <Button
                  className="DayPicker__header-button"
                  onClick={() => applyDatePicker({ startDate, endDate })}
                  disabled={!startDate || !endDate}
                >
                  {applyText}
                </Button>
              </div>
            </>
          )
            : (
              <DayPickerRangeController
                startDate={startDate}
                endDate={endDate}
                onDatesChange={changeDate}
                focusedInput={focusedInput}
                initialVisibleMonth={() => initialStartDate || moment()}
                numberOfMonths={2}
                calendarInfoPosition="top"
                renderCalendarInfo={() => (
                  <DatePickerHeader
                    startDate={startDate}
                    endDate={endDate}
                    removeDate={removeDate}
                    applyDatePicker={() => applyDatePicker({ startDate, endDate })}
                    placeholder={placeholder}
                    displayFormat={displayFormat}
                    onDatesChange={changeDate}
                    onFocusChange={changeFocus}
                    isOutsideRange={(day) => isAfterDay(day, moment())}
                    mask={mask}
                  />
                )}
                onFocusChange={changeFocus}
                hideKeyboardShortcutsPanel
                horizontalMonthPadding={12}
                navPrev={(
                  <Button className="DayPicker__button DayPicker__button--left" format="icon" kind="secondary">
                    <Icon name="arrow-compact-left" size={24} />
                  </Button>
                )}
                navNext={(
                  <Button className="DayPicker__button DayPicker__button--right" format="icon" kind="secondary">
                    <Icon name="arrow-compact-right" size={24} />
                  </Button>
                )}
                weekDayFormat="dd"
                isOutsideRange={(day) => isAfterDay(day, moment())}
                minimumNights={0}
                firstDayOfWeek={1}
                daySize={daySize}
                onOutsideClick={() => closeDatePicker()}
              />
            )
          )}
      </Media>
    </div>
  );
};

DatePicker.propTypes = {
  applyDatePicker: PropTypes.func,
  closeDatePicker: PropTypes.func,
  applyText: PropTypes.string,
  resetText: PropTypes.string,
  placeholder: PropTypes.string,
  displayFormat: PropTypes.string,
  daySize: PropTypes.number,
  initialStartDate: PropTypes.objectOf(PropTypes.any),
  initialEndDate: PropTypes.objectOf(PropTypes.any),
  mask: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf((propValue, key) => {
      const isString = typeof propValue[key] === 'string';
      const isRegEx = propValue[key] instanceof RegExp;

      if (!(isString || isRegEx)) {
        return new Error('Invalid prop');
      }
      return true;
    }),
  ]),
};

DatePicker.defaultProps = {
  applyDatePicker: noop,
  closeDatePicker: noop,
  applyText: 'Apply',
  resetText: 'Reset',
  placeholder: 'dd.mm.yyyy',
  displayFormat: 'DD.MM.YYYY',
  daySize: 32,
  initialStartDate: null,
  initialEndDate: null,
  mask: null,
};

export default DatePicker;
