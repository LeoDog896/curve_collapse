import { getUpperBound, slope, makePoints, integral } from "./leo.ts";
import { assertAlmostEquals } from "https://deno.land/std@0.183.0/testing/asserts.ts";

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
  console.log(makePoints((x) => x, 0, 1, 10));
});