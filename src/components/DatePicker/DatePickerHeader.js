import * as React from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { resolveStyles } from 'utils';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import momentPropTypes from 'react-moment-proptypes';
import DateInput from './DateInput';

import toMomentObject from './utils/toMomentObject';
import toLocalizedDateString from './utils/toLocalizedDateString';
import isBeforeDay from './utils/isBeforeDay';

const stylePath = resolveStyles('DatePicker/styles');
import(`../${stylePath}`).then();

const DatePickerHeader = (props) => {
  const {
    applyText,
    resetText,
    placeholder,
    displayFormat,
    startDate,
    endDate,
    removeDate,
    applyDatePicker,
    closeDatePicker,
    isMobile,
    onDatesChange,
    onFocusChange,
    isOutsideRange,
    mask,
    startDateId,
    isStartDateFocused,
    endDateId,
    isEndDateFocused,
    disabled,
    required,
    readOnly,
    withFullScreenPortal,
    minimumNights,
    keepOpenOnDateSelect,
    isDayBlocked } = props;

  const getDisplayFormat = () => (typeof displayFormat === 'string' ? displayFormat : displayFormat());

  const onEndDateChange = (endDateString) => {
    const endDateValue = toMomentObject(endDateString, getDisplayFormat());

    const isEndDateValid = endDateValue
      && !isOutsideRange(endDateValue) && !isDayBlocked(endDateValue)
      && !(startDate && isBeforeDay(endDateValue, startDate.clone().add(minimumNights, 'days')));
    if (isEndDateValid) {
      onDatesChange({ startDate, endDate: endDateValue });
      if (!keepOpenOnDateSelect)onFocusChange(null);
    } else {
      onDatesChange({
        startDate,
        endDate: null,
      });
    }
  };

  const onEndDateFocus = () => {
    if (!startDate && withFullScreenPortal && (!disabled || disabled === 'endDate')) {
      onFocusChange('startDate');
    } else if (!disabled || disabled === 'startDate') {
      onFocusChange('endDate');
    }
  };

  const onStartDateChange = (startDateString) => {
    const startDateValue = toMomentObject(startDateString, getDisplayFormat());
    const isEndDateBeforeStartDate = startDateValue
     && isBeforeDay(endDate, startDateValue.clone().add(minimumNights, 'days'));
    const isStartDateValid = startDateValue
     && !isOutsideRange(startDateValue) && !isDayBlocked(startDateValue)
     && !(disabled === 'endDate' && isEndDateBeforeStartDate);

    let endDateValue = endDate;

    if (isStartDateValid) {
      if (isEndDateBeforeStartDate) {
        endDateValue = null;
      }
      onDatesChange({
        startDate: startDateValue,
        endDate: endDateValue,
      });
      onFocusChange('endDate');
    } else {
      onDatesChange({
        startDate: null,
        endDate: endDateValue,
      });
    }
  };

  const onStartDateFocus = () => {
    if (!disabled || disabled === 'endDate') {
      onFocusChange('startDate');
    }
  };

  const getDateString = (date) => {
    const displayFormatValue = getDisplayFormat();
    if (date && displayFormatValue) {
      return date && date.format(displayFormatValue);
    }
    return toLocalizedDateString(date);
  };

  const startDateString = getDateString(startDate);
  const endDateString = getDateString(endDate);

  return (
    isMobile ? (
      <div className="DayPicker__header">
        <Button
          kind="outline"
          format="icon"
          onClick={() => closeDatePicker()}
        >
          <Icon name="arrow-left" size={24} />
        </Button>
        <div className="DayPicker__range-input">
          <DateInput
            mask={mask}
            id={startDateId}
            displayValue={startDateString}
            focused={isStartDateFocused}
            onChange={onStartDateChange}
            onFocus={onStartDateFocus}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
          />
          <DateInput
            mask={mask}
            id={endDateId}
            displayValue={endDateString}
            focused={isEndDateFocused}
            onChange={onEndDateChange}
            onFocus={onEndDateFocus}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
          />
        </div>
      </div>
    ) : (
      <div className="DayPicker__header">
        <Button
          className="DayPicker__header-button"
          kind="outline"
          onClick={() => removeDate()}
          disabled={!startDate && !endDate}
        >
          {resetText}
        </Button>
        <div className="DayPicker__range-input">
          <DateInput
            mask={mask}
            id={startDateId}
            displayValue={startDateString}
            focused={isStartDateFocused}
            onChange={onStartDateChange}
            onFocus={onStartDateFocus}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
          />
          <DateInput
            mask={mask}
            id={endDateId}
            displayValue={endDateString}
            focused={isEndDateFocused}
            onChange={onEndDateChange}
            onFocus={onEndDateFocus}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
          />
        </div>
        <Button
          className="DayPicker__header-button"
          onClick={() => applyDatePicker({ startDate, endDate })}
          disabled={!startDate || !endDate}
        >
          {applyText}
        </Button>
      </div>
    )
  );
};

DatePickerHeader.propTypes = {
  isMobile: PropTypes.bool,
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  applyDatePicker: PropTypes.func,
  removeDate: PropTypes.func,
  closeDatePicker: PropTypes.func,
  applyText: PropTypes.string,
  resetText: PropTypes.string,
  placeholder: PropTypes.string,
  displayFormat: PropTypes.string,
  onDatesChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  isOutsideRange: PropTypes.func,
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
  startDateId: PropTypes.string,
  isStartDateFocused: PropTypes.bool,
  endDateId: PropTypes.string,
  isEndDateFocused: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  minimumNights: PropTypes.number,
  keepOpenOnDateSelect: PropTypes.bool,
  isDayBlocked: PropTypes.func,
};

DatePickerHeader.defaultProps = {
  isMobile: false,
  startDate: null,
  endDate: null,
  removeDate: () => {},
  applyDatePicker: () => {},
  closeDatePicker: () => {},
  applyText: 'Apply',
  resetText: 'Reset',
  placeholder: 'dd.mm.yyyy',
  displayFormat: 'DD.MM.YYYY',
  onDatesChange: () => {},
  onFocusChange: () => {},
  isOutsideRange: () => {},
  mask: null,
  startDateId: 'startDate',
  isStartDateFocused: false,
  endDateId: 'endDate',
  isEndDateFocused: false,
  disabled: false,
  required: false,
  readOnly: false,
  withFullScreenPortal: false,
  minimumNights: 0,
  keepOpenOnDateSelect: false,
  isDayBlocked: () => false,
};

export default DatePickerHeader;
