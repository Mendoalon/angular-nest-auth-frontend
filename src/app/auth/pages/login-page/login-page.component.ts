import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb          = inject( FormBuilder);
  private authService = inject( AuthService);
  private router      = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email] ],
    password: ['', [Validators.required, Validators.minLength(6) ] ],
  });

  login(): void {
    const {email,password } = this.myForm.value;
    this.authService.login(email, password)
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('/dashboard');
        },
        error: (message) => {
          Swal.fire('Error', message, 'error' )
        }
      });
  }


}