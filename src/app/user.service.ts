import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  users=[];
  private _jsonURL = 'assets/json/members.json';
  constructor(private _http:Http) { }
  checkMe:any;
  getUsers() {

    return this._http.get(this._jsonURL)
      .map(res=>{
        this.checkMe = res;

        if(this.checkMe._body !== "0"){
           return res.json()
        }

      });

  }
}
