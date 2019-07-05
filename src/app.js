"use strict";
new p5();

// init state
const state = {
  res: 99 // Must be an odd number
};
console.time("Planet generation");
let planet = planetPipeline(state);
console.timeEnd("Planet generation");

const chooseTransp = (arr, planet) => {
  return _.isEqual(arr, planet.palette[0])
    ? [0, 0, 0, 0]
    : arr.map(x => x + 30);
};

const setLight = arr => {
  return arr.map(x => x + 20);
};

function setup() {
  const mycanvas = createCanvas(200, 200);
  mycanvas.parent("#canvas");
  frameRate(5);
}

function draw() {
  rectMode(CENTER);
  clear();

  const img = createImage(state.res, state.res);
  img.loadPixels();
  // draw planet
  planet.planetCoord.map(x => img.set(x[0], x[1], planet.chooseColor(x)));

  // light edges
  planet.edges[0].map(x =>
    img.set(x[0], x[1], color(chooseTransp(img.get(x[0], x[1]), planet)))
  );

  // light direction
  planet.lightCoord.map(x =>
    img.set(x[0], x[1], color(setLight(img.get(x[0], x[1]))))
  );

  img.updatePixels();
  noSmooth();
  image(img, 0, 0, width, height);

  planet = next(planet);
}
