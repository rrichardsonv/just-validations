import patternToFunction from './patternToFunction';
import isRequiredValidation from './isRequiredValidation';

export default function compileValidations(props) {
  let validations = [];

  if (props.validationFns.length > 0) {
    validations = props.validationFns;
  }

  if (props.required) {
    validations.push(isRequiredValidation);
  }

  if (props.patterns.length > 0) {
    validations.push(...props.patterns.map(patternToFunction));
  }

  return validations;
}