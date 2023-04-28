import { slope, integrate } from "./leo.ts";
import { assertAlmostEquals } from "https://deno.land/std@0.183.0/testing/asserts.ts";

Deno.test("slope", () => {
    const f = (x: number) => x;
    const s = slope(f, 0);
    assertAlmostEquals(s, 1);
});

Deno.test("integrate", () => {
    const f = (x: number) => x;
    const i = integrate(0, 1, f);
    assertAlmostEquals(i, 0.5);
});