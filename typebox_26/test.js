const test = require("ava");
const typebox25 = require("@sinclair/typebox");
const { Value } = require("@sinclair/typebox/value");

const ThrowsOnTwentySixType = typebox25.Type.Intersect([
  typebox25.Type.Object({
    view: typebox25.Type.Literal("a"),
  }),
  typebox25.Type.Object({
    view: typebox25.Type.Union([
      typebox25.Type.Literal("b"),
      typebox25.Type.Literal("c"),
    ]),
  }),
]);

test("Intersect Issue", async (t) => {
  t.is(Value.Check(ThrowsOnTwentySixType, { view: "a" }), true);
  t.is(Value.Check(ThrowsOnTwentySixType, { view: "b" }), true);
  t.is(Value.Check(ThrowsOnTwentySixType, { view: "c" }), true);
  t.is(Value.Check(ThrowsOnTwentySixType, { view: "ERROR" }), false);
});
