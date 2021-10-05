import { Pipe, PipeTransform } from '@angular/core';
import { IBadge } from './i-badge';

@Pipe({
    name: 'badgeColor'
})

export class BadgeColorPipe implements PipeTransform {

    transform(value: IBadge, args?: any): any {
        return {
            'font-size': value.fontSize,
            'color': value.color,
            'border-radius': value.borderRadius,
            'font-weight': value.fontWeight,
            'padding': value.padding,
            'text-transform': value.textTransform,
            'background-color': value.backgroundColor
        };
    }

}
