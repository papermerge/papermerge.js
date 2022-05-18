import { helper } from '@ember/component/helper';


function node_in_transition(
  [node],
  {
    onNodeClicked,
    node_clicked_state,
    currently_loading_state,
    hint
  }) {
  /*
    If `node` is in transition returns `true` otherwise returns `false`

    Node 'is in transition' means that currently there is another node
    preparing to replace current one. Transitions happens when user clicks on
    another node (say node2). Time window between user seeing current node
    and node2 is called
    'transition period'. During transition period user will see a visual
     feedback (rotating spinner) next to current node.

    Depending in which panel node is located - primary or secondary - there
    will be different ways to check if it is transition period.

    When node is in primary panel check is performed
    based on `currently_loading_state` dictionary.

    When node is in secondary panel check is performed
    based on `onNodeClicked` task.
  */
  let state1, state2;

  // case 1: `node` is in primary panel
  state2 = currently_loading_state;
  if (state2.node_id == node.id && state2.hint == hint) {
    return true;
  }

  // case 2: `node` is in secondary panel
  if (onNodeClicked.isRunning) {
    state1 = node_clicked_state;
    if (state1.node_id == node.id && state1.hint == hint) {
      return true;
    }
  }

  return false;
}

export default helper(node_in_transition);
