type Func = (x: number) => number;

// get the slope of a function at a point (derivative)
export function slope(f: Func, x: number, dx = Math.pow(10, -10)): number {
  return (f(x + dx) - f(x)) / dx;
}

// get the integral of a function from a to b
export function integrate(a: number, b: number, f: Func, dx = Math.pow(10, -3)) {
  // calculate the number of trapezoids
  const n = (b - a) / dx;

  // define the variable for area
  let area = 0;

  //loop to calculate the area of each trapezoid and sum.
  for (let i = 1; i <= n; i++) {
    //the x locations of the left and right side of each trapezpoid
    const x0 = a + (i - 1) * dx;
    const x1 = a + i * dx;

    // the area of each trapezoid
    const ai = dx * (f(x0) + f(x1)) / 2.;

    // cumulatively sum the area
    area += ai;
  }
  return area;
}

// get the distance of a function from a to b
function distance(f: Func): Func {
    return x => Math.sqrt(1 + Math.pow(slope(f, x), 2));
}
