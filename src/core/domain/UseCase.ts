export interface UseCase<IRequest, IResponse> {
    (request: IRequest): IResponse;
}