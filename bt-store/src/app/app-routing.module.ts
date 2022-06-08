import { NgModule } from "@angular/core";
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule, Routes } from '@angular/router';

const appRoute: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}