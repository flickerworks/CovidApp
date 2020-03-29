import { Component, OnInit } from '@angular/core';
import { MenuRoute } from './shared/models/shared.model';
import { Router } from '@angular/router';
import { GlobalServices } from './shared/services/global.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentRoute: string;
  showPopup:boolean = false;
  constructor(
    private readonly router: Router,
    public globalServices: GlobalServices
  ) {}

  ngOnInit(): void {
    this.globalServices.checkUserLoggedIn();
    this.openPopup();
  }

  openPopup(){
    this.globalServices.showPopup.subscribe(res => {
      this.showPopup = res;
    })
  }

  trackRoute(): void {
    this.currentRoute = this.router.url.split('/')[1];
    if (!this.currentRoute) {
      this.currentRoute = '/login';
    }
  }

  logOut(): void {
    this.globalServices.logOut();
    this.router.navigate(['/']);
  }
}
