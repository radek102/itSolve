/** Angular imports */
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

/** PrimeNG imports */
import { MessageService } from 'primeng/components/common/messageservice';

/** My app imports */
import { RoutesNames } from "../../constants/route-names";
import { SecurityService } from '../../services/security.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MessageService]
})
export class AppComponent implements OnInit {

    constructor(private router: Router, private securityService: SecurityService) { }

    ngOnInit() {
    }

    onCategoryTreeButtonClick() {
        this.router.navigate([RoutesNames.Home]);
    }

    onLoginClick() {
        this.router.navigate([RoutesNames.Login]);
    }

    onLogoutClick() {
        this.securityService.logout();
        this.router.navigate([RoutesNames.Login]);
    }

    onRegisterClick() {
        this.router.navigate([RoutesNames.Register]);
    }

    onProductListButtonClick() {
        this.router.navigate([RoutesNames.ProductsList]);
    }
}
