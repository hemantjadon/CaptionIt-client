import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutActionTypes, LayoutActions } from '../actions/layout.actions';

export type ViewMode = 'gallery' | 'camera' | null;

export interface State {
  viewMode: ViewMode;
}

export const initialState: State = {
  viewMode: null,
};

export function reducer(
  state = initialState,
  action: LayoutActions
): State {
  switch (action.type) {
    case LayoutActionTypes.SWITCH_TO_GALLERY: {
      return Object.assign({}, state, {
        viewMode: 'gallery'
      });
    }

    case LayoutActionTypes.SWITCH_TO_CAMERA: {
      return Object.assign({}, state, {
        viewMode: 'camera'
      });
    }

    default: {
      return state;
    }
  }
}

export const getLayoutState = createFeatureSelector<State>('core/layout');

export const selectViewMode = (state: State) => state.viewMode;

export const getViewMode =  createSelector(getLayoutState, selectViewMode);
