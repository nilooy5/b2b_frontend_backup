import { Component, OnInit, Input } from '@angular/core';
import { ResponsiveService } from '../../tender-services/tender-landing/responsive.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-top-catagories',
    templateUrl: './top-catagories.component.html',
    styleUrls: ['./top-catagories.component.scss']
})

export class TopCatagoriesComponent implements OnInit {
    categories: any ;
    isMobileDevice: boolean;
    @Input()
    set deviceResolution(data: any) {
        this.isMobileDevice = data;
    }
    get deviceResolution() {
        return this.isMobileDevice;
    }
    @Input()
    set categoriesData(data: any) {
        this.categories = data;
    }
    get categoriesData() {
        return this.categories;
    }
    constructor(private router: Router) { }

    ngOnInit() {

    }

    redirectToTenderList(category_id) {
        this.router.navigate(['/', 'tender', 'list'], {state: { categoryId: category_id}});
    }
}
