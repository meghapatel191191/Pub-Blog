import {createAction, props} from "@ngrx/store";
import {UserModel} from "../../../models/user.model";
import {Paginated} from "../../../types/paginated.type";

export const loadUserListRequested = createAction(
  '[User List] Load User List Requested',
  props<{ page: number, name: string }>()
);

export const loadUserListSucceeded = createAction(
  '[User API] Load User List Succeeded',
  props<{ userList: Paginated<UserModel> }>()
);

export const loadUserListFailed = createAction(
  '[User API] Load User List Failed',
  props<{ error: string }>()
);

export const pushUserToLastViewedFiveUsers = createAction(
  '[Last Viewed Users] Push User To Last Viewed Users',
  props<UserModel>()
);
