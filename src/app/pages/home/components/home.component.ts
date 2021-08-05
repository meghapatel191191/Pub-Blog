import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subject} from "rxjs";
import {distinctUntilChanged, takeUntil} from "rxjs/operators";
import {UserListService} from "../../../shared/services/user/user-list.service";
import {Store} from "@ngrx/store";
import {UserActions} from "../../../shared/store/user";
import {selectUserListVm} from "../../../shared/store/user/selectors/user.selectors";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ['.table td, .table th { padding: .25rem }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  public userListVm$ = this.store.select(selectUserListVm);

  constructor(
    private readonly store: Store,
    public readonly userListService: UserListService,
  ) {
  }

  ngOnInit(): void {
    combineLatest([
      this.userListService.nameFilter$.asObservable().pipe(
        distinctUntilChanged((prev, next) => {
          if (prev !== next) {
            this.userListService.changePage(1);
          }
          return prev === next;
        })
      ),
      this.userListService.currentPage$.asObservable().pipe(
        distinctUntilChanged()
      )
    ]).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(([name, page]) => {
      this.store.dispatch(UserActions.loadUserListRequested({name, page}));
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
