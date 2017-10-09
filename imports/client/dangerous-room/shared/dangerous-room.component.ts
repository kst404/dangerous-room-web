import { Component } from '@angular/core';

import style from './dangerous-room.component.scss';

@Component({
  template: `
      <td-layout-nav toolbarTitle="DANGEROUS ROOM" navigationRoute="/">
          <div td-toolbar-content layout="row" layout-align="start center" flex>
              <span>&nbsp;</span>
              <span flex></span>

              <button md-icon-button [routerLink]="['/dangerous-room/events']" [routerLinkActive]="['tc-blue-grey-200']"><md-icon  class="md-24">list</md-icon></button>
              <button md-icon-button [routerLink]="['/dangerous-room/contacts']" [routerLinkActive]="['tc-blue-grey-200']"><md-icon class="md-24">person</md-icon></button>
              <!--<button md-icon-button><md-icon class="md-24">view_module</md-icon></button>-->
              <!--<button md-icon-button><md-icon class="md-24">sort</md-icon></button>-->
              <!--<button md-icon-button><md-icon class="md-24">settings</md-icon></button>-->
              <!--<button md-icon-button><md-icon class="md-24">more_vert</md-icon></button>-->
          </div>
          <router-outlet></router-outlet>
      </td-layout-nav>
  `,
  styles: [style]
})
export class DangerousRoomComponent {}
