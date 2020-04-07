import { Directive, ElementRef, HostListener } from '@angular/core';
import { GlobalServices } from './shared/services/global.services';

@Directive({
  selector: '[appHost]'
})
export class HostDirective {
  @HostListener('keyup', ['event'])
  onKeyup(e){
    this.globalService.activeArea.next(this.ele);
  }
  constructor(public ele: ElementRef, private globalService: GlobalServices) { }

}
