import { Component } from '@angular/core';

@Component({
    selector: 'dr-app',
    template: `
        <td-layout>
                <router-outlet></router-outlet>
        </td-layout>
    `
})
export class AppComponent {}
