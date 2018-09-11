import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, Nav,MenuController,App,AlertController,Events,ModalController} from 'ionic-angular';

import { CategoriasProvider } from '../../providers/categorias/categorias';
import { Categoria } from '../../providers/categorias/categoria';

import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SpinnerProvider } from '../../providers/spinner/spinner'

import { CuandoPage } from '../cuando/cuando';
import { VentaPage } from '../venta/venta';
import { Device } from '@ionic-native/device';
import { IntroPage } from '../intro/intro';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MenPage } from '../men/men';
import { HistorialPage } from '../historial/historial';
import { RegistrofinalPage } from '../registrofinal/registrofinal';
import { LoginPage } from '../login/login';
import { LoginprincipalPage } from '../loginprincipal/loginprincipal';
import { InicioPage } from '../inicio/inicio';
import { ServicioPage } from '../servicio/servicio';
import { FavoritosPage } from '../favoritos/favoritos';
import { ClientesPage } from '../clientes/clientes';
import { AvisoPage } from '../aviso/aviso';
import { PerfilPage } from '../perfil/perfil';
import { RegistroPage } from '../registro/registro';
import { AyudaPage } from '../ayuda/ayuda';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';
import { CompartirPage } from '../compartir/compartir';
import { RegistroprincipalPage } from '../registroprincipal/registroprincipal';
import { Http,RequestOptions, Headers } from '@angular/http';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[ServerProvider]
})
export class HomePage {


  host:any;


  xxxPage :any= IntroPage;



  @ViewChild(Nav) nav: Nav;




  tetas:any;
  ventaPage:any;
  logeado:any=false;
  sexo:any;
  beta:any;
  color:any;
  titulo:any;
  logo:any;
  tema:any;
  olo:true;
 
  categoria: Categoria[];
  pageslogeadosocia: Array<{title: string, component: any}>;
  pageslogeado: Array<{title: string, component: any}>;
  pages: Array<{title: string, component: any}>;



  constructor(public server:ServerProvider,private socialSharing: SocialSharing,public alertCtrl: AlertController,public platform: Platform,public menuCtrl: MenuController,public navCtrl: NavController,
    private _categoria: CategoriasProvider,
    public localStorage: Storage,
    public viewCtrl: ViewController,
    private storage:Storage,
    public events: Events,
    private zone: NgZone,
    public appCtrl: App,
    public view:ViewController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private authHttp: AuthHttp,public device:Device) {

    
     
      this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });

      
      this.ventaPage = VentaPage;


          this._categoria._gettema()
            .subscribe(data => {


              console.log('logo,,,,,',data)

              this.titulo=data[0].nombre
              this.logo=data[0].logo
              this.tema=data[0].tema__nombre




            }
              );




      this.host=this.server.getMyGlobalVar()


      this._categoria.getcategorias(1)
      .subscribe(data => {

        this.categoria = data



      });

      this.color='white'



     this.pageslogeado = [

      { title: 'Inicio', component: HomePage },
      { title: 'Mi Perfil', component: PerfilPage },


      { title: 'Gana 5 soles', component: CompartirPage },
      { title: 'Mis Favoritos', component: FavoritosPage },




    ];


       this.pageslogeadosocia = [


      { title: 'Publica tu anuncio', component: RegistroprincipalPage },
      { title: 'Mis Anuncios', component: AvisoPage },
      { title: 'Mis Clientes', component: ClientesPage }



    ];



        let creds = JSON.stringify({ model: this.device.model ,tipo:this.device.version });

        let options: RequestOptions = new RequestOptions({
          headers: new Headers({ 'Content-Type': 'application/json' })
          });




              this.authHttp.post(this.server.getMyGlobalVar()+'guardadatosmovil/', creds, options)
              .subscribe(
              data => {console.log(data)});






        //Chequea si esta logeado TOKEN

      this.storage.get('token').then((val) => {


           if(val){

             
                this.logeado=true


                   this.storage.get('sexo').then((val) => {



                       if(val==1){

                         this.xxxPage = IntroPage;

                       }

                       if(val==2){


                         this.xxxPage = MenPage;


                       }

                       

                       if(val==null){

                         
                           console.log('Sin sexo...')
                           //this.sacasexo()
                                

                       }

                  });

                    

           }
           else{


               this.xxxPage = RegistroPage;
           }

      });



          








  }

closeModal(){

  this.view.dismiss()
}





 loginModal() {
   let profileModal = this.modalCtrl.create(RegistroprincipalPage, { userId: 8675309 });

   profileModal.present();
 }


iralogin() {


 this.appCtrl.getRootNav().setRoot(LoginprincipalPage)

 //this.navCtrl.push(LoginprincipalPage, {});

 }


openMenu() {

   this.menuCtrl.open();
 }

 closeMenu() {
   this.menuCtrl.close();
 }

 toggleMenu() {
   this.menuCtrl.toggle();
 }


  
  

  ionViewDidLoad() {

//this.logeado = this.navParams.get('statuslogin')


   




      this.storage.get('token').then((val) => {




           if(val){

             
                this.logeado=true

                    

           }

      });



  }

   ionViewWillEnter() {


     this.storage.get('token').then((val) => {


           if(val){

                this.logeado=true

                    

           }

      });


     this.storage.get('newservice').then((val) => {



           if(val==1){

                   
                  this.xxxPage = HistorialPage;

                  this.storage.set('newservice', 0)

                    

           }

      });
  }

  ionViewDidEnter() {

  }

 openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

    this.closeMenu()
  }


 openHome(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(HomePage);

    this.closeMenu()
  }



 salir(){

    this.storage.remove('token')

    this.storage.remove('sexo')

   


    
    //this.navCtrl.push(IntroPage);

     this.platform.exitApp();


  }


  sacacategoria(sexo){


    if (sexo==1){


          this.xxxPage = IntroPage;

         }

         if (sexo==2){


          this.xxxPage = MenPage;
           
         }


      
  }

  sacasexo(){

    this.closeMenu()

    this.storage.remove('sexo')

    //this.navCtrl.push(IntroPage);

    let alertsexo = this.alertCtrl.create({
    title: 'Escoge tu género',
    cssClass: 'sexocss',
    buttons: [
      {
        text: '',
        role: 'cancel',
        handler: () => {
          this.storage.set('sexo',1)
          this.sexo=1
          this.sacacategoria(1)
        }
      },
      {
        text: '',
        handler: () => {
          this.storage.set('sexo',2)
          this.sacacategoria(2)
        }
      }
    ]
  });






  alertsexo.present();

}


///




}
