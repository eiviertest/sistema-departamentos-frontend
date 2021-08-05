import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';
import { MaterialModule } from '@app/material.modules';


@NgModule({
  declarations: [
    DepartamentoComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    MaterialModule
  ]
})
export class DepartamentoModule { }
