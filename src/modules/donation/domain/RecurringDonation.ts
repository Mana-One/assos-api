import { UniqueId, ValueObject } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";
import { StoreReference } from "./StoreReference";
import { Amount } from "./Amount";


interface RecurringDonationProps {
    payerId: UniqueId;
    recipientId: UniqueId;
    amount: Amount;
    storeReference: StoreReference,
    createdAt: Date;
}

export class RecurringDonation extends ValueObject<RecurringDonationProps> {
    private constructor(props: RecurringDonationProps){
        super(props);
    }

    getPayerId(): UniqueId {
        return this.props.payerId;
    }

    getRecipientId(): UniqueId {
        return this.props.recipientId;
    }

    getAmount(): Amount {
        return this.props.amount;
    }

    getStoreReference(): StoreReference {
        return this.props.storeReference;
    }

    getCreatedAt(): Date {
        return this.props.createdAt;
    }

    static create(
        payerId: UniqueId,
        recipientId: UniqueId,
        amount: Amount,
        storeReference: StoreReference,
        createdAt?: Date
    ): Result<RecurringDonation> {

        const guardResult = Guard.againstNullOrUndefined(
            { key: "storeReference", value: storeReference }
        );
        if(!guardResult.success){
            return Result.ko<RecurringDonation>(guardResult.message);
        }

        if(storeReference.length === 0){
            return Result.ko<RecurringDonation>("Invalid store reference");
        }

        if(createdAt === undefined){
            createdAt = new Date();
        }
        return Result.ok<RecurringDonation>(new RecurringDonation({
            payerId,
            recipientId,
            amount,
            storeReference,
            createdAt
        }));
    }
}