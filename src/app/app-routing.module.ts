import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppShellComponent } from './core/containers/app-shell/app-shell.component';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        redirectTo: '/gallery',
        pathMatch: 'full'
      },
      {
        path: 'gallery',
        loadChildren: './gallery/gallery.module#GalleryModule',
        data: { view: 'gallery' }
      },
      {
        path: 'camera',
        loadChildren: './camera/camera.module#CameraModule',
        data: { view: 'camera' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
