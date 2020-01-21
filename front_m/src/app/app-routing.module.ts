import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/containers/register/register.component';
import { LoginComponent } from './auth/containers/login/login.component';
//import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeGuard } from './auth/guards/home.guard';
import { HomePageModule } from './home/home.module';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    },  
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
 {
    path: 'home',
    component: HomePageModule,
    canActivate: [HomeGuard]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'},
  {
    path: 'tab',
    loadChildren: () => import('./tab/tab.module').then( m => m.TabPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
 /* {
    path: 'device',
    loadChildren: () => import('./device/device.module').then( m => m.DevicePageModule)
  },
  {
    path: 'gateway',
    loadChildren: () => import('./gateway/gateway.module').then( m => m.GatewayPageModule)
  },
  {
    path: 'look',
    loadChildren: () => import('./look/look.module').then( m => m.LookPageModule)
  }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
