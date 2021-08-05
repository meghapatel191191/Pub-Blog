import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {interval, Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public clock: Observable<Date> = interval(1000).pipe(
    startWith(new Date()),
    map(() => new Date())
  );

  constructor() {
  }

  ngOnInit(): void {
  }
}
