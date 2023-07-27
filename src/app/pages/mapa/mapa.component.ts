
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GooglemapsService } from '../../services/googlemaps.service';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { User } from '@angular/fire/auth';
import { UsuarisService } from '../../services/usuaris.service';

//const {Geolocation}=Plugins;
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent  implements OnInit {

 //Coordenadas iniciales
 @Input() position ={
  lat: 41.3849685, 
  lng: 2.1609364
};
label ={
titulo:'Ubicacion',
subtitulo: 'Mi ubicacion'
}

map: any;
marker: any;
infowindow: any;
positionSet: any;

@ViewChild('map') divMap: ElementRef | undefined;


constructor(
private renderer:Renderer2, 
@Inject(DOCUMENT) private document:any,
private googlemapsService: GooglemapsService,
public modalController: ModalController,
private userService:UsuarisService,
) { }

ngOnInit() {
  this.init();
  this.mylocation ();
}

async init () {
await this.googlemapsService.init(this.renderer,this.document).then(()=>{
     this.initMap();
     console.log('aqui')
}).catch((error)=>{console.error;console.log('aqui')})
}

async initMap (){
console.log("aqui2 ")
const position = this.mylocation();

//let latLng = await new google.maps.LatLng (position.lat, position.lng);
//console.log(latLng)
let mapOptions = {
    center: this.position,
    zoom: 15,
    disableDefaultUI: true,
    clickableIcons: false,      
}

this.map = await new google.maps.Map (this.divMap!.nativeElement, mapOptions);
this.marker = await new google.maps.Marker({
  map: this.map,
  animation: google.maps.Animation.DROP,
  draggable: true,
});
 this.clickHandleEvent();
this.infowindow=new google.maps.InfoWindow();
if (this.label.titulo) {
  this.addMarker (position);
   this.setInfowindow (this.marker, this.label.titulo, this.label.subtitulo)
 }


}
clickHandleEvent(){
  this.map.addListener('click', (event:any)=>{
    const position ={
      lat: event.latLng.lat,
      lng: event.latLng.lng,
  };
  this.addMarker(position);
  });
}

addMarker (position:any):void{
let latLng = new google.maps.LatLng(position.lat, position.lng)

this.marker.setPosition (latLng);
this.map.panTo(position);
this.positionSet = position;
}

setInfowindow(marker: any, titulo: string, subtitulo: string){
    const contentString = '<div id="contentInsideMap">'+
                          '<div>'+
                          '</div>'+
                          '<p style=fint-weight: bold; margin-bottom: 5px;">'+
                          '<div id="bodyContent">'+
                          '<p class="normal m-0">'+
                          subtitulo+'</p>'+
                          '</div>'+
                          '</div>';
    this.infowindow.setContent (contentString);
    this.infowindow.open (this.map, marker);

}

async mylocation (){
  console.log ('mylocation () click');

  Geolocation.getCurrentPosition().then ((res)=>{
    const position = {
      lat: res.coords.latitude,
      lng: res.coords.longitude
    }
    this.position=position;
    this.addMarker(this.position);
  });
 
}

aceptar(){
console.log ('estas a ', this.position);
this.modalController.dismiss({pos:this.positionSet})
}

async addDirection(){
    const ubicacion= (await this.userService.getUser()).ubicacion;
      console.log (ubicacion)
      let positionInput={
        lat:41.3849685, lng:2.1609364
        
      };
      if (ubicacion!=null){
        positionInput=ubicacion;
      }

      const modalAdd = await this.modalController.create({
        component: MapaComponent,
        mode: 'ios',
        //swipeToClose: true ,
        componentProps: {position: positionInput}

      });
      
      await modalAdd.present ();
      const {data} = await modalAdd.onWillDismiss();
      if (data) {
        console.log ('data -->', data);
        (await this.userService.getUser()).ubicacion =data.pos;
        console.log ()
      }
      

  }

}
