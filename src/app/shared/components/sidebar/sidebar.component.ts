import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Menu } from '@app/shared/models/menu.interface';
import { UtilsService } from '@app/shared/services/util.services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private destroy$ = new Subject<any>();
  lstMenu: Menu[] = [];

  constructor(private authSvc: AuthService, private utilsSvc: UtilsService) { }

  ngOnInit(): void {
    this.authSvc.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe(user => {
      this.lstMenu = []
    })
  }

  onClose(): void{
    this.utilsSvc.openSidebar(false);
  }

  onExit(): void{
    this.authSvc.logOut();
    this.onClose();
  }
}
