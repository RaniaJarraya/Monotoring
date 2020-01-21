import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LookPage } from './look.page';

const routes: Routes = [
  {
    path: '',
    component: LookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookPageRoutingModule {}
