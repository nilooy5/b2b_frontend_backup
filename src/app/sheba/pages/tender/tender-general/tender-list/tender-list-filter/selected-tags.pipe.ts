import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'selectedTags',
    pure: false
})
export class SelectedTagsPipe implements PipeTransform {

    transform(tagId: any, selectedTags: any): any {
        return selectedTags.findIndex((item) => item === tagId) !== -1;
    }

}
