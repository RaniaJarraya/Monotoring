import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }
  makeCapitalPopup(data) {
    return `` +
    '<div>Capital:'+ data +'</div>' 
  }
}

