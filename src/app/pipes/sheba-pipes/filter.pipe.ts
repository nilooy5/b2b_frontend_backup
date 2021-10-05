import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], field: string, value: string): any[] {
        if (!items) return [];
        const fields = field.split(',');
        if (!value || value.length == 0) return items;
        return items.filter(it => {
            let found = false;
            fields.forEach(val => {
                if (it[val]) {

                    if (it[val].toLowerCase().indexOf(value.toLowerCase()) != -1 === true) {
                        found = true;
                    }
                }
            });
            return found;
        });
    }

}
