import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders  } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from './../config';
//import {Headers, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) {}

addDevice(device){
    console.log(device)
    return this.http.post(`${config.apiUrl}devices`, JSON.stringify(device));
  }



}