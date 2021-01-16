import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }


  getProfile(email: string):Observable<any>{
    return this.http.get<any>(baseUrl + `resource/User/${email}`, {headers:new HttpHeaders({'Authorization': "token 275fb1801b820b6:64696839002a085"})});

  }
}
