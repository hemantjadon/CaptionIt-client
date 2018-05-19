import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewMode } from '../../reducers/layout.reducer';

@Component({
  selector: 'ci-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.css']
})
export class ActionbarComponent implements OnInit {
  @Input() viewMode: ViewMode;
  @Output() captureImage: EventEmitter<void> = new EventEmitter();
  @Output() uploadImage: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  private sendCaptureImageEvent() {
    this.captureImage.emit();
  }

  private sendUploadImageEvent() {
    this.uploadImage.emit();
  }
}
