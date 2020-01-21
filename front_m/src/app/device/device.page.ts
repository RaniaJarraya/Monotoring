import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit {
data={
  DevEUI:'',
  GPS_Longitude:'',
  GPS_Laltitude:'',
  performance:''
}
  open1=0;
  open2=0;
  open3=0;
  devices: number;
  result=[];

  constructor(private authService: AuthService,  private router: Router) { }

  ngOnInit() {
    this.open1=0;
  this.open2=0;
  this.open3=0;
  this.devices=0;
  }

  addDevice(){
    this.open1=1;
    this.open2=0;
    this.open3=0
    this.devices=0;
  }
 
  updateDevice(){
this.open1=0;
this.open3=0;
this.open2=1;
this.devices=0;
  }

  deleteDevice(){
    this.open1=0;
    this.open3=1;
    this.open2=0;
    this.devices=0;
  }
  

  add(){
    this.authService.addDevice(this.data).subscribe(success => {
      if (success) {
        console.log("success");
        this.open1=0;
      }
    }), (err) => {
      console.error(err);
    };
  }

  update(){
    this.authService.updateDevice(this.data).subscribe(success => {
      if (success) {
        console.log("success");
        this.open2=0;
      }
    }), (err) => {
      console.error(err);
    };


  }

  delete(){
    this.authService.deleteDevice(this.data.DevEUI).subscribe(success => {
      if (success) {
        console.log("success");
        this.open3=0;
      }
    }), (err) => {
      console.error(err);
    };
  }

  getDevices(){
    this.open1=0;
    this.open3=0;
    this.open2=0;
    this.devices=1;
    this.authService.getDevices().subscribe(
      res => {
        this.result=res;
        console.log(this.result)
     
      },
      err => { 
        console.log(err);
        
      }
    );

  }
  
}
