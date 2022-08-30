import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { resolveStyles } from 'utils';
import { TextField } from 'components/TextField';

const stylePath = resolveStyles('DatePicker/styles');
import(`../${stylePath}`).then();

const DateInput = (props) => {
  const {
    placeholder,
    onFocus,
    disabled,
    readOnly,
    required,
    displayValue,
    id,
    mask,
    onChange,
  } = props;

  const inputRef = useRef(null);
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    setDateString(displayValue || '');
  }, [displayValue]);

  const onChangeDate = (e) => {
    onChange(e.target.value);
    setDateString(e.target.value);
  };

  return (
    <div className="DayPicker__input">
      <TextField
        mask={mask}
        type="text"
        id={id}
        name={id}
        elementRef={() => inputRef}
        value={dateString}
        onChange={onChangeDate}
        onFocus={onFocus}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        marginTop="0"
      />
    </div>
  );
};

DateInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  displayValue: PropTypes.string,
  id: PropTypes.string.isRequired,
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

DateInput.defaultProps = {
  onChange: () => {},
  placeholder: '',
  onFocus: () => {},
  disabled: false,
  readOnly: false,
  required: false,
  displayValue: '',
  mask: null,
};

export default DateInput;
