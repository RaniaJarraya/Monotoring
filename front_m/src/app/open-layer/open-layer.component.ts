import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import { Vector as VectorLayer} from 'ol/layer';
import Feature from 'ol/Feature';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import { toStringHDMS } from 'ol/coordinate';
import VectorSource from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, toLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { AuthService } from '../auth/services/auth.service';
import * as L from 'leaflet';
//import * as $ from "jquery";
declare var $: any;

@Component({
  selector: 'app-open-layer',
  templateUrl: './open-layer.component.html',
  styleUrls: ['./open-layer.component.scss'],
})
export class OpenLayerComponent implements OnInit {
  layer: TileLayer;
	map: Map;
	marker;
	view: View;
	vienna: Overlay;
	result=[];
	pos=[]
	label=[]
  constructor(private authService: AuthService) { }

  ngOnInit() {

	
    this.layer = new TileLayer({
			source: new OSM()
		});

		this.map = new Map({
			layers: [this.layer],
			target: 'map',
			view: new View({
				center: [0, 0],
				zoom: 2
			})
		});

		/*const pos = fromLonLat([16.3725, 48.208889]);

		// Vienna marker
		this.marker = new Overlay({
			position: pos,
			element: document.getElementById('marker'),
			stopEvent: false
		});
		this.map.addOverlay(this.marker);

		// Vienna label
		this.vienna = new Overlay({
			position: pos,
			element: document.getElementById('vienna')
		});
		this.map.addOverlay(this.vienna);*/

		// Popup showing the position the user clicked

	

		const popup = new Overlay({
			element: document.getElementById('popup')
			
		});
		
		var closer = document.getElementById('popup-closer')		
		this.map.addOverlay(popup);
		
		
		this.map.on('click', function(evt) {
			const element = popup.getElement();
			//const closer = document.getElementById('popup-closer');
			const coordinate = evt.coordinate;
			//const hdms = toStringHDMS(toLonLat(coordinate));
			const hdms = toLonLat(coordinate);
			console.log(hdms)

			if (hdms){
				$(element).popover('dispose');
			popup.setPosition(coordinate);
			$(element).popover({
				placement: 'top',
				//animation: true,
				trigger: 'focus',
				html: true,
				content: '<p>The location you clicked was:</p><code>' + hdms + '</code>'
			});
			$(element).popover('show');
			
			}
			else if(closer) {         
				closer.blur(); 
				$(element).closer('hide');

			}
			this.closer.on('click',function() {
			popup.setPosition(undefined);
			closer.blur();
			return false;
		  });
			
		
		});
		
  }
  
  ShowDevices(){
	this.authService.getDevices().subscribe(
		res => {
		  this.result=res;
		  console.log(this.result)
		  for (var i=0;i<(this.result).length;i++){
			  this.pos[i]=[this.result[i]['GPS_Laltitude'],this.result[i]['GPS_Longitude']]
			  this.label[i]=this.result[i]['DevEUI']
		  }
		  console.log(this.pos)
		  console.log(this.label)
		 // pos = fromLonLat([16.3725, 48.208889])
		 for(var i=0;i<(this.result).length;i++){
			  this.label[i]=new Feature({
				geometry: new Point(this.pos[i])
			  });
			  this.marker = new Overlay({
				position: this.pos[i],
				element: document.getElementById('marker'),
				stopEvent: false
			});
			
			};
			
		var vectorSource = new VectorSource({
			features: this.label
		  });
		  
		  var vectorLayer = new VectorLayer({
			source: vectorSource
		  });

		  this.map.addLayer(vectorLayer)
		},
		err => { 
		  console.log(err);
		  
		}
	  );	
}

}