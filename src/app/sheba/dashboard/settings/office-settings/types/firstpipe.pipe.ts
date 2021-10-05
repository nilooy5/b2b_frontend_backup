import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'firstpipe'
})
export class FirstpipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return {
        startDate: new Date(this.getDate(value.s_date)),
        endDate: new Date(this.getDate(value.e_date))
    };
  }

    getDate(date) {
        const dateString = this.formatDate(date);
        const momentObj = moment(dateString, 'MM-DD-YYYY');
        const momentString = momentObj.format('YYYY-MM-DD');
        return momentString;
    }

    formatDate(date) {
        const res = date.split('/');
        return [res[1], res[0], res[2]].join('-');
    }

}
