import { BaseResponse } from "src/app/domain/base-response";

export class LoginResponse extends BaseResponse{
    accessToken : string;
    userName : string;
    expiresIn : string
}
