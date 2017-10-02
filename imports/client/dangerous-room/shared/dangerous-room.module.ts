import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { DangerousRoomService } from './dangerous-room.service';
import { DangerousRoomComponent } from './dangerous-room.component';
import { drRouting } from './dangerous-room.routing';
// import { DemoDetailComponent } from '../demo-detail/demo-detail.component';
// import { DemoDetailResolver } from '../demo-detail/demo-detail.resolver';
// import { DemoUpsertItemComponent } from '../demo-upsert-item/demo-upsert-item.component';
import { DREventComponent } from '../event-list';

import {
  MdSelectModule,
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdTooltipModule,
  MdCardModule,
  MdAutocompleteModule,
  MdIconModule,
  MdGridListModule,
  MdButtonToggleModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdLineModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdTabsModule,
  MdSidenavModule,
  MdToolbarModule,
  MdSliderModule,
  MdSlideToggleModule
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
  MdSelectModule,
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdTooltipModule,
  MdCardModule,
  MdAutocompleteModule,
  MdIconModule,
  MdGridListModule,
  MdButtonToggleModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdLineModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdTabsModule,
  MdSidenavModule,
  MdToolbarModule,
  MdSliderModule,
  MdSlideToggleModule,
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
    CommonModule,
    drRouting,
    MomentModule,
    ReactiveFormsModule,
    MD_MATERIAL_MODULES,
    COVALENT_MODULES,
  ],
  declarations: [
    DangerousRoomComponent,
    DREventComponent
  ],
  providers: [
    // DemoDetailResolver,
    DangerousRoomService
  ]
})
export class DangerousRoomModule {}
