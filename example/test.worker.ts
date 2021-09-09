import {
  match, map, pair, replace,
} from 'ramda';

const ctx: Worker = self as any;

ctx.onmessage = ({ data: def }) => {
  const reg = /%%_(.*?)_%%/g;
  const jsonStirng = JSON.stringify(def);
  const result = match(reg, jsonStirng);
  ctx.postMessage({
    answer: result,
  });
};

export default null as any;
