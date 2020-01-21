import { Component, OnInit, Input } from "@angular/core";
import { MapService } from "../provider/map.service";
//import { GeocodingService } from "../geocoding.service";
import { Location } from "../provider/location";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit {
  public papperoni:boolean =false ;
  public papperoni2:boolean =false ;
  public papperoni3:boolean =false ;
  markersOn: boolean;
  constructor(  private mapService: MapService) { this.markersOn = false;}

  ngOnInit() {
  this.mapService.disableMouseEvent("map-navigator");
  }

change(){
  console.log(this.papperoni)
  if (this.papperoni==true){
    this.mapService.getDevices()
  }
}
change2(){
  console.log(this.papperoni2)
  if (this.papperoni2==true){
    this.mapService.getGateways()
  }
}
change3(){
  console.log(this.papperoni3)
  if (this.papperoni3==true){
    this.mapService.toggleMarkerEditing()
  }
}


}
