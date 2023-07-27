import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {
  apiKey= environment.googleApiKey;
  mapsLoaded = false;


  constructor() { }

  
  init( renderer: any, document: any):Promise<any> {
 
    return new Promise ((resolve)=> {
      if (this.mapsLoaded){
        console.log ('google previamente cargado');
        resolve(true);
        return;
      } 
    
      const script= renderer.createElement('script');
      script.id='googleMap';
     
      (window as any)['initMap']=()=> {
        this.mapsLoaded=true;
        if (google) {
          console.log ('google cargado');

        }else {
          console.log ('google no esta definido');
        }
        resolve (true);
        return;
      }

      if (this.apiKey){
       script.src='https://maps.googleapis.com/maps/api/js?key='+this.apiKey+'&callback=initMap&libraries=geometry,places&v=weekly&callback=initMap';
       
       //script.src='https://maps.googleapis.com/maps/api/js?key='+this.apiKey+'&callback=initMap';
       console.log(script.src)
      } else {
        console.log ("No cargo apikey")
        script.src="https://maps.googleapis.com/maps/api/js?callback=mapInit";
      }
      renderer.appendChild (document.body, script)
    })
    
  }
}
