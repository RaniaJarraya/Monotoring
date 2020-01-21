import { Component, OnInit } from "@angular/core";
//import { Observable } from "rxjs";
import * as L from "leaflet";
//import { GeocodingService } from "../provider/geocoding.service";
import { MapService } from "../provider/map.service";
import { Location } from "../provider/location";

//import "rxjs/add/operator/catch";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  address: string;

  constructor(
    private mapService: MapService,
  
  ) {
    this.address = "";
  }

  ngOnInit() {
    const location = new Location();
    location.address = "New York City, New York, United States";
    location.latlng = L.latLng(40.731253, -73.996139);
   

    const map = L.map("map", {
      zoomControl: false,
      center: location.latlng,
      zoom: 12,
      minZoom:5,
      maxZoom: 24,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    }).setView([48.89, 2.37], 12);

        L.control.zoom({ position: "topright" }).addTo(map);
        //L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;

      }
  
}
