import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from '../core/core.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { IDBGalleryEffects } from './effects/idb-gallery.effects';
import { GalleryComponent } from './containers/gallery/gallery.component';
import { GalleryImageComponent } from './containers/gallery-image/gallery-image.component';
import { GalleryLayoutComponent } from './components/gallery-layout/gallery-layout.component';
import { GalleryCardComponent } from './components/gallery-card/gallery-card.component';
import * as fromIdbGallery from './reducers/gallery.reducer';

const EFFECTS = [
  IDBGalleryEffects
];

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    StoreModule.forFeature('gallery/gallery', fromIdbGallery.reducer),
    EffectsModule.forFeature(EFFECTS),

    CoreModule,
    GalleryRoutingModule
  ],
  declarations: [
    GalleryComponent,
    GalleryImageComponent,
    GalleryLayoutComponent,
    GalleryCardComponent
  ]
})
export class GalleryModule { }
