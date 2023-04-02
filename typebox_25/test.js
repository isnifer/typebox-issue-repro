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
