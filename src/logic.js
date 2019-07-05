// fp magic
const objOf = k => v => ({ [k]: v });
const applySpec = o => x =>
  Object.keys(o)
    .map(k => objOf(k)(o[k](x)))
    .reduce((acc, o) => Object.assign(acc, o));
const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);
const pipe = functions => data => {
  return functions.reduce((value, func) => func(value), data);
};
const wrap = o => f => ({ ...o, ...f(o) });

// ([a,b])([c,d])(d)
const linerp = range => domain => val => {
  return floor(
    domain[0] +
      (val - range[0]) * ((domain[1] - domain[0]) / (range[1] - range[0]))
  );
};

const ponderateSum = weight => arrays => {
  return zip(arrays[0], arrays[1]).map(
    x => weight * x[0] + (1 - weight) * x[1]
  );
};

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
