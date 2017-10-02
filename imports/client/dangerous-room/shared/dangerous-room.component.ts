import { Component } from '@angular/core';

import style from './dangerous-room.component.scss';

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [style]
})
export class DangerousRoomComponent {}
