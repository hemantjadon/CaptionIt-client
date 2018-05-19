import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RouteNavigationEffects } from './effects/route-navigation.effects';
import * as fromLayout from './reducers/layout.reducer';
import { AppShellComponent } from './containers/app-shell/app-shell.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ActionbarComponent } from './components/actionbar/actionbar.component';

const EFFECTS = [
  RouteNavigationEffects
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,

    StoreModule.forFeature('layout', fromLayout.reducer),
    EffectsModule.forFeature(EFFECTS),
  ],
  declarations: [
    AppShellComponent,
    LayoutComponent,
    ActionbarComponent
  ],
  exports: [
    AppShellComponent
  ]
})
export class CoreModule { }
