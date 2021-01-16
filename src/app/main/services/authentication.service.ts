import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  login(user: any) {
    return this.http.post<any>(baseUrl + 'method/login' , user , {observe: 'response'})
  }

  LogedIn(){
    const token = localStorage.getItem('token');
      return !!token
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
    window.location.reload();
  }

}
