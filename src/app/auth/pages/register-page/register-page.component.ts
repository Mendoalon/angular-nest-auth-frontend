import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { UserRegister } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject( FormBuilder);
  private router      = inject( Router );
  private authService = inject( AuthService);
  private validatorsService = inject( ValidatorsService);

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern ) ] ],
    email: ['', [ Validators.required, Validators.email] ],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required, ]],
  },{
    validators:[
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  register(){
    if( this.myForm.invalid ){
      return;
    }

    let {name, email,password} = this.myForm.value;
    let UserRegister:UserRegister ={
      name, email,password
    }

    this.authService.register(UserRegister)
    .subscribe({
      next: (email) => {
        Swal.fire('Usuario registrado', email, 'success' )
        this.router.navigateByUrl('/login');
      },
      error: (message) => {
        Swal.fire('Error', message, 'error' )
      }
    });


  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }
}
