/** Angular imports */
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

/** PrimeNG imports */
import {MessageService} from 'primeng/components/common/messageservice';

/** My app imports */
import { SecurityService } from '../../services/security.service';
import { RegisterRequest } from '../../domain/register-request';
import { BaseResponse } from 'src/app/domain/base-response';
import {RoutesNames} from "../../constants/route-names";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private email : string;
  private password : string;
  private retypedPassword : string;

  constructor(private securityService : SecurityService, private messageService : MessageService, private router: Router) { }

  ngOnInit() {
  }

  onRegister(){
    let registerRequest : RegisterRequest = new RegisterRequest();
    registerRequest.Email = this.email;
    registerRequest.Password = this.password;
    registerRequest.ConfirmPassword = this.retypedPassword;
    this.securityService.registerUser(registerRequest).then(response => {this.onRegisterResponseReceived(response);});
  }

  public onRegisterResponseReceived(response : BaseResponse){
    console.log(response);
    if(response.Success){
      this.messageService.add({severity:'success', summary:"Register was succesfull", detail:response.Message})
      this.router.navigate([RoutesNames.Login]);
    }
    else {
      this.messageService.add({severity:'error', summary:"Error while trying to register user", detail:response.Message})
    }
  }
}
