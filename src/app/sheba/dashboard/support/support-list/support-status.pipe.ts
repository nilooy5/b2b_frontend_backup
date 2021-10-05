import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'supportStatus'
})
export class SupportStatusPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value === 'open') { return 'open'; }
        if (value === 'closed') { return 'closed'; }
    }

}
