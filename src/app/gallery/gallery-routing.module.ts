import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './containers/gallery/gallery.component';
import { GalleryImageComponent } from './containers/gallery-image/gallery-image.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent
  },
  {
    path: ':id',
    component: GalleryImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
