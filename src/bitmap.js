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
