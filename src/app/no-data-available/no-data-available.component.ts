import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-data-available',
  templateUrl: './no-data-available.component.html',
  styleUrls: ['./no-data-available.component.scss']
})
export class NoDataAvailableComponent implements OnInit {
  @Input() text:string = 'No record found';
  @Input() background:boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
