import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UtilsService } from './shared/services/util.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  private destroy$ = new Subject<any>();
  title = 'sistema-departamentos-frontend';
  opened= false;

  constructor(private utilSvc: UtilsService) {}

  ngOnInit(): void{
    this.utilSvc.sidebarOpened$.subscribe((res: boolean) => this.opened = res); {
    }
  }

  onDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }

}
