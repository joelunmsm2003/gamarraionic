import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import { App,Nav ,IonicPage, LoadingController,NavController, NavParams,ViewController,AlertController,ToastController,ModalController,ActionSheetController, Platform} from 'ionic-angular';
import { Http,RequestOptions, Headers } from '@angular/http';
import { IntroPage } from '../../pages/intro/intro';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
import { RegistrofinalPage } from '../../pages/registrofinal/registrofinal';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HistorialsociaPage } from '../../pages/historialsocia/historialsocia';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { UbicacionPage } from '../../pages/ubicacion/ubicacion';
import { ItemDetailsPage } from '../../pages/item-details/item-details';
import { ServerProvider } from '../../providers/server/server';

import { Categoria } from '../../providers/categorias/categoria';
import { Subcategoria } from '../../providers/categorias/subcategoria';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoLibrary,LibraryItem} from '@ionic-native/photo-library';

const THUMBNAIL_WIDTH = 100;
const THUMBNAIL_HEIGHT = 50;



@IonicPage()
@Component({
  selector: 'page-registroprincipal',
  templateUrl: 'registroprincipal.html',
  providers:[ServerProvider]
})
export class RegistroprincipalPage {


  thumbnailWidth = THUMBNAIL_WIDTH + 'px';
  thumbnailHeight = THUMBNAIL_HEIGHT + 'px';

  library: LibraryItem[];

  private todo : FormGroup;

  registrosociaPage:any;
  loginPage:any;

  isLoggedIn:boolean = false;
  users: any;
  user:any={};
  telefono:any;
  activa:boolean=false;
  codigo:any;
  loger:any=1;
  categoriaslist:any;
  subcategoriaslist:any;
  distrito:any;
  myphoto:any;



  //private userface: SocialUser;

  private loggedIn: boolean;


  //@ViewChild('myInput') myInput



  constructor(private platform: Platform,private cd: ChangeDetectorRef,private photoLibrary: PhotoLibrary,private loadingCtrl: LoadingController,private camera: Camera, private transfer: FileTransfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController,private _categoria: CategoriasProvider,private nav: NavController,public modalCtrl: ModalController,public server:ServerProvider,public toastCtrl: ToastController,private fb: Facebook,public storage: Storage,private _perfil: PerfilProvider,public alertCtrl: AlertController,private view:ViewController,private formBuilder: FormBuilder,public appCtrl: App,private http: Http,public navCtrl: NavController, public navParams: NavParams) {


   this.library = [];
    this.fetchPhotos();



          this._categoria.getdistritos()
            .subscribe(data => {


              console.log('distrito,,,,,',data)

              this.distrito=data

     



            });

 
    this._categoria.getcategorias(1)
            .subscribe(data => {


              this.categoriaslist = data
              console.log('getcategorias',data)

              
               // this.update(1)


            });





   this.storage.get('telefono').then((val) => {

     this.telefono=val

     this.user.telefono=this.telefono


   })




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

      this.loginPage=LoginPage


  }

  fetchPhotos() {

  
    this.platform.ready().then(() => {

      this.library = [];

      this.photoLibrary.getLibrary({ thumbnailWidth: THUMBNAIL_WIDTH, thumbnailHeight: THUMBNAIL_HEIGHT/*, chunkTimeSec: 0.3*/ }).subscribe({
        next: (chunk) => {
          this.library = this.library.concat(chunk);
          //this.library = this.library.slice(0, 9); // To take top 10 images
          this.cd.detectChanges();
        },
        error: (err: string) => {
          if (err.startsWith('Permission')) {

           
              this.fetchPhotos();
          
            

          } else { // Real error
            let toast = this.toastCtrl.create({
              message: `getLibrary error: ${err}`,
              duration: 6000,
            });
            toast.present();
          }
        },
        complete: () => {
          // Library completely loaded
        }
      });

     });

  }

    itemTapped(event, libraryItem) {
    this.navCtrl.push(ItemDetailsPage, {
      libraryItem: libraryItem
    });
  }

