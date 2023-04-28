import { pointExtrapolate } from "./index.ts";
import { assertEquals } from "https://deno.land/std@0.183.0/testing/asserts.ts";

Deno.test("test", () => {
  const val = pointExtrapolate(1.41482675, Math.pow(Math.PI, 2), 5, 3);

  const estimatedVal = [
		[ 1.41482675, 2.0017347325155628 ],
		[ 5.0668250486983535, 25.672716074117073 ],
		[ 7.0409423912318765, 49.57486975664605 ],
		[ 8.573699654605555, 73.50832576738341 ],
		[ 9.869604401089358, 97.40909103400243 ]
	]

  assertEquals(val, estimatedVal);
});
