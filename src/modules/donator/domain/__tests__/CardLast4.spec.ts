import { CardLast4 } from "../CardLast4";

describe("CardLast4 value object", () => {
    describe("creation", () => {
        it("should return last4 value object", () => {
            const value = "1234";
            const res = CardLast4.create(value);
            expect(res.success).toBe(true);

            const last4 = res.getValue();
            expect(last4 instanceof CardLast4).toBe(true);
            expect(last4.getValue()).toBe(value);
        })

        it("should fail when passing an empty string", () => {
            const res = CardLast4.create("");
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid last4 value")
        })

        it("should fail when passing a string that is too long", () => {
            const res = CardLast4.create("12345");
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid last4 value")
        })

        it("should fail when passing an string containing letters", () => {
            const res = CardLast4.create("12g4");
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid last4 value")
        })
    })
})