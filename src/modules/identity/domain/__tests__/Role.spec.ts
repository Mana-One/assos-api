import { isRole, Role } from "../Role";

describe("Role enum", () => {
    it("should return true if value is part of the Role enum", () => {
        expect(isRole('donator')).toBe(true);
        expect(isRole('volunteer')).toBe(true);
        expect(isRole('manager')).toBe(true);
        expect(isRole('admin')).toBe(true);
    })

    it("should return false when value is not part of Role enum", () => {
        expect(isRole('donatorlm')).toBe(false);
        expect(isRole('another role')).toBe(false);
    })
})