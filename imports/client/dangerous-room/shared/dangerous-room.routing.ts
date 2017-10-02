import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DangerousRoomComponent } from './dangerous-room.component';
import { DREventComponent } from '../event-list';


export const drRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'dangerous-room',
    component: DangerousRoomComponent,
    children: [
      {
        path: '',
        component: DREventComponent
      },
        //{
      //   path: ':id',
      //   component: DemoDetailComponent,
      //   resolve: { demoItem: DemoDetailResolver }
      // }
    ]
  }
]);
