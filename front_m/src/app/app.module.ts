import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/containers/login/login.component';
import { RegisterComponent } from './auth/containers/register/register.component';
import { FormsModule } from '@angular/forms'; 
//import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeGuard } from './auth/guards/home.guard';
import { Tokens } from './auth/models/tokens';
import { PopUpService } from './provider/pop-up.service';
import { NavigatorComponent } from './navigator/navigator.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
//import { TokenInter} from './auth/interceptor';
//import { ModaleComponent } from './modale/modale.component';
//import { MapModule } from './map/map.module';
import "leaflet";

@NgModule({
  declarations: [AppComponent,LoginComponent,RegisterComponent],
  //entryComponents: [ModaleComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    HomeGuard,Tokens,PopUpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
