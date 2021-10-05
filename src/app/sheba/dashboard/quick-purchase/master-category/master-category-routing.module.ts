import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCategoryComponent } from './master-category.component';


const routes: Routes = [
    {
        path: '',
        component: MasterCategoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MasterCategoryRoutingModule { }
