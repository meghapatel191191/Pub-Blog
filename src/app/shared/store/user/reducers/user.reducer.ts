import {Paginated} from "../../../types/paginated.type";
import {UserModel} from "../../../models/user.model";
import {Action, createReducer, on} from "@ngrx/store";
import {UserActions} from "../index";

export interface State {
  list: {
    isLoading: boolean;
    error: string;
    data: Paginated<UserModel> | null
  },
  lastViewedUsers: UserModel[]
}

export const userFeatureKey = 'user';

export const initialState: State = {
  list: {
    data: null,
    error: '',
    isLoading: false
  },
  lastViewedUsers: []
};

const userReducer = createReducer(
  initialState,
  on(
    UserActions.loadUserListRequested,
    state => ({
      ...state,
      list: {
        data: null,
        isLoading: true,
        error: ''
      }})
  ),
  on(
    UserActions.loadUserListSucceeded,
    (state, { userList }) => ({
      ...state,
      list: {
        data: userList,
        isLoading: false,
        error: ''
      }
    })
  ),
  on(
    UserActions.loadUserListFailed,
    (state, { error }) => ({
      ...state,
      list: {
        data: null,
        isLoading: false,
        error
      }
    })
  ),
  on(
    UserActions.pushUserToLastViewedFiveUsers,
    (state, user) => {
      const checkUserExist = state.lastViewedUsers.find(lastViewedUser => lastViewedUser.id === user.id);
      if (!checkUserExist) {
        return {
          ...state,
          lastViewedUsers: [user, ...state.lastViewedUsers.filter((_, index) => index < 4)]
        }
      }
      return state;
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
