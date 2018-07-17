/** Angular imports */
import { Router } from "@angular/router";

/** My app imports */
import { BaseResponse } from "src/app/domain/base-response";
import { RoutesNames } from "src/app/constants/route-names";


export class BaseService {

    constructor(private router: Router) {
    }

    protected processErrorResponse(error : any) {
        if (error.status == 401) {
            let response = new BaseResponse();
            response.Success = false;
            response.Message = "User not logged";
            this.router.navigate([RoutesNames.Login]);
            return response;
        }
        return error;
    }
}
