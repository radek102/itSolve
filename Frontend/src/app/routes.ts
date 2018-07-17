import {Routes} from "@angular/router";

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { RoutesNames } from './constants/route-names';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { ProductFormComponent } from "src/app/components/product-form/product-form.component";
import { ProductsListComponent } from "src/app/components/products-list/products-list.component";
import { RoutesParameters } from "src/app/constants/route-parameters";

export const routes: Routes = [
    {path: '', redirectTo: RoutesNames.Home, pathMatch: 'full'}, 
    { path: RoutesNames.CreateCategory, component: CategoryFormComponent },
    { path: RoutesNames.Login, component: LoginComponent },
    { path: RoutesNames.Register, component: RegisterComponent },
    { path: RoutesNames.Home, component: CategoryTreeComponent },
    { path: RoutesNames.ProductForm, component: ProductFormComponent },
    { path: RoutesNames.ProductForm + "/:" + RoutesParameters.ProductId, component: ProductFormComponent },
    { path: RoutesNames.ProductsList, component: ProductsListComponent },
];

