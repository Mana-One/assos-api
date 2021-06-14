import { Entity, UniqueId } from "../../../core/domain";
import { Result } from "../../../core/logic";
import { Amount } from "./Amount";
import { DonationType } from "./DonationType";
import { Recipient } from "./Recipient";


interface DonationProps {
    amount: Amount;
    date: Date;
    type: DonationType;
    donatorId: UniqueId;
    recipient: Recipient;
}

export class Donation extends Entity<DonationProps> {
    getId(): UniqueId {
        return this._id;
    }

    getAmount(): Amount {
        return this.props.amount;
    }

    getDate(): Date {
        return this.props.date;
    }

    getType(): DonationType {
        return this.props.type;
    }

    getDonatorId(): UniqueId {
        return this.props.donatorId;
    }

    getRecipient(): Recipient {
        return this.props.recipient;
    }

    static create(props: DonationProps, id?: UniqueId): Result<Donation> {
        return Result.ok<Donation>(new Donation(props, id));
    }
}