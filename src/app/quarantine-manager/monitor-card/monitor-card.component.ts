import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'monitor-card',
  templateUrl: './monitor-card.component.html',
  styleUrls: ['./monitor-card.component.scss']
})
export class MonitorCardComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
