import { compose, defaultProps, mapProps, withState, withHandlers, lifecycle } from 'recompose';
import { noop } from 'lodash';
import omit from 'lodash/fp/omit';

export default (Component) => compose(
  defaultProps({ onChange: noop }),
  withState('counterText', 'setCounter', (props) => props.counterText),
  withHandlers({
    onChange: (props) => (e, ...restProps) => {
      const { setCounter, counter, maxLength } = props;

      if (counter && maxLength) {
        const message = e.target.value.substr(0, maxLength);

        setCounter(`${maxLength - message.length}/${maxLength}`);
      }

      return props.onChange(e, ...restProps);
    },
  }),
  lifecycle({
    componentDidMount() {
      const { defaultValue, value, counter, setCounter, maxLength } = this.props;

      if (counter && maxLength) {
        const inputValue = defaultValue || value || '';
        setCounter(`${maxLength - inputValue.length}/${maxLength}`);
      }
    },
  }),
  mapProps(omit(['setCounter'])),
)(Component);
