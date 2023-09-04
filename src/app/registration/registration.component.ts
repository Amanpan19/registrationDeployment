import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    
  }

  userForm=this.fb.group({
     fName:["",[Validators.required,Validators.minLength(3)]],
     lName:["",[Validators.required,Validators.minLength(3)]],
     email:["",[this.checkUserMail,Validators.required]],
     password:["",[Validators.minLength(6)]],
     cPassword:["",[Validators.minLength(6),Validators.required]],
     phoneNum:["",[]]
  },{validators:[this.checkPassword]})

  get fName(){
    return this.userForm.get('fName');
  }

  get lName(){
    return this.userForm.get('lName');
  }

  get email(){
    return this.userForm.get('email');
  }

  get password(){
    return this.userForm.get('password');
  }

  get cPassword(){
    return this.userForm.get('cPassword');
  }

  checkPassword(pass:AbstractControl){
    const password = pass.get('password')?.value;
    const cPassword = pass.get('cPassword')?.value;

    if(password != cPassword){
        return {mustMatch:false};
    }
    if(!password || !cPassword){
       return null;
    }
    return null;
  }
 
  checkUserMail(emailValue:AbstractControl){
      if(emailValue.value != ""){
        const email = emailValue.value;
        const emailString = email.split(",").map((e:string)=>e.trim());
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(gmail\.com|yahoo\.com)$/i;
        const anyInvalidEmail = emailString.every((e:string)=>e.match(emailRegex)!==null);
        if(!anyInvalidEmail){
          return {checkUserMail:false}
        }
      }
      return null;
  }
  addUser(){

  }
}
