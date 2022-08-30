import { compose, defaultProps, mapProps, withState, withHandlers, lifecycle } from 'recompose';
import { noop } from 'lodash';
import omit from 'lodash/fp/omit';

export default (Component) => compose(
  defaultProps({ onFocus: noop, onBlur: noop }),
  withState('focused', 'setFocused', false),
  withHandlers({
    onFocus: (props) => (e) => {
      const { disabled, autoFocus, setFocused } = props;

      if (disabled) {
        return false;
      }

      if (autoFocus && e.target.value) {
        const value = e.target.value.toString();

        // Always do autofocus to end of value
        e.target.value.selectionStart = value.length;
        e.target.value.selectionEnd = value.length;
      }

      setFocused(true);

      return props.onFocus(e);
    },
    onBlur: (props) => (e) => {
      const { disabled, onBlur, setFocused } = props;

      if (disabled) {
        return false;
      }

      setFocused(false);
      return onBlur(e);
    },
  }),
  lifecycle({
    componentDidUpdate() {
      const { disabled, focused, setFocused } = this.props;

      if (disabled && focused) {
        setFocused(false);
      }
    },
    componentDidMount() {
      const { autoFocus, setFocused } = this.props;

      setFocused(autoFocus);
    },
  }),
  mapProps(omit(['setFocused'])),
)(Component);
