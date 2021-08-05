import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { catchError } from 'rxjs/operators';
import { DepartamentoResponse } from '@app/shared/models/departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  lista(): Observable<DepartamentoResponse[]> {
    return this.http.get<DepartamentoResponse[]>(`${environment.URL_API}/departamento`)
    .pipe(catchError((err) => this.handleError(err)));
  }

  new(departamento: DepartamentoResponse): Observable<any> {
    return this.http.put<any>(`${environment.URL_API}/departamento`, departamento)
    .pipe(catchError((error) => this.handleError(error)));
  }

  update(departamento: DepartamentoResponse): Observable<any> {
    return this.http.post<any>(`${environment.URL_API}/departamento/`, departamento)
    .pipe(catchError((error) => this.handleError(error)));
  }

  delete(cveDepa: number): Observable<any> {
    return this.http.delete<any>(`${environment.URL_API}/departamento/${cveDepa}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(err: any): Observable<never> {
    let errorMessage = "Ocurrio un error";
    if(err){
      errorMessage = `Error: ${ typeof err.error.message == 'undefined' ? err.message : err.error.message }`;
      this._snackBar.open(errorMessage, '', {
        duration: 6000
      });
    }
    return throwError(errorMessage);
  }
}
