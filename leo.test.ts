import { getUpperBound, slope, makePoints, integral } from "./leo.ts";
import { assertAlmostEquals } from "https://deno.land/std@0.183.0/testing/asserts.ts";

function assertArrayAlmostEquals(actual: [number, number][], expected: [number, number][]) {
  for (let i = 0; i < actual.length; i++) {
    assertAlmostEquals(actual[i][0], expected[i][0]);
    assertAlmostEquals(actual[i][1], expected[i][1]);
  }
}

Deno.test("slope", () => {
  const f = (x: number) => x;
  const s = slope(f, 0);
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
  const points = makePoints((x) => x, 0, 1, 10);
  console.log(points);
  assertArrayAlmostEquals(points, [
    [ 0, 0 ],
    [ 0.111, 0.111 ],
    [ 0.222, 0.222 ],
    [ 0.333, 0.333 ],
    [ 0.444, 0.444 ],
    [ 0.555, 0.555 ],
    [ 0.666, 0.666 ],
    [ 0.777, 0.777 ],
    [ 0.888, 0.888 ],
    [ 1, 1 ]
  ]);

});