import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeavePageAnnouncerService {

  constructor() { }

  announceLeavePageName(name) {
      return name;
  }
}
