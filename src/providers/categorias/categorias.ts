import { HttpClient } from '@angular/common/http';
import { Http , Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Categoria } from './categoria';
import { Mitema } from './mitema';
import { Distrito } from './distrito';
import { Anuncio } from './anuncio';
import { Subcategoria } from './subcategoria';
import { ServerProvider } from '../server/server';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class CategoriasProvider {

  items: any;

  myGlobalVar:any;
 
  constructor(public afd: AngularFireDatabase,private authHttp: AuthHttp,public _http: Http, public server:ServerProvider) {
    console.log('Hello CategoriasProvider Provider');
  }

   getShoppingItems() {
    return this.afd.list('/gamarra-e89b4/');
  }

  getcategorias(distrito): Observable<Categoria[]> {
      return this._http.get(this.server.getMyGlobalVar()+'categoria/'+distrito)
      .map((response: Response) => <Categoria[]> response.json())

   }

  getsubcategorias(categoria,distrito): Observable<Subcategoria[]> {
      return this._http.get(this.server.getMyGlobalVar()+'subcategoria/'+categoria+'/'+distrito)
      .map((response: Response) => <Subcategoria[]> response.json())
  
   }

  _getsubcategorias(): Observable<Subcategoria[]> {
      return this._http.get(this.server.getMyGlobalVar()+'_subcategorias/')
      .map((response: Response) => <Subcategoria[]> response.json())
  
   }

  _gettema(): Observable<Mitema[]> {
      return this._http.get(this.server.getMyGlobalVar()+'mitema/')
      .map((response: Response) => <Mitema[]> response.json())
  
   }


    getdistritos(): Observable<Distrito[]> {
      return this._http.get(this.server.getMyGlobalVar()+'distritos/')
      .map((response: Response) => <Distrito[]> response.json())
  
   }

    mianuncios(): Observable<Anuncio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'mianuncios/')
      .map((response: Response) => <Anuncio[]> response.json())
  
   }

    detalleanuncio(categoria): Observable<Anuncio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'detallecategoria/'+categoria)
      .map((response: Response) => <Anuncio[]> response.json())
  
   }



    publica(data) {


        return this.authHttp.post(this.server.getMyGlobalVar()+'publica/', JSON.stringify({ data: data }))
            .map((response: Response) => {


            
                return response.json();
                
            });
   

        }

   filterItems(data,searchTerm){
 
        return data.filter((item) => {

       
            return item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });    
 
    }

}
