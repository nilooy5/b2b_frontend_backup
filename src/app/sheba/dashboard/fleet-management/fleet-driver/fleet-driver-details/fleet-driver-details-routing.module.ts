import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetDriverDetailsComponent} from './fleet-driver-details.component';
import {DriverInfoService} from './driver-info.service';
import {DriverLicenseInfoService} from './driver-license-info.service';
import {DriverContactService} from './driver-contact.service';
import {DriverExperienceService} from './driver-experience.service';
import {DriverAssignmentService} from './driver-assignment.service';
import {DepartmentService} from '../../department.service';

const routes: Routes = [
    {
        path: '',
        component: FleetDriverDetailsComponent,
        children: [
            {
                path: 'info',
                loadChildren: './driver-info/driver-info.module#DriverInfoModule',
                resolve: {
                    generalInfo: DriverInfoService
                },
            },
            {
                path: 'license',
                loadChildren: './driver-license-info/driver-license-info.module#DriverLicenseInfoModule',
                resolve: {
                    licenseInfo: DriverLicenseInfoService,
                    departments: DepartmentService
                },
            },
            {
                path: 'contact',
                loadChildren: './driver-contact/driver-contact.module#DriverContactModule',
                resolve: {
                    contactInfo: DriverContactService
                },
            },
            {
                path: 'experience',
                loadChildren: './driver-experience/driver-experience.module#DriverExperienceModule',
                resolve: {
                    experienceInfo: DriverExperienceService
                },
            },
            {
                path: 'assignment',
                loadChildren: './driver-assignment/driver-assignment.module#DriverAssignmentModule',
                resolve: {
                    experienceInfo: DriverExperienceService,
                    assignments: DriverAssignmentService
                },
            },
            {
                path: 'vehicle',
                loadChildren: './driver-vehicle/driver-vehicle.module#DriverVehicleModule',
                resolve: {
                    info: DriverLicenseInfoService
                },
            },
            {
                path: 'image-edit',
                loadChildren: './driver-image-edit/driver-image-edit.module#DriverImageEditModule',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetDriverDetailsRoutingModule {
}
