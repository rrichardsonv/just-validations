export default function mapValidations(value, name, validations = []) {
  return validations.map(fn => {
    if (fn.length === 1) { // need to check arity here
      return fn(value);
    }

    return fn(value, name);
  });
}