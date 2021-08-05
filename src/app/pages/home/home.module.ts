import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./components/home.component";
import {FormsModule} from "@angular/forms";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {UserListService} from "../../shared/services/user/user-list.service";
import {UserHttpService} from "../../shared/services/user/user-http.service";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    PaginationModule,
    SharedModule
  ],
  providers: [
    UserHttpService,
    UserListService
  ]
})

export class HomeModule {
}
