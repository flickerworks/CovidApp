import { Component, OnInit, Input } from '@angular/core';
import { GlobalServices } from '../shared/services/global.services';
@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  show:boolean = false;
  timeout;
  constructor(private globalService: GlobalServices) { }

  ngOnInit() {
    this.globalService.showLoader.subscribe(res => {
      this.show = res;
      if(this.timeout){
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(_ => {
        this.hideLoader();
        clearTimeout(this.timeout);
      },10000)
    })
  }

  hideLoader(){
    this.show = false;
  }

}
