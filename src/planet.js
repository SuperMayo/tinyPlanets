"use strict";

// (a)(b) -> c
const scaledNoise = state => (x, y = 0, z = 0) => {
  return noise((x + state.noiseSeed) * state.noiseScale, y * state.noiseScale);
};

const imageCenter = state => Math.floor(state.res / 2);

const planetCoordinates = state =>
  bitmapDisk({ radius: state.radius, x0: state.center, y0: state.center });

const lightCoord = state =>
  _.intersectionWith(
    bitmapDisk({
      radius: state.radius,
      x0: floor(state.center - state.radius / 3),
      y0: floor(state.center - state.radius / 3)
    }),
    state.planetCoord,
    _.isEqual
  );

const chooseColor = state => coord => {
  // TODO: Make it less big, too much logic
  const mynoises = scaledNoise(state);
  if (mynoises(coord[0], coord[1]) <= 0.3) {
    return color(state.palette[0].map(x => x - 10));
  } else if (mynoises(coord[0], coord[1]) <= 0.48) {
    return color(state.palette[0]);
  } else if (mynoises(coord[0], coord[1]) <= 0.52) {
    return color(ponderateSum(mynoises(coord[0], coord[1]))(state.palette));
  } else if (mynoises(coord[0], coord[1]) <= 0.7) {
    return color(state.palette[1]);
  } else {
    return color(state.palette[1].map(x => x - 10));
  }
};

const nextNoiseSeed = inc => state => {
  return state.noiseSeed + inc;
};

const edges = ({ radius, center }) => {
  return [
    bitmapCircle({ radius: radius, x0: center, y0: center }),
    bitmapCircle({ radius: radius - 1, x0: center, y0: center })
  ];
};

// FLOW logic
// state -> planetSeed -> planetSpec -> miscSpec
const setPlanetSeed = state => ({
  radius: randomRadius(8)(state),
  center: imageCenter(state),
  noiseScale: random(0.01, 0.05),
  palette: randomPalette(2),
  noiseSeed: 1
});

// Need planet seed
const planetSpec = {
  planetCoord: planetCoordinates,
  chooseColor: chooseColor,
  noiseSeed: nextNoiseSeed(1),
  edges: edges
};

const miscSpec = {
  lightCoord: lightCoord
};

const planetPipeline = pipe([
  state => setPlanetSeed(state),
  state => wrap(state)(applySpec(planetSpec)),
  state => wrap(state)(applySpec(miscSpec))
]);

const next = state => ({
  ...state,
  chooseColor: chooseColor(state),
  noiseSeed: nextNoiseSeed(1)(state)
});
