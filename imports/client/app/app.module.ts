import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { appRouting } from './app.routing';
import { DangerousRoomModule } from '../dangerous-room/shared/dangerous-room.module';

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
    MatSlideToggleModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

import { Ng2BootstrapModule } from 'ngx-bootstrap';

import {
    CovalentLayoutModule,
    CovalentNotificationsModule,
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
    CovalentPagingModule
];


@NgModule({
    imports: [
        appRouting,
        BrowserModule,
        DangerousRoomModule,

        CommonModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        Ng2BootstrapModule,
        MD_MATERIAL_MODULES,
        COVALENT_MODULES
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
