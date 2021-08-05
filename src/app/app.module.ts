import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {HeaderComponent} from './layouts/header/header.component';
import {FooterComponent} from "./layouts/footer/footer.component";
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {UserStateModule} from "./shared/store/user/user-state.module";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./pages/post/post.module').then(m => m.PostModule)
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ?
      StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
      : [],
    UserStateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
