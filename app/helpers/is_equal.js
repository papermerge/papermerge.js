import { helper } from '@ember/component/helper';
import { isEqual as emberIsEqual } from '@ember/utils';


export function is_equal([a, b]) {
  return emberIsEqual(a, b);
}

export default helper(is_equal);