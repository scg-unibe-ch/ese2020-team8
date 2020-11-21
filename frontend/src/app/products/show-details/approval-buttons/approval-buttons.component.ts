import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-approval-buttons',
  templateUrl: './approval-buttons.component.html',
  styleUrls: ['./approval-buttons.component.css']
})
export class ApprovalButtonsComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }


}
