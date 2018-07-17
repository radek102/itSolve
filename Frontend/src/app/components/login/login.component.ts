/** Angular imports */
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

/** PrimeNG imports */
import {MessageService} from 'primeng/components/common/messageservice';

/** My app imports */
import { SecurityService } from '../../services/security.service';
import { LoginRequest } from '../../domain/login-request';
import { BaseResponse } from 'src/app/domain/base-response';
import {RoutesNames} from "../../constants/route-names";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email : string = "admin@test.pl";
  private password : string = "Test_test0";

  constructor(private securityService : SecurityService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
  }
  
  public onLogin(){
    let loginRequest : LoginRequest = new LoginRequest();
    loginRequest.email = this.email;
    loginRequest.password = this.password;
    this.securityService.loginUser(loginRequest).then(response => {this.onLoginResponseReceived(response);});
  }

  public onLoginResponseReceived(response : BaseResponse){
    console.log(response);
    if(response.Success){
      this.messageService.add({severity:'success', summary:"You are logged in", detail:response.Message})
      this.router.navigate([RoutesNames.Home]);
    }
    else {
      this.messageService.add({severity:'error', summary:"Error while loging in", detail:response.Message})
    }
  }
}
