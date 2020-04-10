import { Component, OnInit, NgZone, ElementRef, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GlobalServices } from 'src/app/shared/services/global.services';
import { MapAddress } from 'src/app/shared/models/shared.model';

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
  @Output() addressChange = new EventEmitter<MapAddress>();

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
          this.addressChange.emit(this.formatAddress(result[0]));
        }else{
          window.alert('no result found');
        }
      }else{
        window.alert('Geocoder failed due to: '+status);
      }
    })
  }

  formatAddress(result): MapAddress{
    const obj={}
    const types = ["street_number", "route", "neighborhood", "sublocality", "sublocality_level_2", "sublocality_level_3", "locality", "administrative_area_level_1","administrative_area_level_2", "postal_code"];
    const _address = result.address_components;
    types.forEach(type => {
      _address.forEach(ele => {
        if(ele.types.includes(type)){
          obj[type]=ele.long_name;
        }
      });
    })
    const address:MapAddress = {
      street: this.drawStreet(obj),
      pincode: obj["postal_code"],
      city: (obj["administrative_area_level_2"])? obj["administrative_area_level_2"] : obj["locality"],
      state: obj["administrative_area_level_1"],
      area:""
    }
    return address;
  }

  drawStreet(obj){
    const key1 = (obj["street_number"]) ? (obj["street_number"]+", ") : "";
    const key2 = (obj["route"]) ? (obj["route"]+", ") : "";
    const key3 = (obj["neighborhood"]) ? (obj["neighborhood"]+", ") : "";
    const key4 = (obj["sublocality_level_3"]) ? (obj["sublocality_level_3"]+", ") : "";
    const key5 = (obj["sublocality_level_2"]) ? (obj["sublocality_level_2"]+", ") : "";
    const key6 = (obj["sublocality"]) ? obj["sublocality"] : "";
    return key1 + key2 + key3 + key4 + key5 + key6;
  }

  markerDragEnd(event){
    // console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }


  autoSearch(ele: ElementRef){
    let autocomplete = new google.maps.places.Autocomplete(ele.nativeElement, {
      types: ["address"]
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
        this.getAddress(this.latitude, this.longitude)
        this.zoom = 18;
      });
    });
  }

}
