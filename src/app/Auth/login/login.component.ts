import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/main/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSubmitted = false;

  loginForm = new FormGroup({
    usr: new FormControl('', [Validators.required , Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  ]),
    pwd: new FormControl('', [Validators.required , Validators.minLength(6)]),
  })
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.isSubmitted = true;
    let loginData = {
      ...this.loginForm.value
    }
    if(this.loginForm.valid){
      this.authenticationService.login(loginData).subscribe((res)=>{
        if(res.status === 200){
         localStorage.setItem('token','token 275fb1801b820b6:64696839002a085')
         localStorage.setItem('email', this.loginForm.get('usr')?.value)
         this.router.navigate(['/profile']);
        }else {
          console.log('error');
        }
     },error => {
       console.log('error' +error.error)
      })
    }

  }

}
