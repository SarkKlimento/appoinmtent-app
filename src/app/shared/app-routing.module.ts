import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppointmentCreationComponent} from '../pages/appointment-creation/appointment-creation.component';

const routes: Routes = [
  {path: '', component: AppointmentCreationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
