import { UniqueId } from "../../../../core/domain";
import { UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Card } from "../Card";
import { CardLast4 } from "../CardLast4";
import { Donator } from "../Donator";
import { Wallet } from "../Wallet";

describe("Donator entity", () => {
    describe("creation", () => {
        const uid = new UniqueId("a valid id");
        const firstName = UserName.create("Paolo").getValue();
        const lastName = UserName.create("Manaois").getValue();
        const email = UserEmail.create("username@yahoo.com").getValue();
        const password = UserPassword.createHashed("azertyUIOP123$").getValue();
        const wallet = new Wallet();
        const card = Card.create({
            last4: CardLast4.create("1234").getValue(),
            storeReference: "a reference"
        }, new UniqueId("a valid card id")).getValue();

        let props = {
            firstName,
            lastName,
            email,
            password,
            storeReference: "a valid store reference",
            wallet
        };

        afterEach(() => {
            props = {
                firstName,
                lastName,
                email,
                password,
                storeReference: "a valid store reference",
                wallet
            };
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
            expect(donator.getWallet()).toBe(wallet.getItems());
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
            expect(donator.getWallet()).toBe(wallet.getItems());
        })

        it("should return a new Donator when passing a non-empty wallet", () => {
            const wallet2 = new Wallet([card])
            const res = Donator.create(
                { ...props, wallet: wallet2 }, 
                uid
            );
            expect(res.success).toBe(true);

            const donator = res.getValue();
            expect(donator.getId().equals(uid)).toBe(true);
            expect(donator.getFirstName().equals(firstName)).toBe(true);
            expect(donator.getLastName().equals(lastName)).toBe(true);
            expect(donator.getEmail().equals(email)).toBe(true);
            expect(donator.getStoreReference()).toBe(props.storeReference);
            expect(donator.getWallet()).toBe(wallet2.getItems());
        })

        it("should fail when passing an empty store reference", () => {
            props.storeReference = "";
            const res = Donator.create(props, uid);
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe("Invalid store reference")
        })
    })
})