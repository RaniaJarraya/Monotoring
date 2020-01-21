import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './token.interceptor';
import { TokenInter} from './interceptor';
import { RegisterComponent } from './containers/register/register.component';
import { HomeGuard } from './guards/home.guard';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  providers: [
    AuthGuard,
    AuthService,
    HomeGuard,
    TokenInter,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInter,
      multi: true
    },
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
