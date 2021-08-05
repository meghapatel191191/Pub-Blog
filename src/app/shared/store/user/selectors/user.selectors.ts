import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromUser from '../reducers/user.reducer';

const getUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectUserList = createSelector(
  getUserState,
  state => state.list.data
);

export const selectUserListError = createSelector(
  getUserState,
  state => state.list.error
);

export const selectUserListIsLoading = createSelector(
  getUserState,
  state => state.list.isLoading
);

export const selectUserListVm = createSelector(
  selectUserList,
  selectUserListError,
  selectUserListIsLoading,
  (userList, error, loading) => ({
    userList,
    error,
    loading
  })
);

export const selectLastViewedUsers = createSelector(
  getUserState,
  state => state.lastViewedUsers
);

export const findUserWithId = (id: number) => createSelector(
  selectUserList,
  selectLastViewedUsers,
  (userList, lastViewedUsers) => {
    return userList?.data.find(user => user.id === id) || lastViewedUsers.find(user => user.id === id);
  }
);
