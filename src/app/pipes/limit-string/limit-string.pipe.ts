import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'limitString'
})

export class LimitStringPipe implements PipeTransform {

    transform(str: string, limit: number, strReduceAmount: number = 3, replacedString: string = '...'): string {
        return (str && str.length > limit) ? str.slice(0, limit - strReduceAmount) + replacedString : str;
    }

}
