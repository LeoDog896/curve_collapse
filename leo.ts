type Func = (x: number) => number;

// get the slope of a function at a point (derivative)
export function slope(f: Func, x: number, dx = 10 ** -10): number {
  return (f(x + dx) - f(x)) / dx;
}

// get the trapezoidal area under a curve
export function TRAM(
  a: number,
  f: Func,
  dx = 10 ** -3,
) {
  return dx * (f(a) + f(a + dx)) / 2;
}

// get the integral of a function
export function integral(
  f: Func,
  a: number,
  b: number,
  dx = 10 ** -3,
) {
  let sum = 0;
  for (let i = a; i < b; i += dx) {
    sum += TRAM(i, f, dx);
  }
  return sum;
}

// gets the upper bound of an integral
// where ing(f, a, b) = d, find b.
export function getUpperBound(f: Func, a: number, d: number, dx = 10 ** -3): number {
  let dxCount = 0;
  let sum = TRAM(a, f, dx);
  while (sum < d) {
    sum += TRAM(a + dxCount * dx, f, dx);
    dxCount++;
  }

  return a + dxCount * dx;
}

// generates a function that returns the distance travelled along a path
function distance(f: Func): Func {
  return (x) => Math.sqrt(1 + Math.pow(slope(f, x), 2));
}

// make equidistant points
export function makePoints(f: Func, a: number, b: number, n: number, dx = 10 ** -3): [number, number][] {
  // first, get the total distance travelled from a to b.
  const d = integral(distance(f), a, b, dx);

  // we can then divide this to make "distance steps" to count when we reverse d to get the bounds of each step.
  const step = d / n;

  // now, we can make the points.
  const points: [number, number][] = [];

  // we start at a, and then we add the step to it until we reach b.
  for (let i = a; i < b; i += step) {
    // we then get the upper bound of the integral of distance from a to b, where the distance is equal to the step.
    const b = getUpperBound(distance(f), i, step, dx);
    // we then add the point to the array.
    points.push([b, f(b)]);
  }

  return points;
}