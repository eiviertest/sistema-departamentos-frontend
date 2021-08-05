import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserResponse } from '@app/shared/models/user.interface';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { map, catchError} from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) {
    this.checkToken();
  }

  // Retorna el valor de lo que se encuentra en loggedIn 
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Iniciar Sesión
  logIn(authData: User): Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.URL_API}/auth`, authData).pipe(
      map((user : UserResponse) => {
        this.saveToken(user.token);
        this.loggedIn.next(true);
        return user;
      }),
      catchError((err) => this.handleError(err))
    );
  }

  
  // Cerrar Sesión
  logOut(): void {
    localStorage.removeItem("token");
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  
  // Checar el token y leer el mismo.
  // true = Que el token está expirado
  // false = Que el token no está expirado
  private checkToken(): void {
    const userToken = localStorage.getItem("token")?.toString();
    const isExpired = helper.isTokenExpired(userToken);
    isExpired ? this.logOut : this.loggedIn.next(true);
  } 

  // Guardar token
  private saveToken(token: string): void {
    localStorage.setItem("token", token);
  }


  // Manejar Errores
  private handleError(err: any): Observable<never> {
    let errorMessage = "Ocurrio un error";

    if(err){
      errorMessage = `Error: ${err.message}`;
      this._snackBar.open(errorMessage, '', {
        duration: 6000
      });
    }
    return throwError(errorMessage);
  }
}
