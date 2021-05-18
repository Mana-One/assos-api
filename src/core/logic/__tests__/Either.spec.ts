import { left, right } from "../Either"

describe("Either type", () => {
    describe("left function", () => {
        it("should return an instance of Left class", () => {
            const value = false;
            const resultOrError = left(value);
            expect(resultOrError).toBeTruthy();
            expect(resultOrError.isLeft()).toBe(true);
            expect(resultOrError.isRight()).toBe(false);
            expect(typeof resultOrError.value === typeof value).toBe(true);
        })
    })

    describe("right function", () => {
        it("should return an instance of Right class", () => {
            const value = "hell yeah";
            const resultOrError = right(value);
            expect(resultOrError).toBeTruthy();
            expect(resultOrError.isLeft()).toBe(false);
            expect(resultOrError.isRight()).toBe(true);
            expect(typeof resultOrError.value === typeof value).toBe(true);
        })
    })
})