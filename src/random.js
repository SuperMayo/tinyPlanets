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
