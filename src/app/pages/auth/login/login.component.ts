import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private subscriptions: Subscription = new Subscription();
  private destroy$ = new Subject<any>();

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    });

  constructor(private authSvc: AuthService, private fb: FormBuilder, private router: Router) { }

  message= "error de campo"

  ngOnInit(): void {  }

  // Subscripcion mediante onDestroy
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      } else if(campo.hasError('minlength')){
        message = "Los caracteres minimos son 4";
      }
    }
    return message;
  }

}
