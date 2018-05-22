import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ImageSchema } from '../../../shared/schema/image';
import * as fromGallery from '../../reducers/gallery.reducer';
import * as idbGalleryActions from '../../actions/idb-gallery.actions';

@Component({
  selector: 'ci-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images$: Observable<ImageSchema[]>;

  constructor(
    private store: Store<fromGallery.State>,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('CaptionIt | Gallery');
    this.store.dispatch(new idbGalleryActions.LoadGalleryData());
    this.images$ = this.store.pipe(select(fromGallery.getGalleryImages));
  }
}
