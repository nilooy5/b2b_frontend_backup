import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tender-proposal-access',
  templateUrl: './tender-proposal-access.component.html',
  styleUrls: ['./tender-proposal-access.component.scss']
})
export class TenderProposalAccessComponent implements OnInit {
    @Input() tenderDetails;
    message: string;
    code: string;
    description: string;
  constructor() {}

  ngOnInit() {
  }

}
