import { helper } from '@ember/component/helper';


function default_string(args) {
  let [string, default_value] = args;

  if (string) {
    return string;
  }

  return default_value;
}

export default helper(default_string);
