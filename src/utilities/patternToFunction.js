export default function patternToFunction({ ifInvalid, pattern }) {
  return function (value, name) {
    if (!value || pattern.test(value)) {
      return null;
    }

    if (typeof ifInvalid === "function") {
      return ifInvalid(name, value);
    }

    return ifInvalid;
  };
}