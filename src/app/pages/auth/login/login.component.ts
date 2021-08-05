import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    });

  constructor(private authSvc: AuthService, private fb: FormBuilder, private router: Router) { }

  message= "error de campo"

  ngOnInit(): void {  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onLogin(): void{
    const formValue = this.loginForm.value;
    this.authSvc.logIn(formValue).subscribe((res) => {
      if(res) {
        this.router.navigate(['']);
      }
    });
  }

  getErrorMessage(field: string): string {
    let message = "";

    const campo = this.loginForm?.get(field);

    if(campo != null){
      if(campo.errors?.required){
        message = "Este campo es requerido";
      } else if(campo.errors?.minlength){
        message = "Los caracteres minimos son 4";
      }
    }
    return message;
  }

}
