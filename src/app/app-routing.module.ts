import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from '@shared/guards/check-login.guard';

const routes: Routes = [
  { 
    path: '',
    loadChildren: () => import('./pages/departamento/departamento.module').then(m => m.DepartamentoModule), 
    canActivate: [CheckLoginGuard] 
  }, 
  { path: 'notFound',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  { path: 'departamento',
    loadChildren: () => import('./pages/departamento/departamento.module').then(m => m.DepartamentoModule), 
    canActivate: [CheckLoginGuard] 
  },
  { path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule), 
    canActivate: [CheckLoginGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
