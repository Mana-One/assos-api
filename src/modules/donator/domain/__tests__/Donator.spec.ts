import { UniqueId } from "../../../../core/domain";
import { UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Donator } from "../Donator";

describe("Donator entity", () => {
    const uid = new UniqueId("a valid id");
    const firstName = UserName.create("Paolo").getValue();
    const lastName = UserName.create("Manaois").getValue();
    const email = UserEmail.create("username@yahoo.com").getValue();
    const password = UserPassword.createHashed("azertyUIOP123$").getValue();

    let props = {
        firstName,
        lastName,
        email,
        password,
        storeReference: "a valid store reference"
    };

    describe("creation", () => {
        afterEach(() => {
            props.storeReference = "a valid store reference"
        })

        it("should return a new Donator when passing an undefined id", () => {
            const res = Donator.create(props);
            expect(res.success).toBe(true);

            const donator = res.getValue();
            expect(donator.getId()).toBeTruthy();
            expect(donator.getFirstName().equals(firstName)).toBe(true);
            expect(donator.getLastName().equals(lastName)).toBe(true);
            expect(donator.getEmail().equals(email)).toBe(true);
            expect(donator.getStoreReference()).toBe(props.storeReference);
        })

        it("should return a new Donator when passing a valid id", () => {
            const res = Donator.create(props, uid);
            expect(res.success).toBe(true);

            const donator = res.getValue();
            expect(donator.getId().equals(uid)).toBe(true);
            expect(donator.getFirstName().equals(firstName)).toBe(true);
            expect(donator.getLastName().equals(lastName)).toBe(true);
            expect(donator.getEmail().equals(email)).toBe(true);            
            expect(donator.getStoreReference()).toBe(props.storeReference);
        })

        it("should fail when passing an empty store reference", () => {
            props.storeReference = "";
            const res = Donator.create(props, uid);
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid store reference")
        })
    })
})