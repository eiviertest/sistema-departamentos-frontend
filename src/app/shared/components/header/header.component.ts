import { Component, EventEmitter , OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  // Variable que indica si está logueado o no 
  // true = si está logueado
  // false = no está logueado
  isAdmin = true;
  isLogged = false;

  // Directivas
  // Output = comunicación desde el ts hacia el html
  // Input = Comunicacion desde el componente hacia el html
  @Output() toogleSidenav = new EventEmitter<void>();
  
  constructor(private authSvc: AuthService) { 
  
  }

  ngOnInit(): void {
    this.subscriptions.add(
    this.authSvc.isLogged.subscribe(res => this.isLogged = res));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onToggleSidenav(): void{
    this.toogleSidenav.emit();
  }

  onLogout(): void{
    this.authSvc.logOut();
  }

}
