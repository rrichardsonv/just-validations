import React from "react";
import PropTypes from "prop-types";
import utilities from './utilities/index';
import debounce from 'lodash.debounce';

class AsyncValidator extends React.Component {
  static propTypes = {
    validations: PropTypes.arrayOf(PropTypes.func),
    name: PropTypes.string,
    onFailedValidation: PropTypes.func,
    onInvalid: PropTypes.func,
    children: PropTypes.func.isRequired,
    debounce: PropTypes.number,
  };

  constructor(props){
    super(props);

    if (props.debounce) {
      this.validate = debounce(this.validate, props.debounce);
    }

    this.state = {
      errors: [],
      isValidating: false
    };
  }

  static wrapValidOnSuccess({ promiseFn, invalidMsg }) {
    return function(value) {
      return promiseFn(value)
        .then(() => {
          return null;
        })
        .catch(err => {
          return invalidMsg || err;
        });
    };
  }

  validate = value => {
    const { validations, name, onFailedValidation, onInvalid } = this.props;

    this.setState({ isValidating: true, errors: [] });

    return utilities
      .getAsyncValidationResults(value, name, validations)
      .then(utilities.filterOutNull)
      .then((newValidationErrors) => {
        this.setState({
          errors: newValidationErrors,
          isValidating: false
        });

        if (newValidationErrors.length !== 0) {
          onInvalid && onInvalid({
              value,
              name,
              newValidationErrors
          });
        }

        return newValidationErrors;
      })
      .catch(error => {
        onFailedValidation && onFailedValidation(error);
        this.setState({ isValidating: false });
      });
  };

  clearErrors = () => {
    this.setState({ errors: [] });
  };

  render() {
    return this.props.children({
      ...this.state,
      asyncValidate: this.validate,
      clearAsyncErrors: this.clearErrors
    });
  }
}

export default AsyncValidator;
