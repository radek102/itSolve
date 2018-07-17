export class LoginRequest {
    constructor() {
        this.grant_type = "password";
    }

    grant_type : string;
    email : string;
    password : string;

}
