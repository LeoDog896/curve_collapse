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
