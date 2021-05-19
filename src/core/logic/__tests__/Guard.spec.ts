import { Guard } from "../Guard";

describe("Guard", () => {
    describe("againstNullOrUndefined", () => {
        it("should fail when passing null", () => {
            const result = Guard.againstNullOrUndefined({
                value: null,
                key: "a key"
            });
            expect(result.success).toBe(false);
            expect(result.message).toBe("Missing value for 'a key'");
        })

        it("should fail when passing undefined", () => {
            const result = Guard.againstNullOrUndefined({
                value: undefined,
                key: "a key"
            });
            expect(result.success).toBe(false);
            expect(result.message).toBe("Missing value for 'a key'");
        })

        it("should succeed when passing a string", () => {
            const result = Guard.againstNullOrUndefined({
                value: "a string",
                key: "a key"
            });
            expect(result.success).toBe(true);
        })

        it("should succeed when passing a number", () => {
            const result = Guard.againstNullOrUndefined({
                value: 123.56,
                key: "a key"
            });
            expect(result.success).toBe(true);
        })
    })

    describe("bulkAgainstNullOrUndefined", () => {
        it("should fail when at least one guard fails", () => {
            const args = [{
                value: 123.56,
                key: "k1"
            }, {
                value: "a string",
                key: "k2"
            }, {
                value: null,
                key: "k3"
            }];
            const result =  Guard.bulkAgainstNullOrUndefined(args);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Missing value for 'k3'")
        })

        it("should succeed when all guards succeed", () => {
            const args = [{
                value: 123.56,
                key: "a key"
            }, {
                value: "a string",
                key: "a key"
            }];
            const result = Guard.bulkAgainstNullOrUndefined(args);
            expect(result.success).toBe(true);
        })
    })
})