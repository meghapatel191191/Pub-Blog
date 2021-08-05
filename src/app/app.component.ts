import {ChangeDetectionStrategy, Component, TrackByFunction} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectLastViewedUsers} from "./shared/store/user/selectors/user.selectors";
import {UserModel} from "./shared/models/user.model";

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="container-fluid pb-5">
      <div class="row">
        <div class="col-9">
          <router-outlet></router-outlet>
        </div>
        <div class="col-3">
          <div class="card mt-3" *ngIf="lastViewedUsers$ | async as lastViewedUsers">
            <div class="card-body">
              <h5 class="card-title text-center">Last Viewed Users</h5>
              <ng-container *ngIf="lastViewedUsers.length else noLastViewedUsers">
                <div class="card mt-3" *ngFor="let lastViewedUser of lastViewedUsers; trackBy: trackByUserId">
                  <div class="row no-gutters">
                    <div class="col-md-9">
                      <div class="card-body">
                        <h5 class="card-title">{{ lastViewedUser.name }}</h5>
                        <p class="card-text"><small class="text-muted">{{ lastViewedUser.email }}</small></p>
                        <p class="card-text"><small class="text-muted">{{ lastViewedUser.gender }}</small></p>
                      </div>
                    </div>
                    <div class="col-md-3 align-self-center">
                      <button type="button" class="btn btn-outline-success btn-sm" [routerLink]="['/posts/' + lastViewedUser.id]">View Posts</button>
                    </div>
                  </div>
                </div>
              </ng-container>
              <ng-template #noLastViewedUsers>
                <div class="text-center">
                  <small class="text-muted">There are no last viewed users yet.</small>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly lastViewedUsers$ = this.store.select(selectLastViewedUsers);
  public readonly trackByUserId: TrackByFunction<UserModel> = (_, user: UserModel): number => user.id;

  constructor(
    private readonly store: Store
  ) {
  }
}
