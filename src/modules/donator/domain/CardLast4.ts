import { ValueObject } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";

interface CardLast4Props {
    value: string;
}

export class CardLast4 extends ValueObject<CardLast4Props> {
    // value must be 4 digits exactly
    private static last4Regex = /^\d{4}$/g;

    private constructor(props: CardLast4Props){
        super(props);
    }

    getValue(): string {
        return this.props.value;
    }

    static create(last4: string): Result<CardLast4> {
        const guardResult = Guard.againstNullOrUndefined({
            key: "last4",
            value: last4
        });
        if(!guardResult.success){
            return Result.ko<CardLast4>(guardResult.message);
        }

        if(!this.last4Regex.test(last4)){
            return Result.ko<CardLast4>("Invalid last4 value");
        }

        return Result.ok<CardLast4>(new CardLast4({
            value: last4.padStart(16, "*")
        }));
    }
}