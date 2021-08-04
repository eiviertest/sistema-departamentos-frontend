import { Component, EventEmitter , OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Variable que indica si está logueado o no 
  // true = si está logueado
  // false = no está logueado
  isAdmin = true;

  // Directivas
  // Output = comunicación desde el ts hacia el html
  // Input = Comunicacion desde el componente hacia el html
  @Output() toogleSidenav = new EventEmitter<void>();
  
  constructor() { 
  
  }

  ngOnInit(): void {
  }

  onToggleSidenav(): void{
    this.toogleSidenav.emit();
  }

}
