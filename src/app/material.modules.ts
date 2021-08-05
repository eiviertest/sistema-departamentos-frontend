import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const myModules = [MatButtonModule, 
                   MatCardModule, 
                   MatToolbarModule, 
                   MatIconModule, 
                   MatSidenavModule,
                   MatListModule,
                   MatDialogModule,
                   MatProgressSpinnerModule
                ];

@NgModule({
    imports: [...myModules],
    exports: [...myModules] 
})

export class MaterialModule {}