import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class HttpService{
  headers = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
  constructor(private http:HttpClient){}
  postData(url,body){
    return this.http.post(url,body,this.headers);
  }
  updateData(url,body){
    return this.http.put(url,body,this.headers);
  }
  deleteData(url){
    return this.http.delete(url,this.headers);
  }
  getData(url){
    return this.http.get(url,this.headers);
  }
}
