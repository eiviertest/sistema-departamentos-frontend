import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';
import { MaterialModule } from '@app/material.modules';
import { ModalFormularioComponent } from './components/modal-formulario/modal-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DepartamentoComponent,
    ModalFormularioComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DepartamentoModule { }
