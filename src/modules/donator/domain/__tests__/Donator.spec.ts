import { UniqueId } from "../../../../core/domain";
import { UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Card } from "../Card";
import { CardLast4 } from "../CardLast4";
import { Donator } from "../Donator";
import { Wallet } from "../Wallet";

describe("Donator entity", () => {
    const uid = new UniqueId("a valid id");
    const firstName = UserName.create("Paolo").getValue();
    const lastName = UserName.create("Manaois").getValue();
    const email = UserEmail.create("username@yahoo.com").getValue();
    const password = UserPassword.createHashed("azertyUIOP123$").getValue();

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
        wallet: new Wallet()
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
            expect(donator.getWallet()).toBe(props.wallet.getItems());
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
            expect(donator.getWallet()).toBe(props.wallet.getItems());
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

    describe("add card method", () => {
        afterEach(() => {
            props.wallet = new Wallet();
        })
        
        it("should succeed when wallet is not full", () => {
            const donator = Donator.create(props, uid).getValue();
            donator.addCard(card);

            const card2 = Card.create({
                last4: CardLast4.create("1234").getValue(),
                storeReference: "a reference"
            }, new UniqueId("a valid id2")).getValue();
            donator.addCard(card2);
            expect(donator.getWallet().length).toBe(2);
        })

        it("should not add when wallet is full", () => {
            const donator = Donator.create(props, uid).getValue();
            for(let i = 0; i < Donator.WALLET_CAPACITY; i++){
                donator.addCard(Card.create({
                    last4: CardLast4.create("1234").getValue(),
                    storeReference: "a reference"
                }, new UniqueId(`a valid id${i}`)).getValue());
            }
            expect(donator.getWallet().length).toBe(Donator.WALLET_CAPACITY);

            donator.addCard(Card.create({
                last4: CardLast4.create("1234").getValue(),
                storeReference: "a reference"
            }, new UniqueId(`a valid id${Donator.WALLET_CAPACITY + 1}`)).getValue());
            expect(donator.getWallet().length).toBe(Donator.WALLET_CAPACITY);
        })

        it("should not add when card already is in wallet", () => {
            const donator = Donator.create(props, uid).getValue();
            donator.addCard(card);
            expect(donator.getWallet().length).toBe(1);
            donator.addCard(card)
            expect(donator.getWallet().length).toBe(1);
        })
    })

    describe("is wallet full method", () => {
        afterEach(() => {
            props.wallet = new Wallet();
        })

        it("should return false if not full", () => {
            const donator = Donator.create(props, uid).getValue();
            for(let i = 0; i < Donator.WALLET_CAPACITY - 1; i++){
                donator.addCard(Card.create({
                    last4: CardLast4.create("1234").getValue(),
                    storeReference: "a reference"
                }, new UniqueId(`a valid id${i}`)).getValue());
            }
            expect(donator.isWalletFull()).toBe(false);
        })

        it("should return true when full", () => {
            const donator = Donator.create(props, uid).getValue();
            for(let i = 0; i < Donator.WALLET_CAPACITY; i++){
                donator.addCard(Card.create({
                    last4: CardLast4.create("1234").getValue(),
                    storeReference: "a reference"
                }, new UniqueId(`a valid id${i}`)).getValue());
            }
            expect(donator.isWalletFull()).toBe(true);
        })
    })

    describe("remove exisiting card method", () => {
        afterEach(() => {
            props.wallet = new Wallet();
        })

        it("should remove card", () => {
            props.wallet = new Wallet([card]);
            const donator = Donator.create(props, uid).getValue();
            donator.removeCard(card);
            expect(donator.countCards()).toBe(0);
            expect(donator.countRemovedCards()).toBe(1);
        })
    })
})