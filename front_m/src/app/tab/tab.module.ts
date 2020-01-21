import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPageRoutingModule } from './tab-routing.module';

import { TabPage } from './tab.page';
import { GatewayPageModule } from '../gateway/gateway.module';
import { DevicePageModule } from '../device/device.module';
import { LookPageModule } from '../look/look.module';
//import { HomeComponent } from '../home/home.component';
import { HomePageModule } from '../home/home.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPageRoutingModule,
    GatewayPageModule,
    DevicePageModule,
    LookPageModule, 
    HomePageModule
  ],
  declarations: [TabPage]
})
export class TabPageModule {}
