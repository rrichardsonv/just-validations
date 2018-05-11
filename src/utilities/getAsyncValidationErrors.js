import mapValidations from './mapValidations';
import filterOutNull from './filterOutNull';

export default function getAsyncValidationResults(value, name, validations) {
  return Promise.all(mapValidations(value, name, validations))
    .then(filterOutNull);
}