/** Angular imports */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

/** PrimeNG imports */
import { MessageService } from 'primeng/components/common/messageservice';

/** My app imports */
import { ProductDto } from 'src/app/domain/product-dto';
import { ProductService } from 'src/app/services/product.service';
import { BaseResponse } from 'src/app/domain/base-response';
import { RoutesNames } from "../../constants/route-names";
import { CategoryTreeComponent } from 'src/app/components/category-tree/category-tree.component';
import { RoutesParameters } from 'src/app/constants/route-parameters';
import { BaseResponseWithItem } from 'src/app/domain/base-response-with-item';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @ViewChild(CategoryTreeComponent) categoryTree: CategoryTreeComponent;
  public product: ProductDto;

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.product = new ProductDto();
    let self = this;
    this.route.params.subscribe(params => self.onUrlChange(params));
  }

  onUrlChange(urlParams) {
    let productId = urlParams[RoutesParameters.ProductId];
    if (productId == null)
      return;

    this.loadProduct(productId);
  }

  private loadProduct(productId: number) {
    this.productService.GetProduct(productId).then(response => this.onProductLoaded(response));
  }

  private onProductLoaded(response: BaseResponseWithItem<ProductDto>) {
    if (response.Success) {
      this.product = response.Item;
      this.categoryTree.selectCategory(response.Item.CategoryId);
    }
    else {
      this.messageService.add({ severity: 'error', summary: "Error while trying to load product data", detail: response.Message })
    }
  }

  public saveProduct() {
    if (this.checkFormValidity()) {
      this.product.CategoryId = this.categoryTree.selectedCategory.data.Id;
      this.productService.SaveProduct(this.product).then(response => this.onResponseReceived(response));
    }
  }

  private checkFormValidity(): boolean {
    if (this.categoryTree.selectedCategory == null) {
      this.messageService.add({ severity: 'error', summary: "Missing data.", detail: "You have to choose category." })
      return false;
    }
    if (this.product.Name == null) {
      this.messageService.add({ severity: 'error', summary: "Missing data.", detail: "You have to enter name." })
      return false;
    }
    if (this.product.Price == null) {
      this.messageService.add({ severity: 'error', summary: "Missing data.", detail: "You have to enter price." })
      return false;
    }
    if (this.product.Price <= 0) {
      this.messageService.add({ severity: 'error', summary: "Invalid data.", detail: "Price must be bigger than 0." })
      return false;
    }
    return true;
  }

  public onResponseReceived(response: BaseResponse) {
    console.log(response);
    if (response.Success) {
      this.messageService.add({ severity: 'success', summary: "Product was saved successfully", detail: response.Message })
      this.router.navigate([RoutesNames.ProductsList]);
    }
    else {
      this.messageService.add({ severity: 'error', summary: "Error while trying to save product", detail: response.Message })
    }
  }
}
