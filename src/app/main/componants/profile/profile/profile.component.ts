import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Profile } from 'src/app/main/Models/profile';
import { AuthenticationService } from 'src/app/main/services/authentication.service';
import { ProfileService } from 'src/app/main/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: Profile = {};

  profileForm = new FormGroup({
    first_name: new FormControl('',),
    age: new FormControl('',),
    phone: new FormControl('',),
    username: new FormControl('',),
    gender: new FormControl('',),
    email: new FormControl('',),
    middle_name: new FormControl('',),

  })

  constructor(private profileService: ProfileService,
    private authenticationService: AuthenticationService,
    ) { }

  ngOnInit() {
   this.getProfile()

  }
  getProfile(){
    const email = localStorage.getItem('email')
    if(email !== null) {
      this.profileService.getProfile(email).subscribe((res)=>{
        this.userData =  res.data
        if(this.userData != null){
          this.profileForm.patchValue({
            first_name: this.userData.first_name,
            age: this.userData.age,
            phone: this.userData.phone,
            middle_name: this.userData.middle_name,
            email: this.userData.email,
            username: this.userData.username,
            gender: this.userData.gender,
          })
         }
         const currentDate = new Date();
         const year = currentDate.getFullYear();
         if(this.userData.birth_date){
          const age =  (year - new Date(this.userData?.birth_date).getFullYear())
          this.profileForm.get('age')?.setValue(age)
         }
      })
    }

  }

  logout(){
    this.authenticationService.logout();
  }


}
