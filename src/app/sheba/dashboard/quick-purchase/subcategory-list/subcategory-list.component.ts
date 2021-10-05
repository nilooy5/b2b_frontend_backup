import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DashboardResolveService} from '../../dashboard-resolve.service';
import {AmplitudeService} from '../../../../services/amplitude.service';
import {StorageService} from '../../../../services/storage.service';

@Component({
    selector: 'app-subcategory-list',
    templateUrl: './subcategory-list.component.html',
    styleUrls: ['./subcategory-list.component.scss']
})
export class SubcategoryListComponent implements OnInit {
    categories: any[];
    subCategories: Array<any> = [];

    constructor(
        private route: ActivatedRoute,
        private amplitude: AmplitudeService,
        private storage: StorageService
    ) {
        this.setData();

        this.amplitude.fireCustomEvent(this.amplitude.events.quick_purchase, {
            business_id: this.storage.user.business_id,
            name: this.storage.user.name
        });
    }

    ngOnInit() {
    }

    handleFilter({category, key}) {
        if (category == 0) {
            this.subCategories = [];
            for (let i = 0; i < this.categories.length; i++) {
                this.subCategories.push(...this.categories[i].children);
            }
            if (key && key !== '') {
                this.subCategories = this.subCategories.filter(cat => cat.name.toLowerCase().includes(key.toLowerCase()));
            }
        } else {
            const filteredCateory = this.categories.find(cat => cat.id == category);
            this.subCategories = filteredCateory ? filteredCateory.children : [];

            if (key && key !== '') {
                this.subCategories = this.subCategories.filter(cat => cat.name.toLowerCase().includes(key.toLowerCase()));
            }
        }
    }

    setData() {
        this.route.data.subscribe(res => {
            this.categories = res.categories as any[];
            for (let i = 0; i < this.categories.length; i++) {
                this.subCategories.push(...this.categories[i].children);
            }
        });
    }
}
