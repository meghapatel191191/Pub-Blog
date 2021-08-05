import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import * as fromUser from './reducers/user.reducer';
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./effects/user.effects";
import {UserHttpService} from "../../services/user/user-http.service";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
    UserHttpService
  ]
})
export class UserStateModule {}
