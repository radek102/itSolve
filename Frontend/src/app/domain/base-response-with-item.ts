import { BaseResponse } from "src/app/domain/base-response";

export class BaseResponseWithItem<T> extends BaseResponse {
    Item : T;
}
