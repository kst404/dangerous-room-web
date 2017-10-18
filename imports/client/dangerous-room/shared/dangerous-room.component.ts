import { Component } from '@angular/core';

import style from './dangerous-room.component.scss';

@Component({
  template: `
      <td-layout-nav toolbarTitle="DANGEROUS ROOM" navigationRoute="/">
          <div td-toolbar-content layout="row" layout-align="start center" flex>
              <span>&nbsp;</span>
              <span flex></span>

              <button mat-icon-button [routerLink]="['/dangerous-room/events']" [routerLinkActive]="['tc-blue-grey-200']"><mat-icon  class="mat-24">list</mat-icon></button>
              <button mat-icon-button [routerLink]="['/dangerous-room/contacts']" [routerLinkActive]="['tc-blue-grey-200']"><mat-icon class="mat-24">person</mat-icon></button>
              <!--<button mat-icon-button><mat-icon class="mat-24">view_module</mat-icon></button>-->
              <!--<button mat-icon-button><mat-icon class="mat-24">sort</mat-icon></button>-->
              <!--<button mat-icon-button><mat-icon class="mat-24">settings</mat-icon></button>-->
              <!--<button mat-icon-button><mat-icon class="mat-24">more_vert</mat-icon></button>-->
          </div>
          <router-outlet></router-outlet>
      </td-layout-nav>
  `,
  styles: [style]
})
export class DangerousRoomComponent {}
