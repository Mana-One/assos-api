import { Guard } from "../Guard";

describe("Guard", () => {
    describe("againstNullOrUndefined", () => {
        it("should fail when passing null", () => {
            expect(() => Guard.againstNullOrUndefined({
                value: null,
                key: "a key"
            })).toThrow(Guard.MissingValue);
        })

        it("should fail when passing undefined", () => {
            expect(() => Guard.againstNullOrUndefined({
                value: undefined,
                key: "a key"
            })).toThrow(Guard.MissingValue);
        })

        it("should succeed when passing a string", () => {
            expect(() => Guard.againstNullOrUndefined({
                value: "a string",
                key: "a key"
            })).not.toThrow();
        })

        it("should succeed when passing a number", () => {
            expect(() => Guard.againstNullOrUndefined({
                value: 123.56,
                key: "a key"
            })).not.toThrow();
        })
    })

    describe("bulkAgainstNullOrUndefined", () => {
        it("should fail when at least one guard fails", () => {
            const args = [{
                value: 123.56,
                key: "a key"
            }, {
                value: "a string",
                key: "a key"
            }, {
                value: null,
                key: "a key"
            }];
            expect(() => Guard.bulkAgainstNullOrUndefined(args)).toThrow(Guard.MissingValue);
        })

        it("should succeed when all guards succeed", () => {
            const args = [{
                value: 123.56,
                key: "a key"
            }, {
                value: "a string",
                key: "a key"
            }];
            expect(() => Guard.bulkAgainstNullOrUndefined(args)).not.toThrow();
        })
    })
})