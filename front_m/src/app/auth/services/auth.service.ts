import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders  } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from './../../config';
import { Tokens } from '../models/tokens';
//import {Headers, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly _USERID = '_USERID';
  public id ='';
  private httpOptions={};
  private head={};
  public token ='';
  private loggedUser: string;
  public IDINFO;

  constructor(private http: HttpClient) {}
  

  login(user: { email: string, password: string }): Observable<boolean> {
    
    return this.http.post<any>(`${config.apiUrl}/auth`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    return this.http.post<any>(`${config.apiUrl}/auth/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    var h=localStorage.getItem(this.JWT_TOKEN)
    let http2Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept':'application/json',
        "Authorization": "Bearer " +localStorage.getItem(this.JWT_TOKEN)
      })
    }; 
    return this.http.post<any>(`${config.apiUrl}/auth/refresh`, {
      'refreshToken': this.getRefreshToken()
    },http2Options).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.accessToken);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  getId() {
    return localStorage.getItem(this._USERID);
  }

  private doLoginUser(email: string, tokens: Tokens) {
    this.loggedUser = email;
    console.log(email);
    console.log(tokens);
    this.id=tokens['userId'],
    this.token=tokens['accessToken'],
    this.storeTokens(tokens);
  }



  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
  /*private storeUserId(id: string) {
    localStorage.setItem(this._USERID, id);
  }*/

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this._USERID, tokens['userId']);
    localStorage.setItem(this.JWT_TOKEN, tokens['accessToken']);
    localStorage.setItem(this.REFRESH_TOKEN, tokens['refreshToken']);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this._USERID);
  }

  register(user): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/users`, user);
  }
  
  getUserProfile(): Observable<any> {
    var h=localStorage.getItem(this.JWT_TOKEN)
    let http2Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept':'application/json',
        "Authorization": "Bearer " +localStorage.getItem(this.JWT_TOKEN)
      })
    }; 
    //console.log(http2Options);
    return this.http.get(`${config.apiUrl}/users/`+localStorage.getItem(this._USERID) ,http2Options);
        //return this.http.get(apiUrl, { headers: headers })
  }

  addDevice(device): Observable<any> {
    console.log(device)
    return this.http.post<any>(`${config.apiUrl}/devices`, device);
  }



  updateDevice(device): Observable<any> {
    console.log(device)
    let http2Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept':'application/json',
        "Authorization": "Bearer " +localStorage.getItem(this.JWT_TOKEN)
      })
    }; 
    return this.http.patch<any>(`${config.apiUrl}/devices/`+device.DevEUI, device,http2Options);
  }


  deleteDevice(device): Observable<any> {
    console.log(device)
    let http2Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept':'application/json',
        "Authorization": "Bearer " +localStorage.getItem(this.JWT_TOKEN)
      })
    }; 
    return this.http.delete<any>(`${config.apiUrl}/devices/`+device,http2Options);
  }

  predect(InputInfo): Observable<any> {
    console.log(InputInfo[0])
    return this.http.get<any>(`${config.apiUrl}/devices/`+InputInfo[0][0]+'/'+InputInfo[0][1]+'/'+InputInfo[0][2]);
  }


  addGateway(gateway): Observable<any> {
    console.log(gateway)
    return this.http.post<any>(`${config.apiUrl}/gateways`, gateway);
  }



  updateGateway(gateway): Observable<any> {
    console.log(gateway)
    let http2Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept':'application/json',
        "Authorization": "Bearer " +localStorage.getItem(this.JWT_TOKEN)
      })
    }; 
    return this.http.patch<any>(`${config.apiUrl}/gateways/`+gateway.GTW_ID, gateway,http2Options);
  }


  deleteGateway(gateway): Observable<any> {
    console.log(gateway)
    let http2Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept':'application/json',
        "Authorization": "Bearer " +localStorage.getItem(this.JWT_TOKEN)
      })
    }; 
    return this.http.delete<any>(`${config.apiUrl}/gateways/`+gateway,http2Options);
  }

  getDevices(): Observable<any> {
    var h=localStorage.getItem(this.JWT_TOKEN)
    let http2Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept':'application/json',
        "Authorization": "Bearer " +localStorage.getItem(this.JWT_TOKEN)
      })
    }; 
    //console.log(http2Options);
    return this.http.get(`${config.apiUrl}/devices`,http2Options);
        //return this.http.get(apiUrl, { headers: headers })
  }

  getGateways(): Observable<any> {
    var h=localStorage.getItem(this.JWT_TOKEN)
    let http2Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept':'application/json',
        "Authorization": "Bearer " +localStorage.getItem(this.JWT_TOKEN)
      })
    }; 
    //console.log(http2Options);
    return this.http.get(`${config.apiUrl}/gateways`,http2Options);
        //return this.http.get(apiUrl, { headers: headers })
  }


}
