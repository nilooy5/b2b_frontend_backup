import { Pipe, PipeTransform } from '@angular/core';
import {RfqVendors} from '../../../../../../types/rfq';

@Pipe({
    name: 'selectedVendors',
    pure: false
})

export class SelectedVendorsPipe implements PipeTransform {

    transform(vendorId: number, selectedVendors: RfqVendors[]): any {
        return selectedVendors.findIndex((item) => item.id === vendorId) !== -1;
    }

}
