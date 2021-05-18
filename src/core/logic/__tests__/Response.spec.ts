import { Response } from "../Response";

describe("Response data structure", () => {
    it("should be successful even if value is not passed", () => {
        const result = Response.ok<boolean>();
        expect(result).toBeTruthy();
        expect(result.success).toBe(true);
        expect(result.value).toBe(undefined);
        expect(result.hasValue()).toBe(false);
    })

    it("should be successful with a value", () => {
        const result = Response.ok<string>("hey");
        expect(result).toBeTruthy();
        expect(result.success).toBe(true);
        expect(result.value).toBe("hey");
        expect(result.hasValue()).toBe(true);
    })

    it("should be a failure with always an error value", () => {
        const result = Response.ko<string>("oops");
        expect(result).toBeTruthy();
        expect(result.success).toBe(false);
        expect(result.value).toBe("oops");
        expect(result.hasValue()).toBe(true);
    })
})