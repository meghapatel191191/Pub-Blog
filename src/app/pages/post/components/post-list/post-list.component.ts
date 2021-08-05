import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserHttpService} from "../../../../shared/services/user/user-http.service";
import {combineLatest, Observable, of, Subject} from "rxjs";
import {Paginated} from "../../../../shared/types/paginated.type";
import {PostModel} from "../../../../shared/models/post.model";
import {UserModel} from "../../../../shared/models/user.model";
import {map, switchMap, takeUntil, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {findUserWithId} from "../../../../shared/store/user/selectors/user.selectors";
import {UserActions} from "../../../../shared/store/user";
import * as moment from 'moment';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit, OnDestroy {
  userWithPosts$: Observable<{
    user: UserModel,
    posts: Paginated<PostModel>
  }> | null = null;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly store: Store,
    private readonly userHttpService: UserHttpService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(({userId}) => {
      this.userWithPosts$ = this.store.select(findUserWithId(+userId)).pipe(
        switchMap((user) => {
          return combineLatest([
            user ? of(user) : this.userHttpService.getUser(+userId),
            this.userHttpService.getUserPosts(+userId)
          ])
        }),
        map(([user, posts]) => {
          return {
            user,
            posts: {
              ...posts,
              data: posts.data.map((post) => ({...post, created_at: moment(post.created_at).format('DD/MM/YYYY HH:mm')}))
            }
          }
        }),
        tap(({user}) => {
          this.store.dispatch(UserActions.pushUserToLastViewedFiveUsers(user));
        })
      );
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
