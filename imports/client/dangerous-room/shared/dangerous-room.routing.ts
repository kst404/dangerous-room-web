import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DangerousRoomComponent } from './dangerous-room.component';
import { DREventListComponent } from '../event-list';
import { DREventEditComponent } from '../event-edit';


export const drRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'dangerous-room',
        component: DangerousRoomComponent,
        children: [
            {
                path: 'events',
                children:[
                    {
                        path: '',
                        component: DREventListComponent
                    },
                    {
                        path: 'add',
                        component: DREventEditComponent
                    },
                    {
                        path: ':id/edit',
                        component: DREventEditComponent
                    }
                ]

            }
        ]
    }
]);
