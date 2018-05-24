import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IDBGalleryActionTypes, IDBGalleryActions } from '../actions/idb-gallery.actions';
import { ImageSchema } from '../../shared/schema/image';

export interface State {
  loading: boolean;
  images: ImageSchema[];
}

export const initialState: State = {
  loading: null,
  images: []
};

export function reducer(
  state = initialState,
  action: IDBGalleryActions
): State {
  switch (action.type) {
    case IDBGalleryActionTypes.LOAD_GALLERY_DATA: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case IDBGalleryActionTypes.LOAD_GALLERY_DATA_SUCCESS: {
      const images = action.images.reverse();
      return Object.assign({}, state, {
        loading: false,
        images
      });
    }

    case IDBGalleryActionTypes.LOAD_GALLERY_DATA_FAIL: {
      return Object.assign({}, state, {
        loading: false
      });
    }

    default:
      return state;
  }
}

export const getGalleryState = createFeatureSelector<State>('gallery/gallery');

export const selectLoading = (state: State) => state.loading;
export const selectImages = (state: State) => state.images;

export const getGalleryLoading = createSelector(getGalleryState, selectLoading);
export const getGalleryImages = createSelector(getGalleryState, selectImages);
