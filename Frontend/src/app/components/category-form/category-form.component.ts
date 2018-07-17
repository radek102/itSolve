/** Angular imports */
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

/** PrimeNG imports */
import {MessageService} from 'primeng/components/common/messageservice';

/** My app imports */
import { CategoryDto } from 'src/app/domain/category-dto';
import { CategoryService } from 'src/app/services/category.service';
import { BaseResponse } from 'src/app/domain/base-response';
import {RoutesNames} from "../../constants/route-names";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category : CategoryDto;

  constructor(private categoryService : CategoryService, private messageService : MessageService, private router: Router) { 
    this.category = new CategoryDto();
  }

  ngOnInit() {
  }

  saveCategory(){
    this.categoryService.CreateCategory(this.category).then(response => this.onResponseReceived(response));
  }

  public onResponseReceived(response : BaseResponse){
    console.log(response);
    if(response.Success){
      this.messageService.add({severity:'success', summary:"Category was create with success", detail:response.Message})
      this.router.navigate([RoutesNames.Home]);
    }
    else {
      this.messageService.add({severity:'error', summary:"Error while trying to create category", detail:response.Message})
    }
  }
}
