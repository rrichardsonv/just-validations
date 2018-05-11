import React from "react";
import PropTypes from "prop-types";
import utilities from "./utilities/index";

class Validator extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    name: PropTypes.string,
    patterns: PropTypes.arrayOf(
      PropTypes.shape({
        ifInvalid: PropTypes.any.isRequired,
        pattern: PropTypes.instanceOf(RegExp).isRequired
      })
    ),
    validationFns: PropTypes.arrayOf(PropTypes.func),
    required: PropTypes.bool,
    onInvalid: PropTypes.func
  };

  static defaultProps = {
    patterns: [],
    validationFns: [],
    required: false
  };

  constructor(props) {
    super(props);

    this.validations = utilities.compileValidations(props);

    this.state = {
      errors: [],
      isValidating: false
    };
  }

  validate = value => {
    this.setState({ isValidating: true });

    const { name, onInvalid } = this.props;

    const newValidationErrors = utilities.getValidationErrors(
      value,
      name,
      this.validations
    );

    if (newValidationErrors.length > 0) {
      onInvalid && onInvalid({
        errors: newErrors,
        name,
        value
      });
    }

    this.setState({
      errors: newValidationErrors,
      isValidating: false
    });
  };

  clearErrors = () => {
    this.setState({ errors: [] });
  };

  render() {
    return this.props.children({
      ...this.state,
      validate: this.validate,
      clearErrors: this.clearErrors,
      isInvalid: this.state.errors.length > 0
    });
  }
}

export default Validator;
