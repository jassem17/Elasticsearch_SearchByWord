import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ElkServiceService } from './elk-service.service';
import { Data } from './models/data';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'searchbar';


  constructor(private elkService: ElkServiceService) { }
  word: any
  data: Data[] = []
  ImgList = new Array();
  ngOnInit() {
  }
  
  onSearch() {
    if (this.word == '') { // si l'utilisateur clique sur search sans introduire aucune lettre
      this.elkService.getPhotos().subscribe(
        (result: any) => {
          this.ImgList = []
          this.data = result.hits.hits
          console.log(this.data)
          let i: number
          for (i = 0; i < this.data.length; i++) {
            this.ImgList.push("http://farm" + this.data[i]._source.flickr_farm + ".staticflickr.com/" + this.data[i]._source.flickr_server + "/"
              + this.data[i]._source.id + "_" + this.data[i]._source.flickr_secret + ".jpg")
          }
        }
      )
    }
    else {
      /*this.elkService.getPhotosByKey(this.word).subscribe( // si l'utilisateur tape une lettre au moins
        (result: any) => {
          this.ImgList = []
          this.data = result.hits.hits
          console.log(this.data)
          let i: number
          for (i = 0; i < this.data.length; i++) {
            this.ImgList.push("http://farm" + this.data[i]._source.flickr_farm + ".staticflickr.com/" + this.data[i]._source.flickr_server + "/"
              + this.data[i]._source.id + "_" + this.data[i]._source.flickr_secret + ".jpg")
          }
        }
      )*/
      this.elkService.getFuzzyPhotos(this.word).subscribe(
        (result:any)=>{
          this.ImgList = []
          this.data = result.hits.hits
          console.log(this.data)
          console.log(this.data.length)
          let i : number
          //for( i = 0 ; i>this.data.length;i++){
            this.data.forEach(element => {
              this.ImgList.push("http://farm" + element._source.flickr_farm + ".staticflickr.com/" + element._source.flickr_server + "/"
              + element._source.id + "_" + element._source.flickr_secret + ".jpg")
            });
           
          }
        
      )

    }
  }
}
