import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'assign-monitor',
  templateUrl: './assign-monitor.component.html',
  styleUrls: ['./assign-monitor.component.scss']
})
export class AssignMonitorComponent implements OnInit {
  id: string;
  name: string;
  caseList = new Array(100);
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.paramMap.subscribe(_params => {
      const _p = _params['params'];
      this.id = _p['id'];
      this.name = _p['name'];
    })
  }

}
