import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DepartamentoService } from '../../services/departamento.service';
import { AuthService } from '../../../auth/auth.service';

enum Action{
  EDIT = "edit",
  NEW = "new"
}

@Component({
  selector: 'app-modal-formulario',
  templateUrl: './modal-formulario.component.html',
  styleUrls: ['./modal-formulario.component.scss']
})
export class ModalFormularioComponent implements OnInit, OnDestroy {

  actionToDo = Action.NEW;

  private destroy$ = new Subject<any>();

  departamentoForm = this.fb.group({
    cveDepa: [''],
    descripcion: ['', [Validators.required]],
    planta: ['', [Validators.required]],
    fechaConstruccion: ['', [Validators.required]],
    cveEncargado: [this.authSvc.userValue?.cveUsuario]
  })

  constructor(public dialogRef: MatDialogRef<ModalFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, 
  private DepartamentoSvc: DepartamentoService, private _snackBar: MatSnackBar, private authSvc: AuthService) { }
  
  ngOnInit(): void {
    if(this.data?.departamento.hasOwnProperty("cveDepa")){
      this.actionToDo = Action.EDIT;
      this.data.title = "Editar departamento"
      this.editar()
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onSave(): void {
    if(this.departamentoForm.invalid){
      return;
    }
    const formValue = this.departamentoForm.value;
    if(this.actionToDo == Action.NEW) {
      const {cveDepa, ...rest} = formValue;
      this.DepartamentoSvc.new(rest)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this._snackBar.open(result.message, '', {
          duration: 6000
        });
        this.dialogRef.close(true);
      });
    } else {
      const {cveEncargado, ...rest} = formValue;
      this.DepartamentoSvc.update(rest)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this._snackBar.open(result.message, '', {
          duration: 6000
        });
        this.dialogRef.close(true);
      });
    }
  }

  private editar(): void {
    this.departamentoForm.patchValue({
      cveDepa : this.data?.departamento.cveDepa,
      descripcion : this.data?.departamento.descripcion,
      planta : this.data?.departamento.planta,
      fechaConstruccion : this.data?.departamento.fechaConstruccion,
      cveEncargado : this.data?.departamento.cveEncargado
    });
  }

  getErrorMessage(field: string): string {
    let message = "";
    const element = this.departamentoForm.get(field);
    
    if(element?.errors){
      const messages: any = {
        required : "Este campo es requerido",
      };

      const errorKey = Object.keys(element?.errors).find(Boolean);
      message = String(messages[String(errorKey)]);
    }
    return message;
  }

}
