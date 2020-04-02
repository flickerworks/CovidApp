import { Component, OnInit, Input } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';
@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  show:boolean = false;
  constructor(private globalService: GlobalServices) { }

  ngOnInit() {
    this.globalService.showLoader.subscribe(res => {
      this.show = res;
    })
  }

}
