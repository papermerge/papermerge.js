import { helper } from '@ember/component/helper';


export function capitalize([str]) {
  /*
  * Returns copy of input string with first
  * letter converted to upper case
  */
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export default helper(capitalize);
