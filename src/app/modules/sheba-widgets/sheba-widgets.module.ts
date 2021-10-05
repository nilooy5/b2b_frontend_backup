import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableSearchComponent} from './table-search/table-search.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatTooltipModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {TableFilterComponent} from './table-filter/table-filter.component';
import {NoItemComponent} from './no-item/no-item.component';
import {ImageFileInputComponent} from './image-file-input/image-file-input.component';
import {PaginationComponent} from './pagination/pagination.component';
import {ListSelectComponent} from './list-select/list-select.component';
import {LazyLoadImageModule} from "ng-lazyload-image";
import { FileUploadDragComponent } from './file-upload-drag/file-upload-drag.component';
import {ngfModule} from 'angular-file';
import { FileUploadModule} from 'ng2-file-upload';
import { SelectSearchComponent } from './select-search/select-search.component';

@NgModule({
    declarations: [
        TableSearchComponent,
        TableFilterComponent,
        NoItemComponent,
        ImageFileInputComponent,
        PaginationComponent,
        ListSelectComponent,
        FileUploadDragComponent,
        SelectSearchComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatTooltipModule,
        LazyLoadImageModule.forRoot({}),
        ngfModule,
        FileUploadModule
    ],
    exports: [
        TableSearchComponent,
        TableFilterComponent,
        NoItemComponent,
        ImageFileInputComponent,
        PaginationComponent,
        ListSelectComponent,
        FileUploadDragComponent,
        SelectSearchComponent,
    ]
})
export class ShebaWidgetsModule {
}
