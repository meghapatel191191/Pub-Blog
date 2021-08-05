import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class UserListService {
  public currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public nameFilter$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  changePage(page: number): void {
    this.currentPage$.next(page);
  }

  changeNameFilter(name: string): void {
    this.nameFilter$.next(name);
  }
}
