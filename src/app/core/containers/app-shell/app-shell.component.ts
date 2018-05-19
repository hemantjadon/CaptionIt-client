import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromLayout from '../../reducers/layout.reducer';
import * as layoutActions from '../../actions/layout.actions';

@Component({
  selector: 'ci-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css']
})
export class AppShellComponent implements OnInit {
  viewMode$: Observable<fromLayout.ViewMode>;

  constructor(
    private store: Store<fromLayout.State>
  ) { }

  ngOnInit() {
    this.viewMode$ = this.store.pipe(select(fromLayout.getViewMode));
  }

  private handleCaptureImage() {
    console.log('Capture The Image');
  }

  private handleUploadImage() {
    console.log('Upload The Image');
  }
}
