import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { CameraActionTypes, CameraActions } from '../actions/camera.actions';

export interface State {
  isCapturing: boolean;
  captured: {
    status: boolean,
    blob: Blob
  };
}

export const initialState: State = {
  isCapturing: false,
  captured: { status: false, blob: null }
};

export function reducer(
  state = initialState,
  action: CameraActions
): State {
  switch (action.type) {
    case CameraActionTypes.CAPTURE_IMAGE: {
      return Object.assign({}, state, {
        isCapturing: true
      });
    }

    case CameraActionTypes.CAPTURE_IMAGE_WAIT_TO_CONFIRM: {
      const blob = action.blob;
      return Object.assign({}, state, {
        captured: {
          status: true,
          blob
        }
      });
    }

    case CameraActionTypes.CAPTURE_IMAGE_SUCCESS:
    case CameraActionTypes.CAPTURE_IMAGE_FAIL: {
      return Object.assign({}, state, {
        isCapturing: false,
        captured: {
          status: false,
          blob: null
        }
      });
    }

    default:
      return state;
  }
}

export const getCameraState = createFeatureSelector<State>('core/camera');

export const selectIsCapturing = (state: State) => state.isCapturing;
export const selectCaptured = (state: State) => state.captured;

export const getIsCapturing =  createSelector(getCameraState, selectIsCapturing);
export const getCaptured =  createSelector(getCameraState, selectCaptured);
