import { BaseRequest } from ".//base-request";

export class RegisterRequest extends BaseRequest {
    public Email : string;
    public Password : string;
    public ConfirmPassword : string;
}
