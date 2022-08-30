import * as React from 'react';
import PropTypes from 'prop-types';
import { resolveStyles } from 'utils';
import { Checkbox } from 'components/Checkbox';

const stylePath = resolveStyles('Radio/styles');
import(`../${stylePath}`).then();

const Radio = (props) => (
  <Checkbox
    {...props}
  />
);

export default Radio;

Radio.propTypes = {
  classNamePrefix: PropTypes.string,
  type: PropTypes.string,
};

Radio.defaultProps = {
  classNamePrefix: 'yui-radio',
  type: 'radio',
};
