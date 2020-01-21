import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.page.html',
  styleUrls: ['./gateway.page.scss'],
})
export class GatewayPage implements OnInit {

  data={
    GTW_ID:'',
    GPS_Longitude:'',
    GPS_Laltitude:''
  }
    open1=0;
    open2=0;
    open3=0;
    gateways: number;
    result=[];
  
    constructor(private authService: AuthService,  private router: Router) { }
  
    ngOnInit() {
      this.open1=0;
    this.open2=0;
    this.open3=0;
    this.gateways=0;
    }
  
    addGateway(){
      this.open1=1;
      this.open2=0;
      this.open3=0;
      this.gateways=0;
    }
   
    updateGateway(){
  this.open1=0;
  this.open3=0;
  this.open2=1;
  this.gateways=0;
    }
  
    deleteGateway(){
      this.open1=0;
      this.open3=1;
      this.open2=0;
      this.gateways=0;
    }
    add(){
      this.authService.addGateway(this.data).subscribe(success => {
        if (success) {
          console.log("success");
          this.open1=0;
        }
      }), (err) => {
        console.error(err);
      };
      this.open1=0;
    }
  
    update(){
      this.authService.updateGateway(this.data).subscribe(success => {
        if (success) {
          console.log("success");
          this.open2=0;
        }
      }), (err) => {
        console.error(err);
      };
      this.open2=0;
  
    }
  
    delete(){
      this.authService.deleteGateway(this.data.GTW_ID).subscribe(success => {
        if (success) {
          console.log("success");
          this.open3=0;
        }
      }), (err) => {
        console.error(err);
      };
      this.open3=0;
    }

    getGateways(){
      this.open1=0;
      this.open3=0;
      this.open2=0;
      this.gateways=1;
      this.authService.getGateways().subscribe(
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
