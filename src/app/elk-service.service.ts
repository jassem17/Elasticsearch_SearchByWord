import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Data } from './models/data';

@Injectable({
  providedIn: 'root'
})
export class ElkServiceService {

  flickerUrl = 'http://localhost:9200/flickrphotos/_search';
  flickerUrl2 = 'http://localhost:9200/flickrphotos/_search?q='

  constructor(private http: HttpClient) { }

  
 
  
 

  getPhotos():Observable<Data[]>{ //afficher tous les images fournis par elasticsearch
    return this.http.get<Data[]>(this.flickerUrl)
  }


  getPhotosByKey(key:any):any{ //fournis les images correspondant au mot introduite par le user
    return this.http.get(this.flickerUrl2+key);
  }

  getFuzzyPhotos(word:any):any{
    let data = {
      "query": {
        "fuzzy": {
          "tags": {
            "value": word,
            "fuzziness": 1}
        }
      }
    }
    return this.http.post(this.flickerUrl,data)
  }

}
