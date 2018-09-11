import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the DetalleanuncioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalleanuncio',
  templateUrl: 'detalleanuncio.html',
})
export class DetalleanuncioPage {

	anuncio:any;

	private todo : FormGroup;
	user:any={};
	subcategoriaslist:any;

  constructor(private formBuilder: FormBuilder,public _categoria:CategoriasProvider,public navCtrl: NavController, public navParams: NavParams) {


  	    this.todo = this.formBuilder.group({
      nombre:[''],
      titulo:[''],
      descripcion:[''],
      categoria:[''],
      subcategoria:[''],
      distrito:[''],
      costo:[''],
      telefono:[''],
      whatsapp:[''],
      email:[''],
    });



this.user = navParams.get("data");


       this._categoria.getsubcategorias(this.user.categoria.id,1)
            .subscribe(response => {

              this.subcategoriaslist = response
    

            });


console.log('anunci....',this.anuncio)

 // this._categoria.detalleanuncio(this.anuncio.categoria.id)
 //            .subscribe(data => {

 //              console.log('deta',data)

 //              this.user=data


 //            });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleanuncioPage');
  }

}
