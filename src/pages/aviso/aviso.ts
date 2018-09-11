import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { ServerProvider } from '../../providers/server/server';
import { DetalleanuncioPage } from '../../pages/detalleanuncio/detalleanuncio';
/**
 * Generated class for the AvisoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aviso',
  templateUrl: 'aviso.html',
})
export class AvisoPage {


anuncios:any;
host:any;

  constructor(public server:ServerProvider,public _categoria:CategoriasProvider,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {




         this.host=this.server.getMyGlobalVar()

    this._categoria.mianuncios()
            .subscribe(data => {


            	console.log('mis anuncios',data)

              this.anuncios=data



            });


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisoPage');
  }

  closeModal(){

  this.view.dismiss()
}

detallecategoria(data){


console.log('detallecategoria',data)

this.navCtrl.push(DetalleanuncioPage, {data:data})

}




}
