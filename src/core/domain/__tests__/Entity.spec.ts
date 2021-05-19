import { Entity } from "../Entity";
import { UniqueId } from "../UniqueId";

describe("Entity data structure", () => {
    interface Props1 {
        key: string;
    }
    const uid = new UniqueId("1");
    const uid2 = new UniqueId(1);

    describe("creation", () => {
        it("should create an entity", () => {
            const entity = new Entity<Props1>({ key: "hey" }, uid);
            expect(entity).toBeTruthy();
        })
    
        it("should create an entity without passing an id", () =>{
            const entity = new Entity<Props1>({ key: "hey" });
            expect(entity).toBeTruthy();
        })
    })

    describe("equals", () => {
        it("should return true when the entities are the same object", () => {
            const entity = new Entity<Props1>({ key: "hey" }, uid);
            const check = entity.equals(entity);
            expect(check).toBe(true);
        })

        it("should return true when the ids are the same", () => {
            const entity = new Entity<Props1>({ key: "hey" }, uid);
            const entity2 = new Entity<Props1>({ key: "hey" }, uid);
            const check = entity.equals(entity2);
            expect(check).toBe(true);
        })

        it("should return true when the ids are the same, even if the props content is different", () => {
            const entity = new Entity<Props1>({ key: "hey" }, uid);
            const entity2 = new Entity<Props1>({ key: "heyho" }, uid);
            const check = entity.equals(entity2);
            expect(check).toBe(true);
        })

        it("should return false when comparing to null", () => {
            const entity = new Entity<Props1>({ key: "hey" }, uid);
            const check = entity.equals(null);
            expect(check).toBe(false);
        })

        it("should return false when comparing to undefined", () => {
            const entity = new Entity<Props1>({ key: "hey" }, uid);
            const check = entity.equals();
            expect(check).toBe(false);
        })

        it("should return false when the ids are different", () => {
            const entity = new Entity<Props1>({ key: "hey" }, uid);
            const entity2 = new Entity<Props1>({ key: "heyho" }, uid2);
            const check = entity.equals(entity2);
            expect(check).toBe(false);
        })

        it("should return false when the ids are different, even with the same props content", () => {
            const entity = new Entity<Props1>({ key: "hey" }, uid);
            const entity2 = new Entity<Props1>({ key: "hey" }, uid2);
            const check = entity.equals(entity2);
            expect(check).toBe(false);
        })
    })
})