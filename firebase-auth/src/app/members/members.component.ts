import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html'
})
export class MembersComponent implements OnInit {

  constructor(
    public auth:AuthService
  ) { }

  ngOnInit() {
  }

}
