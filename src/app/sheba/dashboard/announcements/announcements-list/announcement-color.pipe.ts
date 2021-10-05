import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'announcementColor'
})
export class AnnouncementColorPipe implements PipeTransform {

  transform(value: string, args: string): any {

      if (args === 'type') {
          const type = {
              event: 'event',
              holiday: 'holiday',
              financial: 'financial',
              others: 'others'
          };
          return type[value];
      }

      if (args === 'status') {
          const status = {
              Ongoing: 'ongoing',
              Previous: 'previous'
          };
          return status[value];
      }

  }

}
