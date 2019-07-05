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

// Randomness
const randInt = (min, max) => Math.floor(random(min, max + 1));

const randomRadius = min => state => randInt(min, state.res / 2.5);

const randColor = () => [
  randInt(0, 255),
  randInt(0, 255),
  randInt(0, 255),
  255
];

const bernoulli = (p = 0.5) => (Math.random() <= p ? true : false);

const randomPalette = N => {
  return Array.apply(null, { length: N }).map(Function.call, randColor);
};

// Bitmap
// Return circle coordinates
// Source https://fr.wikipedia.org/wiki/Algorithme_de_trac%C3%A9_de_cercle_d%27Andres#cite_note-1
// {props} -> [[[x][y]],...]
const bitmapCircle = ({ radius, x0, y0 }) => {
  let x = 0;
  let y = radius;
  let d = radius - 1;
  const circleCoordinates = [];

  while (y >= x) {
    circleCoordinates.push([x0 + x, y0 + y]);
    circleCoordinates.push([x0 + y, y0 + x]);
    circleCoordinates.push([x0 - x, y0 + y]);
    circleCoordinates.push([x0 - y, y0 + x]);
    circleCoordinates.push([x0 + x, y0 - y]);
    circleCoordinates.push([x0 + y, y0 - x]);
    circleCoordinates.push([x0 - x, y0 - y]);
    circleCoordinates.push([x0 - y, y0 - x]);

    if (d >= 2 * x) {
      d -= 2 * x + 1;
      x++;
    } else if (d < 2 * (radius - y)) {
      d += 2 * y - 1;
      y--;
    } else {
      d += 2 * (y - x - 1);
      y--;
      x++;
    }
  }
  // return only unique values
  return _.uniqWith(circleCoordinates, _.isEqual);
};

// {props} -> [[[x][y]], ...]
const bitmapDisk = ({ radius, x0, y0 }) => {
  let diskCoordinates = [];
  r = radius;
  while (r >= 0) {
    diskCoordinates = diskCoordinates.concat(
      bitmapCircle({ radius: r, x0: x0, y0: y0 })
    );
    r--;
  }
  return diskCoordinates;
};
