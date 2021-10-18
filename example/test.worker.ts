// import serialize from 'serialize-javascript';
import { compose, map } from 'ramda';

const ctx: Worker = self as any;
function deserialize(serializedJavascript) {
  return eval(`(${serializedJavascript})`);
}

const importAndApplyArgs = async (func, args) => {
  const trans = await import(`ramda/es/${func}`);
  return args ? trans.default(...args) : trans.default;
};
ctx.onmessage = async ({
  data: {
    data,
    transformations,
  },
}) => {
  const transf = deserialize(transformations);
  const funcs = await Promise.all(map(
    async ({ transformation, args }) => importAndApplyArgs(transformation, args),
    transf,
  ));
  const trans = compose(
    ...funcs,
  );

  ctx.postMessage(trans(data));
};

export default null as any;
