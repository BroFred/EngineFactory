onmessage = ({ data: res }) => {
  postMessage({
    answer: res,
  });
};
