# curve collapse

a function to turn any arbitrary function into equidistant points from [a, b] with `n` points.

```ts
import { collapse } from "curve_collapse";

const points = collapse((x) => x, 0, 1, 10);

assertArrayAlmostEquals(points, [
    [0, 0],
    [0.111, 0.111],
    [0.222, 0.222],
    [0.333, 0.333],
    [0.444, 0.444],
    [0.555, 0.555],
    [0.666, 0.666],
    [0.777, 0.777],
    [0.888, 0.888],
    [1, 1],
]);
```

## Why?

This is particurally useful for displays, e.g. uniformly displaying drones on a curve during a light show (or even animating them!).

My particular use case here is to use it for displaying particles uniformly around any curve.

## How?

By using the Pygatherom Therom as an integral to find the distance travelled on a curve:

$$ \int_{0}^{b}\sqrt{1 + f'(x)^2}\ dx $$

We can first get the whole distance travelled throughout the function, split it into `n` parts, then solve for bound `b` with numerical integration.

> Made with <3 by BeRu and LeoDog896
