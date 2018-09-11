import { HttpClient } from '@angular/common/http';
import { Http , Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {

  myGlobalVar:any;
  
  constructor(public _http: Http) {

    this.myGlobalVar = "http://138.68.230.137:8000/";
    //this.myGlobalVar = "https://mylookxpressapp.com:2500/";
  
  }

  setMyGlobalVar(value) {
    this.myGlobalVar = value;
  }

  getMyGlobalVar() {
    return this.myGlobalVar;
  }



}
