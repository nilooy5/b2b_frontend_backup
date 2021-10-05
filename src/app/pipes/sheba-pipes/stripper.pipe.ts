import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'stripper'
})
export class StripperPipe implements PipeTransform {

    transform(value: string, count?: any): any {
        if (!count) count = 100;
        if (value.length > count) {
            return value.slice(0, count) + '...'
        } else {
            return value
        }
    }

}
