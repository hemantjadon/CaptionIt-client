import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryRootComponent } from './components/gallery-root/gallery-root.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
