import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { CustomRouterStateSerializer } from './shared/utils';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from './reducers';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,

    CoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