  trackById(index: number, libraryItem: LibraryItem): string { return libraryItem.id; }



tomafoto(){

const options: CameraOptions = {
  quality: 70,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  allowEdit:true,
  targetWidth:300,
  targetHeight:300
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64 (DATA_URL):
 this.myphoto = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
 
   alert(err)
});


}

fotolibreria(){

const options: CameraOptions = {
  quality: 70,
  destinationType: this.camera.DestinationType.DATA_URL,
  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  saveToPhotoAlbum: false,
  allowEdit:true,
  targetWidth:300,
  targetHeight:300
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64 (DATA_URL):
 this.myphoto = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
 
   alert(err)
});


}

cortar(){

const options: CameraOptions = {
  quality: 70,
  destinationType: this.camera.DestinationType.DATA_URL,
  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  saveToPhotoAlbum: false,
  allowEdit:true,
  targetWidth:300,
  targetHeight:300
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64 (DATA_URL):
 this.myphoto = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
 
   alert(err)
});


}

subir(){

let loader=this.loadingCtrl.create({

  content:"Uploading..."
})

loader.present()

const fileTransfer: FileTransferObject = this.transfer.create();

var random = Math.floor(Math.random()*100);


  let options: FileUploadOptions = {
     fileKey: 'photo',
     fileName: 'myImage_'+random+".jpg",
     chunkedMode:false,
     httpMethod:'post',
     mimeType:"image/jpeg",
     headers: {}
   
  }

  fileTransfer.upload(this.myphoto, 'http://138.68.230.137:8000/subirfoto', options)
   .then((data) => {
     alert("Success");
     loader.dismiss()
     // success
   }, (err) => {
     // error

     alert(err)

     loader.dismiss();
   })


}


  

  cambia(data){

    console.log('cambie...',data)

       this._categoria.getsubcategorias(data,1)
            .subscribe(response => {

              this.subcategoriaslist = response
              console.log('getsubcategorias',data)

            });


  }


  cargandoregistro() {
    let toast = this.toastCtrl.create({
      message: 'Registrarte con Facebook o por correo',
      duration: 4000
    });
    toast.present();
  }



   autentifica(username,password){


console.log('autentificando...')
             let creds = JSON.stringify({ username:username,password: password });

             let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
      });

            console.log(creds)


              return this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds,options)
                  .subscribe(
                    data => {


                       this.storage.set('token', JSON.parse(data["_body"]).token)

                       this.view.dismiss()

                       
                        this.nav.setRoot(HomePage, {statuslogin: true});
                               
                                }
                           
                              );
                           
                              
        }


  telefonorepetido() {
    let toast = this.toastCtrl.create({
      message: 'Tu numero ya esta registrado',
      duration: 4000
    });
    toast.present();
  }


  toast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 4000,
      position:'bottom'
    });
    toast.present();
  }

  publica(data){

    console.log('publica',data)
 
    this._categoria.publica(data)
            .subscribe(data => {

              console.log('publica',data)

              this.nav.setRoot(HomePage, {});



            });


  }

  codigoincorrecto() {
    let toast = this.toastCtrl.create({
      message: 'Lo sentimos no es el codigo correcto',
      duration: 4000,
      position:'bottom'
    });
    toast.present();
  }

  


  sms(data){

    this.activa=true
    console.log(data)

    //this.sacatelefono()
    
    this.nav.setRoot(RegistrofinalPage, {statuslogin: false});


  }
//Facebook

//   login() {
//   this.fb.login(['public_profile', 'user_friends', 'email'])
//     .then(res => {
//       if(res.status === "connected") {
//         this.isLoggedIn = true;
//         this.getUserDetail(res.authResponse.userID);
//       } else {
//         this.isLoggedIn = false;
//       }
//     })
//     .catch(e => console.log('Error logging into Facebook', e));
// }

// logout() {
//   this.fb.logout()
//     .then( res => this.isLoggedIn = false)
//     .catch(e => console.log('Error logout from Facebook', e));
// }


