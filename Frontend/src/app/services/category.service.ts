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
import { CategoryNodeDto } from 'src/app/domain/category-node-dto';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(private http: HttpClient, private securityService: SecurityService, router: Router) { super(router) }

  public CreateCategory(categoryDto: CategoryDto) {
    let self = this;
    return this.http.post<any>(environment.backendUrl + "api/Category", categoryDto,
      { headers: { "Content-Type": "application/json", "Authorization": this.securityService.getAuthentificationToken() } })
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(error => {
        return self.processErrorResponse(error);
      });
  }

  public GetCategoriesData() {
    let self = this;
    return this.http.get<any>(environment.backendUrl + "api/CategoryTree",
      { headers: { "Content-Type": "application/json", "Authorization": this.securityService.getAuthentificationToken() } })
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(error => {
        return self.processErrorResponse(error);
      });
  }

  public SaveCategoriesTree(categoryTree: CategoryNodeDto[]) {
    let self = this;
    return this.http.post<any>(environment.backendUrl + "api/CategoryTree", categoryTree,
      { headers: { "Content-Type": "application/json", "Authorization": this.securityService.getAuthentificationToken() } })
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(error => {
        return self.processErrorResponse(error);
      });
  }
}
