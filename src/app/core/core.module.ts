import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppShellComponent } from './containers/app-shell/app-shell.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ActionbarComponent } from './components/actionbar/actionbar.component';
import { CanvasImageComponent } from './components/canvas-image/canvas-image.component';
import { IDBImageService } from './services/idb-image.service';
import { ImageConvertService } from './services/image-convert.service';
import { ApiService } from './services/api.service';
import { SafePipe } from './pipes/safe.pipe';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { BlobToUrlPipe } from './pipes/blob-to-url.pipe';
import { RouteNavigationEffects } from './effects/route-navigation.effects';
import { IDBImageEffects } from './effects/idb-image.effects';
import * as fromLayout from './reducers/layout.reducer';
import * as fromCamera from './reducers/camera.reducer';

const EFFECTS = [
  RouteNavigationEffects,
  IDBImageEffects
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,

    StoreModule.forFeature('core/layout', fromLayout.reducer),
    StoreModule.forFeature('core/camera', fromCamera.reducer),
    EffectsModule.forFeature(EFFECTS),
  ],
  declarations: [
    AppShellComponent,
    LayoutComponent,
    ActionbarComponent,
    CanvasImageComponent,
    SafePipe,
    SentenceCasePipe,
    LazyImageComponent,
    BlobToUrlPipe
  ],
  providers: [
    Title,
    IDBImageService,
    ImageConvertService,
    ApiService
  ],
  exports: [
    AppShellComponent,
    CanvasImageComponent,
    LazyImageComponent,
    SafePipe,
    SentenceCasePipe,
    BlobToUrlPipe
  ]
})
export class CoreModule { }
