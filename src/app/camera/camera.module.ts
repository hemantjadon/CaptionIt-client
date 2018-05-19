import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { CameraRootComponent } from './components/camera-root/camera-root.component';

@NgModule({
  imports: [
    CommonModule,
    CameraRoutingModule
  ],
  declarations: [CameraRootComponent]
})
export class CameraModule { }
