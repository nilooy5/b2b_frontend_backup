import {HttpErrorResponse} from "@angular/common/http";
import {KeyValues} from "../types/general";
import {FormGroup} from "@angular/forms";

export function getErrorMessage(err: HttpErrorResponse) {
    let error = err.error && err.error.message ? err.error.message : err.message;
    if (!error) {
        error = 'Something Went wrong, Please try again later';
        console.log(err);
    }
    return error;
}

export function listFilters(page: number, limit: number, filter: any) {
    const queryParams = [];
    let filterString = '';
    if (!page) page = 1;
    if (!limit) limit = 20;
    page = (page - 1) * limit;
    if (page >= 0) queryParams.push({key: 'offset', value: page});
    if (limit) queryParams.push({key: 'limit', value: limit});
    if (filter) {
        const filters = formatFilters(filter);
        if (filters.length) {
            filters.forEach(val => {
                queryParams.push(val);
            })
        }
    }
    if (queryParams.length) {
        filterString = generateQuery(queryParams);
    }
    return filterString;
}

function formatFilters(filter: any): KeyValues[] {
    const values = [];
    if (typeof filter === 'object') {
        Object.keys(filter).forEach(key => {
            if (filter[key]) values.push({key: key, value: filter[key]});
        });
    }
    return values;
}

export function generateQuery(query: KeyValues[], querySign?: boolean): string {
    let output = '';
    querySign = querySign ? querySign : true;
    query.forEach((val, index) => {
        output += val.key + '=' + val.value;
        if (index != query.length - 1) {
            output += '&';
        }
    });
    if (querySign) {
        output = '?' + output;
    }
    return output;
}

export function getMessage(res: any) {
    if (res.message) {
        return res.message;
    }
    if (res.msg) {
        return res.msg.msg;
    }
}

export function formInputInvalid(form: FormGroup, name: string) {
    const control = form.get(name);
    return control.invalid && (control.dirty && control.touched && form.touched && form.dirty);
}

export function formatDateTime(date: Date, onlyDate?: boolean) {
    let d = date,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(), hour = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (!onlyDate) {
        return [year, month, day].join('-') + ' ' + [hour, m, s].join(':');
    } else {
        return [year, month, day].join('-');
    }

}

export function formatOnlyTime(date) {
   let d = date,
       hour = d.getHours(), m = d.getMinutes(), s = '00';
   if(m < 10) m = '0' + m;
   return [hour, m, s].join(':');
   // if (hour > 12) {
   //     hour = hour - 12;
   //     return [hour, m, s].join(':') + ' ' + 'pm';
   // } else{
   //     return [hour, m, s].join(':') + ' ' + 'am';
   // }
}

export function formatInitialTimeForTimePicker(time) {
  let t = time.split(' ');
  let ts = t[0].split(':');
  if (t[1].toUpperCase() === 'PM') {
    ts[0] = parseInt(ts[0]) + 12;
  }
  return ts;
}

export function patchData(src, output) {
    Object.keys(src).forEach(key => {
        output[key] = src[key];
    });
}

const cartesianProductHelper = (a: any[], b: any[]): any[] =>
    [].concat(...a.map(a2 => b.map(b2 => [].concat(a2, b2))));

export const cartesianProduct = (a: any[], b: any[], ...c: any[]) => {
    if (!b || b.length === 0) {
        return a;
    }
    if (!a || a.length === 0) {
        return b;
    }
    const [b2, ...c2] = c;
    const fab = cartesianProductHelper(a, b);
    return cartesianProduct(fab, b2, c2);
};

export const getTrueValueIndices = (a: boolean[]) => {
    return a.reduce((out, bool, index) => bool ? out.concat(index) : out, []);
};

export function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function checkAllPropertiesAreNull(obj: any) {
    // Will check if all properties of the object is null or empty string ;
    // If all properties are null will return true; else false;
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== null && obj[key] !== '') {
            return false;
        }
    }
    return true;
}
