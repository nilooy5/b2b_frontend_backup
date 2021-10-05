import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenderListBannerComponent } from './tender-list-banner/tender-list-banner.component';
import { TenderListMasonryComponent } from './tender-list-masonry/tender-list-masonry.component';
import { TenderListFilterComponent } from './tender-list-filter/tender-list-filter.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Ng5SliderModule} from 'ng5-slider';
import {TenderListComponent} from './tender-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from "@angular/router";
import {MaterialDateRangePickerModule} from '../../../../../modules/material-date-range-picker/material-date-range-picker.module';
import { SelectedTagsPipe } from './tender-list-filter/selected-tags.pipe';
import {NgxMasonryModule} from "ngx-masonry";
import { TenderListPaginationComponent } from './tender-list-pagination/tender-list-pagination.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        TenderListComponent,
        TenderListBannerComponent,
        TenderListMasonryComponent,
        TenderListFilterComponent,
        SelectedTagsPipe,
        TenderListPaginationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        Ng5SliderModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        RouterModule,
        MaterialDateRangePickerModule,
        NgxMasonryModule,
        NgbPaginationModule
    ]
})
export class TenderListModule { }
