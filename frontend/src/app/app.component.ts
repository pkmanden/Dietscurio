import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dietscurio';

  constructor(public auth: AuthenticationService, private modalService: NgbModal) {}

  public open(modal: any) {
    this.modalService.open(modal);
  }
}
