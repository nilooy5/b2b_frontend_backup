import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubcategoryListComponent} from './subcategory-list.component';

const routes: Routes = [
    {
        path: '',
        component: SubcategoryListComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoryListRoutingModule { }
