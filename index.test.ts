import { collapse, derivative, getUpperBound, integral } from "./index.ts";
import { assertAlmostEquals } from "https://deno.land/std@0.183.0/testing/asserts.ts";

function assertArrayAlmostEquals(
  actual: number[][],
  expected: number[][],
) {
  for (let i = 0; i < actual.length; i++) {
    for (let j = 0; j < actual[i].length; j++) {
      assertAlmostEquals(actual[i][j], expected[i][j]);
    }
  }
}

Deno.test("slope", () => {
  const f = (x: number) => x;
  const s = derivative(f)(0);
  assertAlmostEquals(s, 1);
});

Deno.test("upper bound", () => {
  const f = (x: number) => x;
  const b = getUpperBound(f, 0, 0.5);
  assertAlmostEquals(b, 1);
});

Deno.test("integral", () => {
  const f = (x: number) => x;
  const i = integral(f, 0, 1);
  assertAlmostEquals(i, 0.5);
});

Deno.test("make points", () => {
  const points = collapse((x) => x, 0, 1, 5);
  assertArrayAlmostEquals(points, [
    [0, 0],
    [0.25, 0.25],
    [0.5, 0.5],
    [0.75, 0.75],
    [1, 1],
  ]);
});

Deno.test("from desmos graph", () => {
  const points = collapse((x) => x + Math.sin(x), 0, 6.5, 11);

  const expected = [
    [0, 0],
    [0.452, 0.8887655571845614],
    [0.9460000000000001, 1.7570822713207712],
    [1.551, 2.5508040591218535],
    [2.388, 3.0722630600043823],
    [3.3810000000000002, 3.143873082221994],
    [4.333, 3.404108898111191],
    [5.0440000000000005, 4.098480923592157],
    [5.583, 4.938640593075381],
    [6.051, 5.820895262355633],
    [6.4990000000000006, 6.713143293064868],
  ];

  assertArrayAlmostEquals(points, expected);
});

Deno.test("use old test case", () => {
  const power = collapse((x) => x ** 2, 1, 10, 5);

  const expected = [
    [1.386, 1.920996],
    [5.148, 26.501904],
    [7.163, 51.308569],
    [8.727, 76.160529],
    [10.051, 101.022601],
  ];

  assertArrayAlmostEquals(power, expected);
});
