/** Angular imports */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/** My app imports */
import { BaseResponse } from '../domain/base-response';
import { LoginRequest } from '../domain/login-request';
import { environment } from '../../environments/environment';
import { LoginResponse } from 'src/app/domain/login-response';
import { RegisterRequest } from '../domain/register-request';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public userLogged: boolean;
  private authentificationToken: string;

  constructor(private http: HttpClient) {
    this.userLogged = false;
  }

  public IsUserLoggedIn(): boolean {
    return this.userLogged;
  }

  public getAuthentificationToken() {
    return "Bearer " + this.authentificationToken;
  }

  public loginUser(loginRequest: LoginRequest): Promise<BaseResponse> {
    let loginRequestBody = `grant_type=${loginRequest.grant_type}&username=${loginRequest.email}&password=${loginRequest.password}`;
    return this.http.post<any>(environment.backendUrl + "token", loginRequestBody)
      .toPromise()
      .then(res => {
        let loginResponse: LoginResponse = new LoginResponse();
        loginResponse.accessToken = res.accessToken;
        loginResponse.expiresIn = res.expiresIn;
        loginResponse.Message = "Everything ok";
        loginResponse.Success = true;
        loginResponse.userName = res.userName;
        loginResponse.accessToken = res.access_token;
        this.authentificationToken = res.access_token;
        this.userLogged = true;
        return loginResponse;
      })
      .catch(error => {
        let response = new BaseResponse();
        response.Success = false;
        response.Message = error.error.error_description;
        return response;
      });
  }

  public registerUser(registerRequest: RegisterRequest): Promise<BaseResponse> {
    return this.http.post<any>(environment.backendUrl + "api/Account/Register", registerRequest)
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(error => {
        return error;
      });
  }

  public logout(){
    this.userLogged = false;
    this.authentificationToken = null;
  }
}
