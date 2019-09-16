// 节流函数
// eslint-disable-next-line import/prefer-default-export
export const throttle = (fn, wait) => {
  let prev = 0;
  // eslint-disable-next-line func-names
  return function () {
    const now = Date.now();
    if (now - prev > wait) {
      prev = now;
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments);
    }
  };
};
