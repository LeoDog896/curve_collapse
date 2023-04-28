import { pointExtrapolate } from "./index.ts";
import { assertEquals } from "https://deno.land/std@0.183.0/testing/asserts.ts";

Deno.test("base test 1", () => {
  const val = pointExtrapolate(1.41482675, Math.pow(Math.PI, 2), 5, 3);

  const estimatedVal = [
    [1.41482675, 2.0017347325155628],
    [5.0668250486983535, 25.672716074117073],
    [7.0409423912318765, 49.57486975664605],
    [8.573699654605555, 73.50832576738341],
    [9.869604401089358, 97.40909103400243],
  ];

  assertEquals(val, estimatedVal);
});

Deno.test("base test 2", () => {
  const val = pointExtrapolate(1, 10, 5, 3);

  const estimatedVal = [
    [1, 1],
    [5.050742085681122, 25.509995616070494],
    [7.093350091405263, 50.31561551923905],
    [8.66905497024748, 75.15251407717253],
    [10, 100],
  ];

  assertEquals(val, estimatedVal);
});

Deno.test("base test 3", () => {
	const data = JSON.parse(Deno.readTextFileSync("./artifacts/test3.json"));

  const val = pointExtrapolate(-20, 20, 200, 3);

	assertEquals(val, data);
});