getUserDetail(userid) {
  this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
    .then(res => {

    
      this.users = res;






      let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
      });

      let creds = JSON.stringify({ users: this.users,telefono:this.telefono});


      this.http.post(this.server.getMyGlobalVar()+'loginfacebook/', creds, options)
      .subscribe(
        data => {

      

          let creds = JSON.stringify({ username: JSON.parse(data['_body'])['email'], password: JSON.parse(data['_body'])['id_face']+JSON.parse(data['_body'])['gender']});

        
          this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds, options)
                  .subscribe(
                    data => {


                       this.storage.set('token', JSON.parse(data["_body"]).token)

                       this.view.dismiss()
                               
                                }
                           
                              );

        })


    


    })
    .catch(e => {
      console.log(e);
    });
}


///Fin



  logFormx(telefono) {
     
     //this.myInput.blur()
    // this.removeFocus()
    //this.keyboard.close();





    //console.log(this.myInput)
    //this.sacatelefono()
  }

    showAlert(data) {

      console.log(data)

    let alert = this.alertCtrl.create({
      title: 'My Look Xpress',
      subTitle: 'Bienvenido, porfavor ingresa',
      buttons: ['OK']
    });
    alert.present();
  }



    emailrepetido() {

      

    let alert = this.alertCtrl.create({
      title: 'My Look Xpress',
      subTitle: 'Este correo ya existe porfavor escoja otra',
      buttons: ['Cerrar']
    });
    alert.present();
  }

  closeModal(){

  this.view.dismiss()
}


  sacatelefono(env) {


    console.log('sacatelefono...',this.telefono,'8888')


                this.toast('Se le envio un SMS con un codigo de confirmacion de 3 digitos')


                  let alert = this.alertCtrl.create({
              title: 'Ingrese codigo de confirmacion',
              enableBackdropDismiss:false,
              inputs: [
                {
                  name: 'codigo',
                  placeholder: 'Codigo'
                },
               
              ],
              buttons: [


                {
                  text: 'Cerrar',
                  role:'cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                    
                  }
                },
         
                {
                  text: 'Enviar',
                  handler: data => {

                    console.log('enviando..',data.codigo,this.codigo)

                    //this.logForm(env)



                    if(parseInt(this.codigo)==parseInt(data.codigo)){


                      this.logForm(env)

                      alert.dismiss()

                    }
                    else{

                      this.codigoincorrecto()
                    }

                    return false;
                   
                   
                  }
                }
              ]
            });
            alert.present();



   



  }



ingresa(env){


  console.log('Ingrese.....',env.telefono)


   //this.logForm(env)

  this._perfil.enviasms(env.telefono)
      .subscribe(data => {


        this.codigo=data.codigo


        this.storage.set('codigosms', this.codigo)


        console.log('CODID..',data)
       this.sacatelefono(env)
        


      })
     


     //this.telefono=val

     //this.user.telefono=this.telefono





}





  logForm(env) {
    console.log(env.email)

  


 let creds = JSON.stringify({ username:env.telefono, email: env.email, password: 'rosa0000',nombre:env.nombre });

console.log(creds)


  let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });




  this.http.post(this.server.getMyGlobalVar()+'registro_v2/', creds, options)
    .subscribe(
      data => {

        console.log('eroo..',data['_body'])

        if(data['_body']=='"ok"'){

          console.log('ingrese')

           ///Logeandose

                   this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds, options)
                  .subscribe(
                    data => {


                       console.log('ingresando..',data)
                       this.storage.set('token', JSON.parse(data["_body"]).token)


                        this.nav.setRoot(HomePage, {statuslogin: true});
                        //this.appCtrl.getRootNav().setRoot(HomePage)
                       //this.view.dismiss()

                       //this.appCtrl.getRootNav().push(UbicacionPage);
                               
                                }
                           
                              );

        }

        if(data['_body']==0){

          //this.emailrepetido()


          this.telefonorepetido()

          //this.toast('Tu numero ya esta registrado. Ingrese solo su numero')
        
          this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds, options)
                  .subscribe(
                    data => {


                       this.storage.set('token', JSON.parse(data["_body"]).token)


                       //this.appCtrl.getRootNav().setRoot(HomePage)
                        this.nav.setRoot(HomePage, {statuslogin: true});

                       //this.view.dismiss()
                               
                                }
                           
                              );

        }

     
     
       
      

      }
 
    );





  }

}
