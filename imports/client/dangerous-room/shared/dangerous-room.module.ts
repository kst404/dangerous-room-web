import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { DangerousRoomService } from './dangerous-room.service';
import { DangerousRoomComponent } from './dangerous-room.component';
import { drRouting } from './dangerous-room.routing';
import { DREventListComponent } from '../event-list';
import { DREventEditComponent } from '../event-edit';
import { DRContactListComponent } from '../contact-list';
import { DRContactEditComponent } from '../contact-edit';
import { DRToolbarContentComponent } from '../toolbar-content';
import { DRTimePickerComponent } from '../time-picker';
import { DRNotificationsComponent } from '../notifications';

import {
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatAutocompleteModule,
    MatIconModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatLineModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatSnackBarModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

import { Ng2BootstrapModule } from 'ngx-bootstrap';

import {
    CovalentLayoutModule,
    CovalentNotificationsModule,
    CovalentMessageModule,
    CovalentChipsModule,
    CovalentFileModule,
    CovalentStepsModule,
    CovalentSearchModule,
    CovalentCommonModule,
    CovalentDialogsModule,
    CovalentMenuModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentDataTableModule,
    CovalentPagingModule
} from '@covalent/core';

const MD_MATERIAL_MODULES:Array<any> = [
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatAutocompleteModule,
    MatIconModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatLineModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    OverlayModule
];

const COVALENT_MODULES:Array<any> = [
    CovalentLayoutModule,
    CovalentChipsModule,
    CovalentFileModule,
    CovalentStepsModule,
    CovalentSearchModule,
    CovalentMenuModule,
    CovalentCommonModule,
    CovalentDialogsModule,
    CovalentNotificationsModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentMessageModule
];


@NgModule({
    imports: [
        CommonModule,
        drRouting,
        MomentModule,
        ReactiveFormsModule,
        MD_MATERIAL_MODULES,
        COVALENT_MODULES,
    ],
    declarations: [
        DangerousRoomComponent,
        DREventListComponent,
        DREventEditComponent,
        DRContactListComponent,
        DRToolbarContentComponent,
        DRTimePickerComponent,
        DRContactEditComponent,
        DRNotificationsComponent
    ],
    providers: [
        // DemoDetailResolver,
        DangerousRoomService
    ]
})
export class DangerousRoomModule {}
