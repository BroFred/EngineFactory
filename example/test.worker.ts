import serialize from 'serialize-javascript';
import {take} from 'ramda';

const ctx: Worker = self as any;
function deserialize(serializedJavascript) {
  return eval(`(${serializedJavascript})`);
}
ctx.onmessage = ({
  data: {
    transform,
    data,
  },
}) => {
  const { trans } = deserialize(serialize(deserialize(transform)));
  ctx.postMessage(trans(take(5, data)));
};

export default null as any;
