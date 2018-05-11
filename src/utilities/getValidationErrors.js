import filterOutNull from './filterOutNull';
import mapValidations from './mapValidations';

export default function getValidationErrors(value, name, validations) {
  return filterOutNull(mapValidations(value, name, validations));
}