import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'hyphenStrip'
})
export class HyphenStripPipe implements PipeTransform {

    transform(value: string, args?: any): any {
        return value ? value.replace('_', ' ') : '';
    }

}
