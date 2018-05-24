import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { ViewMode } from '../../reducers/layout.reducer';

@Component({
  selector: 'ci-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionbarComponent implements OnInit {
  @Input() viewMode: ViewMode;
  @Input() disableCamera = false;
  @Input() disableUpload = false;
  @Input() disableSave = false;
  @Input() confirmCapture = false;
  @Output() captureImage: EventEmitter<void> = new EventEmitter();
  @Output() uploadImage: EventEmitter<void> = new EventEmitter();
  @Output() saveImage: EventEmitter<void> = new EventEmitter();
  @Output() discardImage: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sendCaptureImageEvent() {
    this.captureImage.emit();
  }

  sendUploadImageEvent() {
    setTimeout(() => { // Animation Finish Timeout
      this.uploadImage.emit();
    }, 650);
  }

  sendSaveImageEvent() {
    this.saveImage.emit();
  }

  sendDiscardImageEvent() {
    this.discardImage.emit();
  }
}
