export default function isRequiredValidation(value, name) {
  if (!value && value !== 0) {
    return `${name} is Required`;
  }
  return null;
}