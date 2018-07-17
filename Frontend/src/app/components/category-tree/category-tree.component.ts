import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

/** PrimeNG imports */
import { MessageService } from 'primeng/components/common/messageservice';
import { TreeNode } from 'primeng/api';

/** My app imports */
import { CategoryDto } from 'src/app/domain/category-dto';
import { CategoryService } from 'src/app/services/category.service';
import { BaseResponseWithItem } from 'src/app/domain/base-response-with-item';
import { CategoryNodeDto } from 'src/app/domain/category-node-dto';
import { forEach } from '@angular/router/src/utils/collection';
import { BaseResponse } from 'src/app/domain/base-response';
import { RoutesNames } from 'src/app/constants/route-names';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.css']
})
export class CategoryTreeComponent implements OnInit {

  @Input() canModify: boolean;
  @Input() canSelect: boolean;
  @Input() expandAll: boolean;

  public selectionMode: string;
  public selectedCategory: TreeNode;
  private categories: TreeNode[];
  private selectedCategoryId: Number
  constructor(private categoryService: CategoryService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.categoryService.GetCategoriesData()
      .then(response => this.onResponseReceived(response));

    this.setDefaultValuesForParameter();
  }

  private setDefaultValuesForParameter() {
    if (this.canModify == null) {
      this.canModify = true;
    }

    if (this.canSelect == null) {
      this.canSelect = false;
    }

    if (this.expandAll == null) {
      this.expandAll = true;
    }

    if (this.canSelect) {
      this.selectionMode = "single";
    }
    else {
      this.selectionMode = "none";
    }
  }

  public onNewCategoryButtonClick() {
    this.router.navigate([RoutesNames.CreateCategory]);
  }

  public selectCategory(categoryId: Number) {
    this.selectedCategoryId = categoryId;
  }

  public onResponseReceived(response: BaseResponseWithItem<CategoryNodeDto[]>) {
    if (!response.Success) {
      this.messageService.add({ severity: 'error', summary: "Can't load category, please try later", detail: response.Message });
      return;
    }

    this.categories = this.convertCategoryNodeDtos(response.Item);
  }

  private convertCategoryNodeDtos(categories: CategoryNodeDto[]): TreeNode[] {
    let treeNodes: TreeNode[] = [];
    let self = this;
    categories.forEach(function (category: CategoryNodeDto) {
      treeNodes.push(self.convertCategoryNodeDto(category));
    });
    return treeNodes;
  }

  private convertCategoryNodeDto(category: CategoryNodeDto): TreeNode {
    let treeNode: TreeNode;
    treeNode = new Object();
    treeNode.label = category.Name;
    treeNode.data = category;
    treeNode.expandedIcon = "fa fa-folder-open";
    treeNode.collapsedIcon = "fa fa-folder";
    treeNode.selectable = this.canSelect;
    treeNode.expanded = this.expandAll;
    treeNode.children = [];

    if (category.Children) {
      let self = this;
      category.Children.forEach(function (child: CategoryNodeDto) {
        treeNode.children.push(self.convertCategoryNodeDto(child));
      });
    }

    if (treeNode.data.Id == this.selectedCategoryId) {
      this.selectedCategory = treeNode;
    }

    return treeNode;
  }

  public onSaveChanges() {
    let dtos: CategoryNodeDto[] = this.rebuildCategoryDtoTree();
    this.categoryService.SaveCategoriesTree(dtos)
      .then(response => this.onSaveCategoriesResponseReceived(response));
  }

  public onSaveCategoriesResponseReceived(response: BaseResponse) {
    console.log(response);
    if (response.Success) {
      this.messageService.add({ severity: 'success', summary: "Categories was saved with success", detail: response.Message })
    }
    else {
      this.messageService.add({ severity: 'error', summary: "Error while trying to save categories", detail: response.Message })
    }
  }

  private rebuildCategoryDtoTree(): CategoryNodeDto[] {
    let categoriesDto: CategoryNodeDto[] = [];
    let self = this;
    this.categories.forEach(category => {
      categoriesDto.push(self.treeNodeToCategoryNodeDto(null, category));
    });
    return categoriesDto;
  }

  private treeNodeToCategoryNodeDto(parentDto: CategoryNodeDto, element: TreeNode): CategoryNodeDto {
    let categoryDto: CategoryNodeDto = element.data;
    categoryDto.Children = [];
    if (parentDto)
      categoryDto.ParentId = parentDto.Id;
    else
      categoryDto.ParentId = null;

    let self = this;
    element.children.forEach(child => {
      categoryDto.Children.push(self.treeNodeToCategoryNodeDto(categoryDto, child));
    })
    return categoryDto;
  }
}
