import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartamentoResponse } from '@app/shared/models/departamento.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ModalFormularioComponent } from './components/modal-formulario/modal-formulario.component';
import { DepartamentoService } from './services/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})

export class DepartamentoComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();

  displayedColumns: string[] = [
    'descripcion',
    'planta',
    'fechaConstruccion',
    'cveEncargado',
    'editar',
    'eliminar'
  ];
  lstDepartamentos: DepartamentoResponse[] = [];
  
  constructor(private departamentoSvc: DepartamentoService, private dialog: MatDialog, private _snackBar: MatSnackBar, private authSvc: AuthService) { }
  

  ngOnInit(): void {
    this.listaDepartamentos();
  }

  private listaDepartamentos(): void {
    this.departamentoSvc.lista().pipe(takeUntil(this.destroy$)).subscribe(departamentos => this.lstDepartamentos = departamentos)
  }

  onOpenModal(departamento = {}): void {
    const dialogRef = this.dialog.open(ModalFormularioComponent,{
      disableClose: true,
      data: {title: 'Nuevo departamento', departamento}
    });

    dialogRef.beforeClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      if(result){
        this.listaDepartamentos();
      }
    });
  }

  onDelete(cveDepa: number){
    this.departamentoSvc.delete(cveDepa)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      if(result){
        this._snackBar.open(result.message, '', {
          duration: 6000
        });
        this.listaDepartamentos();
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
