import { Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ImageSchema } from '../../../shared/schema/image';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ci-gallery-layout',
  templateUrl: './gallery-layout.component.html',
  styleUrls: ['./gallery-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryLayoutComponent implements OnInit, OnDestroy {
  @Input() images: ImageSchema[];
  gridColumns = 1;
  resizeSubscription: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.adjustColumnCount(window.screen.width);

    this.resizeSubscription =
      fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe((evt) => {
        const target = <any>evt.target;
        this.adjustColumnCount(target.screen.width);
      });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

  adjustColumnCount(containerWidth: number) {
    let newColumns = this.gridColumns;
    if (containerWidth >= 1400) {
      newColumns = 5;
    }

    if (containerWidth < 1200) {
      newColumns = 4;
    }

    if (containerWidth < 1000) {
      newColumns = 3;
    }

    if (containerWidth < 800) {
      newColumns = 2;
    }

    if (containerWidth < 600) {
      newColumns = 1;
    }

    if (this.gridColumns !== newColumns) {
      this.gridColumns = newColumns;
      this.cdRef.markForCheck();
    }
  }
}
