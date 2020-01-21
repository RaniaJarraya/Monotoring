import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LookPageRoutingModule } from './look-routing.module';

import { LookPage } from './look.page';

import { OpenLayerComponent } from '../open-layer/open-layer.component';


//import { MapService } from "../provider/map.service";
//import { GeocodingService } from "../provider/geocoding.service";

import "leaflet";
import "leaflet.vectorgrid";
import { MapComponent } from '../map/map.component';
import { MapService } from '../provider/map.service';
import { NavigatorComponent } from '../navigator/navigator.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LookPageRoutingModule ],
  declarations: [LookPage,OpenLayerComponent,MapComponent,NavigatorComponent
   ],
  entryComponents:[OpenLayerComponent,MapComponent],
  providers:[
    MapService
  ]
})
export class LookPageModule {}
