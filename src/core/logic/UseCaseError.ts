interface UseCaseErrorProps {
    message: string;
}

export abstract class UseCaseError implements UseCaseErrorProps {
    constructor(readonly message: string){}
}