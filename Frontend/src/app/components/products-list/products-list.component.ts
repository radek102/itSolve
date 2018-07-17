/** Angular imports */
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

/** PrimeNG imports */
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';

/** My app imports */
import { RoutesNames } from "../../constants/route-names";
import { SecurityService } from '../../services/security.service';
import { ProductDto } from 'src/app/domain/product-dto';
import { ProductService } from 'src/app/services/product.service';
import { BaseResponseWithItem } from 'src/app/domain/base-response-with-item';
import { CategoryNodeDto } from 'src/app/domain/category-node-dto';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: ProductDto[];
  constructor(private router: Router, private productService: ProductService, private messageService: MessageService,
     private confirmationService : ConfirmationService) { }

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(){
    this.productService.GetProducts()
    .then(response => this.onProductsDataReceived(response));
  }

  private onProductsDataReceived(response: BaseResponseWithItem<ProductDto[]>) {
    if (!response.Success) {
      this.messageService.add({ severity: 'error', summary: "Can't load products, please try later", detail: response.Message });
      return;
    }

    this.products = response.Item;
  }

  public onCreateProductClick() {
    this.router.navigate([RoutesNames.ProductForm]);
  }

  public onEditProductClick(product: ProductDto) {
    this.router.navigate([RoutesNames.ProductForm, { productId: product.Id }]);
  }

  public onDeleteProductClick(product: ProductDto) {
    let self = this;
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${product.Name}?`,
      accept: () => {
        this.productService.DeleteProduct(product.Id)
        .then(response => self.onProductDeleted(response));
      }
  });
  }

  private onProductDeleted(response){
    if (!response.Success) {
      this.messageService.add({ severity: 'error', summary: "Delete product, please try later", detail: response.Message });
    }
    else
    {
      this.messageService.add({ severity: 'success', summary: "Product deleted with success", detail: response.Message });
      this.loadProducts();
    }
  }
}
