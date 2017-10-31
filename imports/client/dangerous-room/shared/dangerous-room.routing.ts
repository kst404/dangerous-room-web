import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DangerousRoomComponent } from './dangerous-room.component';
import { DREventListComponent, DREventEditComponent } from '../events';
import { DRContactListComponent, DRContactEditComponent } from '../contacts';


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

            },
            {
                path: 'contacts',
                children:[
                    {
                        path: '',
                        component: DRContactListComponent
                    },
                    {
                        path: 'add',
                        component: DRContactEditComponent
                    },
                    {
                        path: ':id/edit',
                        component: DRContactEditComponent
                    }
                ]

            }

        ]
    }
]);
