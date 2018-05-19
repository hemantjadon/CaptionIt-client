import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraRootComponent } from './components/camera-root/camera-root.component';

const routes: Routes = [
  {
    path: '',
    component: CameraRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraRoutingModule { }
