import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading[loading]',
  template: `
    <div class="align-items-center d-flex flex-column h-100 justify-content-center" *ngIf="loading">
      Loading...
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
  @Input() loading: boolean = false;
}
