import { Component } from '@angular/core';
import { MediaCapture, MediaFile } from "@ionic-native/media-capture/ngx";
import { Plugins, CameraSource, CameraResultType, Filesystem, FilesystemDirectory, Capacitor } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public mediaFile:MediaCapture, private sanitizer: DomSanitizer){}
  title = 'SeminariosCam';
  carrusel: SafeResourceUrl[]=[] as SafeResourceUrl[];
  public cargada=false;
  takenPicture:any;
  takenVideo:any;
  async takePicture() {
    try {
      const image = await Plugins.Camera.getPhoto({
        quality: 90,
        source: CameraSource.Camera, 
        //allowEditing: true,
        saveToGallery: true,
        resultType: CameraResultType.Uri
      });

    this.cargada=true;
    this.takenPicture=image.webPath;
    
    } catch (error) {
      console.log(error)
    }


  }

  async takeVideo(){
    let vid: string
    try{
      const record= await this.mediaFile.captureVideo().then((video:MediaFile[])=>{
        vid=video[0].fullPath;
        console.log(video[0].fullPath)
        console.log(video)
      });
      this.carrusel.push(this.sanitizer.bypassSecurityTrustUrl(Capacitor.convertFileSrc(vid)))
    }
    catch (error) {
      console.log(error)
    }
    
   }
}
