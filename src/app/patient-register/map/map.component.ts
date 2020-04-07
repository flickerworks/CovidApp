import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GlobalServices } from 'src/app/shared/services/global.services';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  constructor(
    private mapApiLoader: MapsAPILoader,
    private ngZone: NgZone,
    private globalService: GlobalServices
  ) { }

  ngOnInit() {
    this.globalService.activeArea.subscribe(ele => {
      this.loadMap(ele);
    })
  }

  loadMap(ele:ElementRef){
    this.mapApiLoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      this.autoSearch(ele);
    })
  }

  setCurrentLocation() {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 18;
        this.getAddress(this.latitude, this.longitude);
      })
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({'location': {
      lat: latitude,
      lng: longitude
    }}, (result, status) => {
      console.log(result);
      console.log(status);
      if(status == 'OK'){
        if(result[0]){
          this.zoom = 18;
          this.address = result[0].formatted_address;
        }else{
          window.alert('no result found');
        }
      }else{
        window.alert('Geocoder failed due to: '+status);
      }
    })
  }

  markerDragEnd(event){
    // console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }


  autoSearch(ele: ElementRef){
    let autocomplete = new google.maps.places.Autocomplete(ele.nativeElement, {
      types: ["geocode"]
    });
    autocomplete.setComponentRestrictions({'country': ['in']});
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.globalService.latitude = this.latitude;
        this.globalService.longitude = this.longitude;
        this.zoom = 18;
      });
    });
  }

}
