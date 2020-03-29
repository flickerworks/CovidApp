import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'quarantine-manager',
  templateUrl: './quarantine-manager.component.html',
  styleUrls: ['./quarantine-manager.component.scss']
})
export class QuarantineManagerComponent implements OnInit {
  monitorList = new Array(100);
  constructor() { }

  ngOnInit() {
  }

}
