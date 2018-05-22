import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '../core/core.module';
import { CameraRoutingModule } from './camera-routing.module';
import { CameraRootComponent } from './components/camera-root/camera-root.component';
import * as fromCamera from './reducers/camera.reducer';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature('camera/camera', fromCamera.reducer),

    CoreModule,
    CameraRoutingModule
  ],
  declarations: [CameraRootComponent]
})
export class CameraModule { }
