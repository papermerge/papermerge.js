import { helper } from '@ember/component/helper';


export function truncatechars([str]) {
  /*
    Truncates a string if it is longer than the specified number of characters.
    Truncated strings will end with a translatable ellipsis character ('…').
  */
  if (!str) {
    return '';
  }

  if (str.length <= 10) {
    return str;
  }

  return `${str.substring(0, 10)}...`;
}

export default helper(truncatechars);
