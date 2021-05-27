import { WatchedList } from "../WatchedList";


class NumberList extends WatchedList<number> {
    constructor(initialNumbers?: number[]){
        super(initialNumbers);
    }

    compareItems(a: number, b: number): boolean {
        return a === b;
    }
}

describe("WatchedList data structure", () => {
    describe("creation", () => {
        it("should return a new watched list when pasing an empty array", () => {
            const nList = new NumberList();
            expect(nList).toBeTruthy();
            expect(nList.countItems()).toBe(0);
            expect(nList.countNewItems()).toBe(0);
            expect(nList.countRemovedItems()).toBe(0);
        })

        it("should return a new watched list when pasing an array", () => {
            const arr = [0.256, 35, 32.6];
            const nList = new NumberList(arr);
            expect(nList).toBeTruthy();
            expect(nList.countItems()).toBe(arr.length);
            expect(nList.countNewItems()).toBe(0);
            expect(nList.countRemovedItems()).toBe(0);
        })
    })

    describe("add method", () => {
        it("should add a new item", () => {
            const arr = [0.256, 35, 32.6];
            const nList = new NumberList(arr);
            nList.add(69);
            expect(nList.countItems()).toBe(4);
            expect(nList.countNewItems()).toBe(1);
            expect(nList.countRemovedItems()).toBe(0);
        })

        it("should not add an existing item", () => {
            const arr = [0.256, 35, 32.6];
            const nList = new NumberList(arr);
            nList.add(35);
            expect(nList.countItems()).toBe(3);
            expect(nList.countNewItems()).toBe(0);
            expect(nList.countRemovedItems()).toBe(0);
        })
    })

    describe("remove method", () => {
        it("should remove item", () => {
            const arr = [0.256, 35, 32.6];
            const nList = new NumberList(arr);
            nList.remove(35);
            expect(nList.countItems()).toBe(2);
            expect(nList.countNewItems()).toBe(0);
            expect(nList.countRemovedItems()).toBe(1);
        })

        it("should not remove non-existent item from current list", () => {
            const arr = [0.256, 35, 32.6];
            const nList = new NumberList(arr);
            nList.remove(70);
            expect(nList.countItems()).toBe(3);
            expect(nList.countNewItems()).toBe(0);
            expect(nList.countRemovedItems()).toBe(1);
        })
    })
})