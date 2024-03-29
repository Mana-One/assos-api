import { Result } from "../Result";

describe("Result data structure", () => {
    it("should be successful even if value is not passed", () => {
        const result = Result.ok<boolean>();
        expect(result).toBeTruthy();
        expect(result.success).toBe(true);
        expect(() => result.getValue()).toThrow("A value was not provided");
    })

    it("should be successful with a value", () => {
        const result = Result.ok<string>("hey");
        expect(result).toBeTruthy();
        expect(result.success).toBe(true);
        expect(result.getValue()).toBe("hey");
    })

    it("should be a failure with always an error value", () => {
        const result = Result.ko<string>("oops");
        expect(result).toBeTruthy();
        expect(result.success).toBe(false);
        expect(result.getValue()).toBe("oops");
    })
})