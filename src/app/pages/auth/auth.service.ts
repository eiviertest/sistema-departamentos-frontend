import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserResponse } from '@app/shared/models/user.interface';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { map, catchError} from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.checkToken();
  }

  // Iniciar Sesión
  logIn(authData: User): Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.URL_API}/auth`, authData).pipe(
      map((user : UserResponse) => {
        this.saveToken(user.token);
        return user;
      }),
      catchError((err) => this.handleError(err))
    );
  }

  
  // Cerrar Sesión
  logOut(): void {
    localStorage.removeItem("token");
  }

  
  // Checar el token y leer el mismo.
  // true = Que el token está expirado
  // false = Que el token no está expirado
  private checkToken(): void {
    const userToken = localStorage.getItem("token")?.toString();
    const isExpired = helper.isTokenExpired(userToken);
    //console.log(isExpired);
    if(isExpired){
      this.logOut();
    }
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
