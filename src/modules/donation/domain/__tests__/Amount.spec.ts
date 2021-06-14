import { Amount } from "../Amount";

describe("Amount Value Object", () => {
    const props = {
        value: 500.50,
        currency: "eur"
    };

    describe("creation", () => {
        afterEach(() => {
            props.value = 500.50;
            props.currency = "eur";
        })

        it("should return an Amount instance", () => {
            const amountRes = Amount.create(props.value, props.currency);
            expect(amountRes.success).toBe(true);
            const amount = amountRes.getValue();
            expect(amount instanceof Amount).toBe(true);
            expect(amount.getValue()).toBe(props.value);
            expect(amount.getCurrency()).toBe(props.currency.toUpperCase());
        })

        it("should fail if amount is negative", () => {
            props.value = -50.36;
            const amountRes = Amount.create(props.value, props.currency);
            expect(amountRes.success).toBe(false);
            expect(amountRes.getValue()).toBe("Invalid amount");
        })

        it("should fail if amount is above the threshold", () => {
            props.value = Amount.THRESHOLD + 0.1;
            const amountRes = Amount.create(props.value, props.currency);
            expect(amountRes.success).toBe(false);
            expect(amountRes.getValue()).toBe("Invalid amount");
        })

        it("should fail if currency is invalid", () => {
            props.currency = "euro";
            const amountRes = Amount.create(props.value, props.currency);
            expect(amountRes.success).toBe(false);
            expect(amountRes.getValue()).toBe("Invalid currency code");
        })
    })

    describe("toString", () => {
        it("should output the default format when no function is passed", () => {
            const amount = Amount.create(props.value, props.currency).getValue();
            const str = amount.toString();
            expect(str).toBe(`${props.value} ${props.currency.toUpperCase()}`);
        })

        it("should output the corresponding format", () => {
            const amount = Amount.create(props.value, props.currency).getValue();
            const str = amount.toString((v: number, c: string) => `${c}${v}`);
            expect(str).toBe(`${props.currency.toUpperCase()}${props.value}`);
        })
    })
})