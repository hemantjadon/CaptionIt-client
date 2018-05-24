import { Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'ci-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyImageComponent implements OnInit, AfterViewInit {
  @Input() src: string;
  @Input() width: number;
  @Input() height: number;

  @ViewChild('image') imageRef: ElementRef;
  private imageEl: HTMLImageElement;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.imageEl = this.imageRef.nativeElement;
    console.log(this.imageEl);
  }

}
