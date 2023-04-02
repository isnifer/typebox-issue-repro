# typebox-issue-repro

### Test File for both versions

```js
const test = require("ava");
const typebox = require("@sinclair/typebox");
const { Value } = require("@sinclair/typebox/value");

const ThrowsOnTwentySixType = typebox.Type.Intersect([
  typebox.Type.Object({
    view: typebox.Type.Literal("a"),
  }),
  typebox.Type.Object({
    view: typebox.Type.Union([
      typebox.Type.Literal("b"),
      typebox.Type.Literal("c"),
    ]),
  }),
]);

test("Intersect Issue check existing field a", async (t) => {
  t.is(Value.Check(ThrowsOnTwentySixType, { view: "a" }), true);
});

test("Intersect Issue check existing field b", async (t) => {
  t.is(Value.Check(ThrowsOnTwentySixType, { view: "b" }), true);
});

test("Intersect Issue check existing field c", async (t) => {
  t.is(Value.Check(ThrowsOnTwentySixType, { view: "c" }), true);
});

test("Intersect Issue check NON-existing field ERROR", async (t) => {
  t.is(Value.Check(ThrowsOnTwentySixType, { view: "ERROR" }), false);
});
```

### Results version 0.25.X

```sh
npx ava test.js

  ✔ Intersect Issue check existing field a
  ✔ Intersect Issue check existing field b
  ✔ Intersect Issue check existing field c
  ✔ Intersect Issue check NON-existing field ERROR
  ─

  4 tests passed
```

### Results version 0.26.X

```sh
npx ava test.js

  ✘ [fail]: Intersect Issue check existing field a
  ✘ [fail]: Intersect Issue check existing field b
  ✘ [fail]: Intersect Issue check existing field c
  ✔ Intersect Issue check NON-existing field ERROR
  ─

  Intersect Issue check existing field a

  test.js:18

   17: test("Intersect Issue check existing field a", async (t) => {
   18:   t.is(Value.Check(ThrowsOnTwentySixType, { view: "a" }), true);
   19: });

  Difference (- actual, + expected):

  - false
  + true

  › test.js:18:5



  Intersect Issue check existing field b

  test.js:22

   21: test("Intersect Issue check existing field b", async (t) => {
   22:   t.is(Value.Check(ThrowsOnTwentySixType, { view: "b" }), true);
   23: });

  Difference (- actual, + expected):

  - false
  + true

  › test.js:22:5



  Intersect Issue check existing field c

  test.js:26

   25: test("Intersect Issue check existing field c", async (t) => {
   26:   t.is(Value.Check(ThrowsOnTwentySixType, { view: "c" }), true);
   27: });

  Difference (- actual, + expected):

  - false
  + true

  › test.js:26:5

  ─

  3 tests failed
```
