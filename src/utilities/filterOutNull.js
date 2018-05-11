export default function filterOutNull(array = []) {
  return array.filter(element => element !== null);
}