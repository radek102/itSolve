/* Angular imports */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

/** PrimeNG imports */
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { GrowlModule } from 'primeng/growl';
import { TreeModule } from 'primeng/tree';
import { TreeDragDropService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

/** My app imports */
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { routes } from './routes';
import { SecurityService } from './services/security.service';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';
import { ProductsListComponent } from 'src/app/components/products-list/products-list.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CategoryFormComponent,
        RegisterComponent,
        CategoryTreeComponent,
        ProductFormComponent,
        ProductsListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        CommonModule,
        GrowlModule,
        RouterModule.forRoot(routes, { useHash: true }),
        TreeModule,
        ConfirmDialogModule
    ],
    providers: [SecurityService, TreeDragDropService, ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
