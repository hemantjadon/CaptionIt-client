import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryRootComponent } from './components/gallery-root/gallery-root.component';

@NgModule({
  imports: [
    CommonModule,
    GalleryRoutingModule
  ],
  declarations: [
    GalleryRootComponent,
  ],
  exports: [
    GalleryRootComponent
  ]
})
export class GalleryModule { }
