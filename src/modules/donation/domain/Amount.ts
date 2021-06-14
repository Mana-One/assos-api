import { UniqueId, ValueObject } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";

interface AmountProps {
    value: number;
    currency: string;
}

function defaultFormater(value: number, currency: string): string {
    return `${value} ${currency}`;
}

export class Amount extends ValueObject<AmountProps> {
    static readonly THRESHOLD: number = 10_000;
    static readonly ISO_CURRENCY_CODE_LENGTH = 3;

    private constructor(props: AmountProps){
        super(props);
    }

    getValue(): number {
        return this.props.value;
    }

    getCurrency(): string {
        return this.props.currency;
    }

    toString(formater?: (v: number, currency: string) => string): string {
        if(formater === undefined){
            formater = defaultFormater;
        }
        return formater(this.props.value, this.props.currency);
    }

    static create(value: number, currency: string): Result<Amount> {
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: "value", value },
            { key: "currency", value: currency }
        ]);
        if(!guard.success){
            return Result.ko<Amount>(guard.message);
        }

        if(value < 0 || value > Amount.THRESHOLD){
            return Result.ko<Amount>("Invalid amount");
        }

        if(currency.length !== Amount.ISO_CURRENCY_CODE_LENGTH){
            return Result.ko<Amount>("Invalid currency code");
        }
        
        currency = currency.toUpperCase();
        return Result.ok<Amount>(new Amount({ value, currency }));
    }
}