import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'device',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../device/device.module').then(m => m.DevicePageModule)
          }
        ]
      },
      {
        path: 'gateway',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../gateway/gateway.module').then(m => m.GatewayPageModule)
          }
        ]
      },
      {
        path: 'look',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../look/look.module').then(m => m.LookPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
