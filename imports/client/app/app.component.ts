import { Component } from '@angular/core';

@Component({
    selector: 'dr-app',
    template: `
        <td-layout>
            <td-layout-card-over cardTitle="Dangerous Room" cardSubtitle="It's really dangerous" cardWidth="75">
                <md-card-content>
                    <router-outlet></router-outlet>
                </md-card-content>
            </td-layout-card-over>
        </td-layout>
    `
})
export class AppComponent {}
