import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertController } from '@ionic/angular';
import { Location } from "./location";
import * as L from "leaflet";
import { AuthService } from '../auth/services/auth.service';
import { async } from '@angular/core/testing';
declare var $: any;

@Injectable()
export class MapService {
  public map: L.Map;
  public baseMaps: any;
  public val:boolean;
  private vtLayer: any;
  result=[];
 prediction='';
 message:string;
 mintu;
 coord;

  constructor(private http: HttpClient,private authService:AuthService,private alertController: AlertController) { 
    this.baseMaps = {
      OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
  }}

  disableMouseEvent(elementId: string) {
    const element = <HTMLElement>document.getElementById(elementId);

    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }

  /*toggleAirPortLayer(on: boolean) {
    if (on) {
      this.http.get("assets/airports.min.geojson").subscribe(result => {
        this.vtLayer = L.vectorGrid.slicer(result, {
          zIndex: 1000
        });
        this.vtLayer.addTo(this.map);
      });
    } else if (this.vtLayer) {
      this.map.removeLayer(this.vtLayer);
      delete this.vtLayer;
    }
  }
*/

  getDevices(){
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
      });

      
     
     this.authService.getDevices().subscribe(
      res => {
        this.result=res;
        console.log(this.result)
        res.forEach(ele => {
          const popup = `<div>Latitude: ${ele['GPS_Laltitude']}<div><div>Longitude: ${ele['GPS_Longitude']}<div>`;
          const marker =L.marker([ele['GPS_Laltitude'], ele['GPS_Longitude']], {icon: myIcon}).bindPopup(popup, {
          offset: L.point(12, 6)
        })
        .addTo(this.map)
        .openPopup();
        $('#gateway1').on("click", () => marker.remove());
        })

        
      },
      err => { 
        console.log(err);
        
      }
      );
  }

  getGateways(){
    const myIcon = L.icon({
      iconUrl:'../../assets/orange_mark.png'
      });      
     this.authService.getGateways().subscribe(
      res => {
        this.result=res;
        console.log(this.result)
        for (var i in this.result ){
          const popup = `<div>Latitude: ${this.result[i]['GTW_Laltitude']}<div><div>Longitude: ${this.result[i]['GTW_Longitude']}<div>`;
          const marker =L.marker([this.result[i]['GTW_Laltitude'], this.result[i]['GTW_Longitude']], {icon: myIcon}).bindPopup(popup, {
          offset: L.point(12, 6)
        })
        .addTo(this.map)
        .openPopup();
        $('#gateway2').on("click", () => marker.remove());
        }
      },err => { console.log(err); } );
  

  }

  toggleMarkerEditing() {

      this.map.on("click", this.addMarker.bind(this)
      );
  
  }

  fitBounds(bounds: L.LatLngBounds) {
    this.map.fitBounds(bounds, {});
  }

 
  private addMarker(e: L.LeafletMouseEvent) {
    const shortLat = Math.round(e.latlng.lat * 1000000) / 1000000;
    const shortLng = Math.round(e.latlng.lng * 1000000) / 1000000;
    const popup = `<div>Latitude: ${shortLat}<div><div>Longitude: ${shortLng}<div>`;
    const icon = L.icon({
      iconUrl: "assets/marker_red3.png",
      shadowUrl: "assets/marker-shadow.png"
    });

    var marker = L.marker(e.latlng, {
      draggable: true,
      icon
    })
      .bindPopup(popup, {
        offset: L.point(12, 6)
      })
      .addTo(this.map)
      .openPopup();

      marker.on("click", (e: L.LeafletMouseEvent) => {console.log(e.latlng);
        
        this.distance(e.latlng['lat'],e.latlng['lng']);
        //this.alert()
      });
      
      $('#gateway3').on("click", () => marker.remove());
      
  }


  private   distance (x,y){
    this.authService.getGateways().subscribe(
      res => {
        this.result=res;
        var tab =[];
        console.log(this.result)
        var min=55555555555555;
        var mintuplet=[];
        for (var i in this.result ){
          var d=this.sqr(this.result[i]['GTW_Laltitude']-x)+this.sqr(this.result[i]['GTW_Longitude']-y)
          if (d<min){
            min=d;
            mintuplet.splice(0,1);
            mintuplet.push([this.result[i]['GTW_RSSI'],this.result[i]['GTW_SNR'],d*1000000])
            var info =[this.result[i]['GTW_SNR'],this.result[i]['GTW_RSSI'],d*1000000]
            tab.push(info) 
          }else{
          var info =[this.result[i]['GTW_SNR'],this.result[i]['GTW_RSSI'],d*1000000]
          tab.push(info) 
          }
                   
        }
        console.log(mintuplet)
        this.mintu=mintuplet;
        this.coord=[x,y]
        this.authService.predect(mintuplet).subscribe(res => {
          if (res) {
            
           this.prediction=res[0]  
           
           this.alert()
           console.log(res[0])
          } else {

          }})
        console.log(min)
        console.log(tab)
      },err => { console.log(err); } );

      



  }

  private async alert (){
   this.message= '<strong>'+this.prediction+'</strong> <br>'+ 'SNR:' +'<strong>'+this.mintu[0][1]+'</strong>'+'<br>'+'RSSI:' +'<strong>'+this.mintu[0][0] +'</strong>'+'<br>'+ 'Laltitude:'+'<strong>'+this.coord[0]+'</strong>'+'<br>'+ 'Longitude:'+'<strong>'+this.coord[1]+'</strong>'
      console.log("alert")
     const alert = await this.alertController.create({
       header: 'Performance ',
       message:this.message,
       buttons: ['OK']
     });
 
     await alert.present();
   
  }

  private sqr(x){
    return x*x
  }
}
