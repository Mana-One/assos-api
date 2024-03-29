import { UniqueId } from "../../../../core/domain"
import { Amount } from "../Amount";
import { DonationType } from "../DonationType";
import { Donation } from "../Donation";
import { Recipient } from "../Recipient";

describe("Donation Entity", () => {
    const uid = new UniqueId("a valid id");
    const amount = Amount.create(500.50, "eur").getValue();

    const props = {
        amount,
        date: new Date(),
        type: DonationType.SINGLE,
        payerId: new UniqueId("a donator id"),
        recipient: Recipient.create({ 
            name: "a recipient",
            storeReference: "a valid store reference" 
        }, new UniqueId("a recipient id")).getValue()
    }

    describe("creation", () => {
        it("should return a donation instance", () => {
            const donationRes = Donation.create(props, uid);
            expect(donationRes.success).toBe(true);

            const donation = donationRes.getValue();
            expect(donation instanceof Donation).toBe(true);
            expect(donation.getId().equals(uid)).toBe(true);
            expect(donation.getAmount().equals(props.amount)).toBe(true);
            expect(donation.getDate()).toBe(props.date);
            expect(donation.getType()).toBe(props.type);
            expect(donation.getPayerId().equals(props.payerId)).toBe(true);
            expect(donation.getRecipient().equals(props.recipient)).toBe(true);
        })

        it("should return a donation instance when not passing an id", () => {
            const donationRes = Donation.create(props);
            expect(donationRes.success).toBe(true);

            const donation = donationRes.getValue();
            expect(donation instanceof Donation).toBe(true);
            expect(donation.getId()).toBeTruthy();
            expect(donation.getAmount().equals(props.amount)).toBe(true);
            expect(donation.getDate()).toBe(props.date);
            expect(donation.getType()).toBe(props.type);
            expect(donation.getPayerId().equals(props.payerId)).toBe(true);
            expect(donation.getRecipient().equals(props.recipient)).toBe(true);
        })
    })
})