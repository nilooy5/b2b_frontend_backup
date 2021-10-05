import {RouterModule, Routes} from '@angular/router';
import {DigigoComponent} from './digigo.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: DigigoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DigigoRouting {}
