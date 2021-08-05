import {Injectable} from "@angular/core";
import {UserHttpService} from "../../../services/user/user-http.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserActions} from "../index";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class UserEffects {
  constructor(
    private readonly userHttpService: UserHttpService,
    private readonly actions$: Actions
  ) {
  }

  loadUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActions.loadUserListRequested
      ),
      switchMap((action) =>
        this.userHttpService.getUsers({
          page: action.page,
          ...(action.name ? {
            name: action.name
          } : undefined)
        }).pipe(
          map((result) => {
            if (result.code !== 200) {
              return UserActions.loadUserListFailed({error: 'Error occurred.'});
            }
            return UserActions.loadUserListSucceeded({userList: result})
          }),
          catchError((error) =>
            of(UserActions.loadUserListFailed({error: error.message}))
          )
        )
      )
    )
  );
}
