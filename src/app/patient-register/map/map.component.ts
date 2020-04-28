import { Component, OnInit, NgZone, Output, EventEmitter, Input } from '@angular/core';
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
  autocomplete;
  @Input() target: HTMLInputElement;
  @Output() addressChange = new EventEmitter<MapAddress>();

  private geoCoder;
  constructor(
    private mapApiLoader: MapsAPILoader,
    private ngZone: NgZone,
    private globalService: GlobalServices
  ) { }

  ngOnInit() {
    this.loadMap(this.target);
  }

  loadMap(ele: HTMLInputElement){
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
        this.zoom = 17;
        this.getAddress(this.latitude, this.longitude);
      })
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({'location': {
      lat: latitude,
      lng: longitude
    }}, (result, status) => {
      // console.log(result);
      // console.log(status);
      if(status == 'OK'){
        if(result[0]){
          this.zoom = 18;
          this.address = result[0].formatted_address;          
          this.addressChange.emit(this.formatAddress(result));
        }else{
          console.log('no result found');
        }
      }else{
        console.log('Geocoder failed due to: '+status);
      }
    })
  }

  formatAddress(r): MapAddress{
    const obj={},
    result = r[0],
    types = ["premise", "street_number", "route", "neighborhood", "sublocality", "sublocality_level_2", "sublocality_level_3", "locality", "administrative_area_level_1","administrative_area_level_2", "postal_code"],
    _address = result.address_components,
    fullAddress = result.formatted_address;
    types.forEach(type => {
      _address.forEach(ele => {
        if(ele.types.includes(type)){
          obj[type]=ele.long_name;
        }
      });
    })
   /*  const address:MapAddress = {
      street: this.drawStreet(obj),
      pincode: obj["postal_code"],
      city: (obj["administrative_area_level_2"])? obj["administrative_area_level_2"] : obj["locality"],
      state: obj["administrative_area_level_1"],
      area:""
    } */
    const csc = r[r.length-3],
    // formattedAdrs = csc.formatted_address,
    subLocality = (obj["sublocality"]) ? obj["sublocality"] : "",
    locality = (obj["locality"]) ? obj["locality"] : "",
    address:MapAddress = {
      street: this.drawStreet(obj).trim() || (fullAddress.split(",")[0]).trim(),
      pincode: obj["postal_code"] && obj["postal_code"].trim(),
      city: this.drawCity(result),
      state: this.drawState(result),
      area: (subLocality) ? subLocality : locality
    }
    return address;
  }

  drawCity(result):string{
    const _result = result,
    _address = _result.formatted_address.split(","),
    _city = (_address[_address.length-3]).trim();
    let city = _city || ''; 
    return city.trim();
  } 

  drawState(result):string{
    const _result = result,
    _address = _result.formatted_address.split(","),
    _state = (_address[_address.length-2]).trim();
    let sc = (_state.trim()).split(" "),
    state = sc[0].trim();
    if(sc.length == 1 && !isNaN(sc[0])){
      state = this.drawCity(result);
    }else if(sc.length > 2){
      state = sc[0].trim()+" "+sc[1].trim();
    }
    return state;
  } 

  drawStreet(obj){
    const key0 = (obj["premise"]) ? (obj["premise"]+", ") : "";
    const key1 = (obj["street_number"]) ? (obj["street_number"]+", ") : "";
    const key2 = (obj["route"]) ? (obj["route"]+", ") : "";
    const key3 = (obj["neighborhood"]) ? (obj["neighborhood"]+", ") : "";
    const key4 = (obj["sublocality_level_3"]) ? (obj["sublocality_level_3"]+", ") : "";
    const key5 = (obj["sublocality_level_2"]) ? (obj["sublocality_level_2"]) : "";
    let str = key0 + key1 + key2 + key3 + key4 + key5;
    if(str.substr(str.length-2).trim() === ","){
      str = str.slice(0, str.length-2);
    }
    return str;
  }

  markerDragEnd(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.globalService.latitude = this.latitude && this.latitude.toFixed(8);
    this.globalService.longitude = this.longitude && this.longitude.toFixed(8);
    this.getAddress(this.latitude, this.longitude);
  }


  autoSearch(ele: HTMLInputElement){
    this.autocomplete = new google.maps.places.Autocomplete(ele, {
      types: ["geocode"]
    });
    

    this.autocomplete.setComponentRestrictions({
      'country': ['in']
    });
    this.autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.globalService.latitude = this.latitude && this.latitude.toFixed(8);
        this.globalService.longitude = this.longitude && this.longitude.toFixed(8);
        this.getAddress(this.latitude, this.longitude)
        this.zoom = 17;
      });
    });
  }

}
