import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';

const myModules = [MatButtonModule, 
                   MatCardModule, 
                   MatToolbarModule, 
                   MatIconModule, 
                   MatSidenavModule,
                   MatListModule,
                   MatFormFieldModule,
                   MatInputModule,
                   MatSnackBarModule,
                   MatDialogModule,
                   MatProgressSpinnerModule,
                   MatTableModule,
                   MatSelectModule
                ];

@NgModule({
    imports: [...myModules],
    exports: [...myModules] 
})

export class MaterialModule {}