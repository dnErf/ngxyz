import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  // template: '<app-user-profile></app-user-profile>'
  // template: `
  //   <div *ngIf="auth.user$ | async as user; else login">
  //     <pre>
  //       {{ user | json }}
  //     </pre>
  //     <button class="button" (click)="auth.signOut()">Sign Out</button>
  //   </div>
  //   <ng-template #login>
  //     <button class="button" (click)="auth.googleSignin()">Login with Google</button>
  //   </ng-template>
  // `
  template: '<router-outlet></router-outlet>'
})

export class AppComponent {
  // constructor(public auth:AuthService) { }
}
