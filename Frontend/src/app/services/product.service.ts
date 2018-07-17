/** Angular imports */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/** My app imports */
import { CategoryDto } from 'src/app/domain/category-dto';
import { SecurityService } from '../services/security.service';
import { environment } from '../../environments/environment';
import { BaseResponse } from 'src/app/domain/base-response';
import { BaseService } from 'src/app/services/base-service';
import { ProductDto } from 'src/app/domain/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(private http: HttpClient, private securityService: SecurityService, router: Router) { super(router) }

  public GetProducts() {
    let self = this;
    return this.http.get<any>(environment.backendUrl + "api/Product",
      { headers: { "Content-Type": "application/json", "Authorization": this.securityService.getAuthentificationToken() } })
      .toPromise()
      .then(res => {
        return (res);
      })
      .catch(error => {
        return self.processErrorResponse(error);
      });
  }

  public GetProduct(productId : number) {
    let self = this;
    return this.http.get<any>(environment.backendUrl + "api/Product/" + productId,
      { headers: { "Content-Type": "application/json", "Authorization": this.securityService.getAuthentificationToken() } })
      .toPromise()
      .then(res => {
        return (res);
      })
      .catch(error => {
        return self.processErrorResponse(error);
      });
  }

  public DeleteProduct(productId : Number) {
    let self = this;
    return this.http.delete<any>(environment.backendUrl + "api/Product/" + productId,
      { headers: { "Content-Type": "application/json", "Authorization": this.securityService.getAuthentificationToken() } })
      .toPromise()
      .then(res => {
        return (res);
      })
      .catch(error => {
        return self.processErrorResponse(error);
      });
  }

  public SaveProduct(product: ProductDto) {
    let self = this;
    let call = null;
    
    if(product.Id == null){
      call = this.http.post<any>(environment.backendUrl + "api/Product", product,
      { headers: { "Content-Type": "application/json", "Authorization": this.securityService.getAuthentificationToken() } });
    }
    else {
      call = this.http.put<any>(environment.backendUrl + "api/Product", product,
      { headers: { "Content-Type": "application/json", "Authorization": this.securityService.getAuthentificationToken() } });
    }

    return call.toPromise()
      .then(res => {
        return res;
      })
      .catch(error => {
        return self.processErrorResponse(error);
      });
  }

}
