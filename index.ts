type Func = (x: number) => number;
type Point = [number, number]

// get the derivative of a function
export const derivative = (f: Func, dx = 10 ** -10): Func => (x) =>
  (f(x + dx) - f(x)) / dx;

// get the trapezoidal area under a curve
// this is used for numerical integration
export const TRAM = (
  f: Func,
  a: number,
  dx = 10 ** -3,
) => dx * (f(a) + f(a + dx)) / 2;

// get the integral of a function
export function integral(
  f: Func,
  a: number,
  b: number,
  dx = 10 ** -3,
) {
  let sum = 0;
  for (let i = a; i < b; i += dx) {
    sum += TRAM(f, i, dx);
  }
  return sum;
}

// gets the upper bound of an integral
// where ing(f, a, b) = d, find b.
export function getUpperBound(
  f: Func,
  a: number,
  d: number,
  dx = 10 ** -3,
): number {
  if (d === 0) return a;

  let dxCount = 0;
  let sum = TRAM(f, a, dx);
  while (sum < d) {
    sum += TRAM(f, a + dxCount * dx, dx);
    dxCount++;
  }

  return a + (dxCount * dx);
}

// generates a function that returns the distance travelled along a path
// this follows pygatherom's therom, except it uses the derivative of the
// function instead of a point on the function.
const distance = (f: Func): Func => (x) =>
  Math.sqrt(1 + Math.pow(derivative(f)(x), 2));

// make equidistant points along a function
export function collapse(
  f: Func,
  a: number,
  b: number,
  n: number,
  dx = 10 ** -3,
): Point[] {
  // first, get the total distance travelled from a to b.
  const d = integral(distance(f), a, b, dx);

  // we then divide this to make "distance steps" to count when we reverse d to get the bounds of each step.
  // essentially, steps[i] = (d * i) / (n - 1) for i = [0..n)
  const step = d / (n - 1);
  const steps = Array.from({ length: n }, (_, i) => step * i);

  // for every point:
  return steps.map(i => {
    // we then get the upper bound of the integral of distance from a to b, where the distance is equal to the step.
    const b = getUpperBound(distance(f), a, a + i, dx);
    // we then add the point to the array.
    return [b, f(b)];
  })
}
