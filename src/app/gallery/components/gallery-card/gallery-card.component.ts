import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ImageSchema } from '../../../shared/schema/image';

@Component({
  selector: 'ci-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryCardComponent implements OnInit {
  @Input() image: ImageSchema;

  constructor() { }

  ngOnInit() {
  }
}
